import axios from 'axios'
import {
  consultations,
  ranking,
  myHistory,
  priceEvolution,
  hotelKpis,
  currentHotel,
  mockOffers,
} from '../data/mockData'

const FORCE_MOCK = String(import.meta.env.VITE_SF_USE_MOCK || '').toLowerCase() === 'true'
const API_BASE = import.meta.env.VITE_BACKEND_BASE_URL || ''

function useMockMode() {
  return FORCE_MOCK
}

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

const fakeDelay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

function normalizeJsonResponse(data) {
  if (typeof data !== 'string') return data
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

function toUiDate(dateLike) {
  if (!dateLike) return '-'
  const dt = new Date(dateLike)
  if (Number.isNaN(dt.getTime())) return '-'
  return dt.toLocaleDateString('fr-FR')
}

function deriveStatus(startDate, endDate) {
  if (!startDate || !endDate) return 'pending'
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 'pending'
  if (now < start) return 'pending'
  if (now > end) return 'closed'
  return 'active'
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function isPublishedStatus(value) {
  const normalized = normalizeText(value)
  return normalized === 'publie' || normalized === 'published'
}

function mapOfferRecordToUi(record) {
  const startDate = record.Date_de_debut__c
  const endDate = record.Date_de_fin__c
  const status = isPublishedStatus(record.Status__c)
    ? 'active'
    : deriveStatus(startDate, endDate)

  return {
    id: record.Id,
    reference: record.Name || record.Reference__c || record.Id,
    status,
    escale: record.Escale_concernee__c || '-',
    productType: record.Type_de_produit__c || '-',
    startDate,
    endDate,
    period: `${toUiDate(startDate)} -> ${toUiDate(endDate)}`,
    priceFloor: record.Price__c ?? null,
    priceCeiling: record.Plafond__c ?? null,
    submissionLimit24h: record.Limite_soumissions_24h__c ?? null,
    submittedAt: record.Submitted_At__c || null,
    minInventoryCommitment: record.Engagement_minimal_d_inventaire_hotel__c ?? null,
    volumeForecast: record.Volume_previsionnel_nuitees_mois__c ?? null,
    weightPrice: record.Ponderation_prix__c ?? null,
    weightSla: record.Ponderation_SLA__c ?? null,
    weightQuality: record.Ponderation_qualite__c ?? null,
    message: record.Message_accompagnant_l_invitation__c || '',
  }
}

function normalizeOfferUi(offer) {
  const startDate = offer.startDate || null
  const endDate = offer.endDate || null
  const normalizedStatus = (() => {
    if (offer.status === 'active' || offer.status === 'pending' || offer.status === 'closed') {
      return offer.status
    }
    if (isPublishedStatus(offer.status)) return 'active'
    return deriveStatus(startDate, endDate)
  })()

  return {
    ...offer,
    status: normalizedStatus,
    period: offer.period || `${toUiDate(startDate)} -> ${toUiDate(endDate)}`,
    escale: offer.escale || '-',
    productType: offer.productType || '-',
    message: offer.message || '',
  }
}

export async function getOffers() {
  if (useMockMode()) {
    await fakeDelay()
    return mockOffers
  }

  try {
    const { data } = await api.get('/api/offers')
    if (!Array.isArray(data)) return []

    if (data.length === 0 || data[0].reference) {
      return data
        .map(normalizeOfferUi)
        .filter((offer) => {
          if (offer.status === 'active') return true
          if (isPublishedStatus(offer.status)) return true
          return false
        })
    }

    return data
      .filter((record) => isPublishedStatus(record.Status__c))
      .map(mapOfferRecordToUi)
  } catch {
    await fakeDelay()
    return mockOffers
  }
}

export async function getOffersFromSObjectApi() {
  return getOffers()
}

export async function getConsultations() {
  if (useMockMode()) {
    await fakeDelay()
    return consultations
  }

  const { data } = await api.get('/api/consultations')
  return data
}

export async function getConsultationDetail(consultationId) {
  if (useMockMode()) {
    await fakeDelay()
    return {
      ranking,
      kpis: hotelKpis,
      priceEvolution,
    }
  }

  const { data } = await api.get(`/api/consultations/${consultationId}`)
  return data
}

export async function getMyHistory(consultationId) {
  if (useMockMode()) {
    await fakeDelay()
    return myHistory
  }

  const { data } = await api.get(`/api/history/${consultationId}`)
  return data
}

export async function submitBid({ consultationId, price, note }) {
  if (useMockMode()) {
    await fakeDelay(800)
    if (price < 450 || price > 1200) {
      throw new Error('Tarif hors fourchette autorisee (450-1200 MAD)')
    }

    return {
      success: true,
      version: 'v.13',
      timestamp: new Date().toLocaleString('fr-FR'),
      newRank: price <= 614 ? 1 : price <= 659 ? 2 : price <= 694 ? 3 : 4,
    }
  }

  const { data } = await api.post('/api/submit', {
    consultationId,
    price,
    note,
    hotelId: currentHotel?.id,
  })
  return data
}

export async function getCurrentHotel() {
  if (useMockMode()) {
    await fakeDelay(150)
    return currentHotel
  }

  const { data } = await api.get('/api/me')
  return data
}

export async function getSoumissionsByOffer(offerId) {
  if (!offerId) return []

  if (useMockMode()) {
    await fakeDelay(250)
    return myHistory.map((item, index) => ({
      id: `mock-${index}`,
      name: item.ver,
      price: item.price,
      submittedAt: item.ts,
      conditions: null,
      note: item.note === '—' ? '' : item.note,
      author: item.author,
    }))
  }

  const { data } = await api.get('/api/soumissions', {
    params: { offerId },
  })
  const parsed = normalizeJsonResponse(data)
  return Array.isArray(parsed) ? parsed : []
}

export async function getConditionsAssocieesValues() {
  if (useMockMode()) {
    await fakeDelay(150)
    return [
      { label: 'Annulation gratuite jusqu\'à J-1 · paiement à la réservation', value: 'Annulation gratuite jusqu\'à J-1 · paiement à la réservation' },
      { label: 'Tarif non remboursable', value: 'Tarif non remboursable' },
      { label: 'Annulation gratuite jusqu\'à J-3', value: 'Annulation gratuite jusqu\'à J-3' },
    ]
  }

  const { data } = await api.get('/api/soumissions', {
    params: { meta: 'conditions' },
  })

  const parsed = normalizeJsonResponse(data)
  return Array.isArray(parsed) ? parsed : []
}

export async function createSoumission(appelDOffresId, prixPropose, conditionsAssociees = '', noteInterne = '') {
  if (useMockMode()) {
    await fakeDelay(800)
    return {
      success: true,
      message: 'Soumission créée avec succès (mode mock).',
      soumissionId: 'a0x' + Math.random().toString(36).substr(2, 15),
      soumissionName: 'SUB-' + Date.now(),
      versionNumber: 1,
    }
  }

  try {
    const { data } = await api.post('/api/soumissions', {
      appelDOffresId,
      prixPropose,
      conditionsAssociees,
      noteInterne,
    })
    return data
  } catch (error) {
    console.error('Erreur lors de la création de la soumission:', error)
    throw error
  }
}

