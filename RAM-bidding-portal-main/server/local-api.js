import express from 'express'
import dotenv from 'dotenv'
import { getSObjectOffersQueryPath, salesforceRequest } from '../api/_lib/salesforce.js'

dotenv.config({ path: '.env.local' })

const app = express()
const port = Number(process.env.LOCAL_API_PORT || 3002)

app.use(express.json())

app.get('/api/offers', async (req, res) => {
  try {
    const data = await salesforceRequest('/services/apexrest/ram/offers')
    res.status(200).json(data)
    return
  } catch (apexError) {
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
})

app.get('/api/soumissions', async (req, res) => {
  try {
    const data = await salesforceRequest('/services/apexrest/ram/soumissions', {
      method: 'GET',
      query: req.query || {},
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: 'Salesforce soumissions request failed.',
      detail: error.message,
    })
  }
})

app.post('/api/soumissions', async (req, res) => {
  try {
    const data = await salesforceRequest('/services/apexrest/ram/soumissions', {
      method: 'POST',
      body: req.body || {},
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: 'Salesforce soumissions request failed.',
      detail: error.message,
    })
  }
})

app.listen(port, () => {
  console.log(`[local-api] running on http://localhost:${port}`)
})
