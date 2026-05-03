const DEFAULT_API_VERSION = 'v61.0'

function getRequiredEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

function getLoginUrl() {
  return (process.env.SF_LOGIN_URL || 'https://login.salesforce.com').replace(/\/+$/, '')
}

function getApiVersion() {
  return process.env.SF_API_VERSION || DEFAULT_API_VERSION
}

function getTokenCache() {
  if (!globalThis.__sfTokenCache) {
    globalThis.__sfTokenCache = { accessToken: '', instanceUrl: '', expiresAt: 0 }
  }
  return globalThis.__sfTokenCache
}

async function requestTokenWithClientCredentials() {
  const loginUrl = getLoginUrl()
  const clientId = getRequiredEnv('SF_CLIENT_ID')
  const clientSecret = getRequiredEnv('SF_CLIENT_SECRET')

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  })

  const res = await fetch(`${loginUrl}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Client credentials token failed (${res.status}): ${detail}`)
  }

  return res.json()
}

async function requestTokenWithPassword() {
  const loginUrl = getLoginUrl()
  const clientId = getRequiredEnv('SF_CLIENT_ID')
  const clientSecret = getRequiredEnv('SF_CLIENT_SECRET')
  const username = getRequiredEnv('SF_USERNAME')
  const password = getRequiredEnv('SF_PASSWORD')
  const securityToken = process.env.SF_SECURITY_TOKEN || ''

  const body = new URLSearchParams({
    grant_type: 'password',
    client_id: clientId,
    client_secret: clientSecret,
    username,
    password: `${password}${securityToken}`,
  })

  const res = await fetch(`${loginUrl}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Password token failed (${res.status}): ${detail}`)
  }

  return res.json()
}

async function fetchToken() {
  try {
    return await requestTokenWithClientCredentials()
  } catch (clientCredentialsError) {
    if (!process.env.SF_USERNAME || !process.env.SF_PASSWORD) {
      throw clientCredentialsError
    }
    return requestTokenWithPassword()
  }
}

export async function getSalesforceConnection() {
  const cache = getTokenCache()
  const now = Date.now()

  if (cache.accessToken && cache.instanceUrl && now < cache.expiresAt) {
    return { accessToken: cache.accessToken, instanceUrl: cache.instanceUrl }
  }

  const token = await fetchToken()
  const instanceUrl = token.instance_url || process.env.SF_INSTANCE_URL

  if (!token.access_token || !instanceUrl) {
    throw new Error('Token response missing access_token or instance_url.')
  }

  cache.accessToken = token.access_token
  cache.instanceUrl = instanceUrl
  cache.expiresAt = now + 50 * 60 * 1000

  return { accessToken: cache.accessToken, instanceUrl: cache.instanceUrl }
}

export async function salesforceRequest(path, { method = 'GET', query, body } = {}) {
  const { accessToken, instanceUrl } = await getSalesforceConnection()
  const url = new URL(path, instanceUrl)

  if (query && typeof query === 'object') {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    })
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const raw = await res.text()
  let data = raw
  try {
    data = raw ? JSON.parse(raw) : null
  } catch {
    // keep text payload
  }

  if (!res.ok) {
    const message = typeof data === 'string' ? data : JSON.stringify(data)
    const err = new Error(`Salesforce request failed (${res.status}): ${message}`)
    err.statusCode = res.status
    throw err
  }

  return data
}

export function getSObjectOffersQueryPath() {
  const soql = [
    'SELECT Id, Name, Status__c, Price__c, Escale_concernee__c, Type_de_produit__c, Date_de_debut__c, Date_de_fin__c,',
    'Message_accompagnant_l_invitation__c, Plafond__c, Limite_soumissions_24h__c, Submitted_At__c,',
    'Engagement_minimal_d_inventaire_hotel__c, Volume_previsionnel_nuitees_mois__c, Ponderation_prix__c,',
    'Ponderation_SLA__c, Ponderation_qualite__c',
    'FROM Offer__c ORDER BY Date_de_fin__c DESC NULLS LAST',
  ].join(' ')
  return `/services/data/${getApiVersion()}/query?q=${encodeURIComponent(soql)}`
}

