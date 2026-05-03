import { getSObjectOffersQueryPath, salesforceRequest } from './_lib/salesforce.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const data = await salesforceRequest('/services/apexrest/ram/offers')
    res.status(200).json(data)
    return
  } catch (apexError) {
    // Fallback SOQL if Apex endpoint is not available yet.
    try {
      const data = await salesforceRequest(getSObjectOffersQueryPath())
      res.status(200).json(data?.records || [])
      return
    } catch (soqlError) {
      res.status(500).json({
        error: 'Unable to fetch offers from Salesforce.',
        detail: soqlError.message || apexError.message,
      })
    }
  }
}

