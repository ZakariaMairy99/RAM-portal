import { salesforceRequest } from './_lib/salesforce.js'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await salesforceRequest('/services/apexrest/ram/soumissions', {
        method: 'GET',
        query: req.query || {},
      })
      res.status(200).json(data)
      return
    }

    if (req.method === 'POST') {
      const data = await salesforceRequest('/services/apexrest/ram/soumissions', {
        method: 'POST',
        body: req.body || {},
      })
      res.status(200).json(data)
      return
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: 'Salesforce soumissions request failed.',
      detail: error.message,
    })
  }
}

