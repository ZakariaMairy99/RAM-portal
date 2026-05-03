import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getOffers, createSoumission, getSoumissionsByOffer, getConditionsAssocieesValues } from '../services/salesforceApi'
import { ranking, priceEvolution, myHistory } from '../data/mockData'
import ConsultationsList from '../components/ConsultationsList'
import OfferKpiGrid from '../components/OfferKpiGrid'
import RankingTable from '../components/RankingTable'
import PriceChart from '../components/PriceChart'
import HistoryTimeline from '../components/HistoryTimeline'
import OfferDetails from '../components/OfferDetails'
import LoadingState from '../components/LoadingState'

export default function HotelDashboard() {
  const [offers, setOffers] = useState([])
  const [activeOffer, setActiveOffer] = useState(null)
  const [liveRanking, setLiveRanking] = useState(ranking)
  const [liveHistory, setLiveHistory] = useState(myHistory)
  const [conditionsOptions, setConditionsOptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  const refreshSoumissionData = async (offerId) => {
    if (!offerId) {
      setLiveRanking(ranking)
      setLiveHistory(myHistory)
      return
    }

    try {
      const soumissions = await getSoumissionsByOffer(offerId)

      if (!soumissions.length) {
        setLiveRanking(ranking)
        setLiveHistory(myHistory)
        return
      }

      const latestPrice = soumissions[0]?.price ?? null
      const computedRanking = buildRankingFromLatestPrice(ranking, latestPrice)

      setLiveRanking(computedRanking)
      setLiveHistory(buildHistoryFromSoumissions(soumissions, computedRanking))
    } catch {
      setLiveRanking(ranking)
      setLiveHistory(myHistory)
    }
  }

  useEffect(() => {
    async function loadOffers() {
      try {
        const list = await getOffers()
        setOffers(list)
        const active = list.find((o) => o.status === 'active') || list[0] || null
        setActiveOffer(active)
      } finally {
        setLoading(false)
      }
    }

    loadOffers()
  }, [])

  useEffect(() => {
    async function loadConditions() {
      try {
        const values = await getConditionsAssocieesValues()
        setConditionsOptions(values)
      } catch {
        setConditionsOptions([
          { label: 'Annulation gratuite jusqu\'à J-1 · paiement à la réservation', value: 'Annulation gratuite jusqu\'à J-1 · paiement à la réservation' },
          { label: 'Tarif non remboursable', value: 'Tarif non remboursable' },
          { label: 'Annulation gratuite jusqu\'à J-3', value: 'Annulation gratuite jusqu\'à J-3' },
        ])
      }
    }

    loadConditions()
  }, [])

  useEffect(() => {
    refreshSoumissionData(activeOffer?.id)
  }, [activeOffer?.id])

  if (loading) {
    return <LoadingState />
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-ram-gold" />
          <span className="text-ram-gold text-[10px] uppercase tracking-[0.3em] font-medium">
            Espace Hotel
          </span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="heading-display text-3xl md:text-4xl text-ram-secondary mb-2">
              Hotel Atlas Sky Airport
            </h1>
            <p className="text-ink-muted text-sm">Bienvenue Karim Bennani · Casablanca</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
            <span className="text-xs font-medium text-green-700">Bidding actif · maj temps reel</span>
          </div>
        </div>
      </motion.div>

      <ConsultationsList consultations={offers} active={activeOffer} onSelect={setActiveOffer} />

      <OfferKpiGrid
        offers={offers}
        activeOffer={activeOffer}
        showDetails={showDetails}
        onToggleDetails={() => setShowDetails((value) => !value)}
        ranking={liveRanking}
      />

      {showDetails ? (
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
          <div className="xl:col-span-2 flex">
            <OfferDetails offer={activeOffer} />
          </div>
          <div className="flex">
            <StaticSubmissionPanel
              activeOffer={activeOffer}
              ranking={liveRanking}
              conditionsOptions={conditionsOptions}
              onSoumissionCreated={() => refreshSoumissionData(activeOffer?.id)}
            />
          </div>
        </div>
      ) : null}

      <div className="mt-8">
        <RankingTable ranking={liveRanking} />
      </div>

      <div className="mt-8">
        <PriceChart data={priceEvolution} />
      </div>

      <div className="mt-8">
        <HistoryTimeline history={liveHistory} />
      </div>
    </div>
  )
}

function buildRankingFromLatestPrice(baseRanking, latestPrice) {
  if (latestPrice == null) return baseRanking

  const now = new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const meRow = baseRanking.find((row) => row.me)
  if (!meRow) return baseRanking

  const previousPrice = meRow.price
  const delta = latestPrice - previousPrice

  return baseRanking
    .map((row) => {
      if (!row.me) return row
      return {
        ...row,
        price: latestPrice,
        delta,
        lastUpdate: now,
      }
    })
    .sort((a, b) => a.price - b.price)
    .map((row, index) => ({ ...row, rank: index + 1 }))
}

function computeRankForPrice(competitorPrices, price) {
  const betterCount = competitorPrices.filter((value) => value < price).length
  return betterCount + 1
}

function formatHistoryTimestamp(value) {
  if (!value) return '-'
  const dt = new Date(value)
  if (Number.isNaN(dt.getTime())) return String(value)
  return dt.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function buildHistoryFromSoumissions(soumissions, computedRanking) {
  const competitorPrices = computedRanking.filter((row) => !row.me).map((row) => row.price)
  const total = computedRanking.length

  return soumissions.map((item, index) => {
    const versionNumber = soumissions.length - index
    const price = Number(item.price || 0)
    return {
      ver: item.versionNumber ? `v.${item.versionNumber}` : item.name || `v.${versionNumber}`,
      versionNumber: item.versionNumber || versionNumber,
      price,
      rank: computeRankForPrice(competitorPrices, price),
      total,
      ts: formatHistoryTimestamp(item.submittedAt),
      note: item.note || '—',
      author: item.author || 'Vous',
    }
  })
}

function getProjectedRank(rankingRows, proposedPrice) {
  const competitorPrices = rankingRows.filter((row) => !row.me).map((row) => row.price)
  return computeRankForPrice(competitorPrices, proposedPrice)
}

function StaticSubmissionPanel({ activeOffer, ranking, conditionsOptions, onSoumissionCreated }) {
  const [proposedPriceInput, setProposedPriceInput] = useState('')
  const [conditions, setConditions] = useState('')
  const [internalNote, setInternalNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const floor = activeOffer?.priceFloor ?? 450
  const ceiling = activeOffer?.priceCeiling ?? 1200

  // Initialiser le prix proposé avec une valeur par défaut
  useEffect(() => {
    const defaultPrice = Math.max(floor, Math.min(ceiling, floor + 165))
    setProposedPriceInput(String(defaultPrice))
  }, [activeOffer, floor, ceiling])

  const proposedPrice = Number(proposedPriceInput)
  const hasValidProposedPrice = proposedPriceInput.trim() !== '' && Number.isFinite(proposedPrice)
  const bestMarketPrice = ranking[0]?.price
  const currentRank = ranking.find((row) => row.me)?.rank || 0
  const projectedRank = hasValidProposedPrice ? getProjectedRank(ranking, proposedPrice) : null
  const rankMessage =
    !hasValidProposedPrice
      ? 'Position projetee : saisir un tarif valide'
      : currentRank === 0
      ? `Position projetee : #${projectedRank}`
      : projectedRank < currentRank
        ? `Position projetee : #${projectedRank} (amelioration)`
        : projectedRank > currentRank
          ? `Position projetee : #${projectedRank} (degradation)`
          : `Position projetee : #${projectedRank} (inchangée)`

  const handlePriceChange = (e) => {
    setProposedPriceInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitMessage('')
    setSubmitError('')
    setIsSubmitting(true)

    try {
      // Valider le prix
      if (!hasValidProposedPrice || proposedPrice < floor || proposedPrice > ceiling) {
        throw new Error(`Tarif hors fourchette autorisée (${floor}-${ceiling} MAD)`)
      }

      // Appeler l'API pour créer la soumission
      const response = await createSoumission(
        activeOffer.id,
        proposedPrice,
        conditions,
        internalNote
      )

      if (response.success) {
        const versionLabel = response.versionNumber ? ` v.${response.versionNumber}` : ''
        setSubmitMessage(`${response.message || 'Soumission créée avec succès.'}${versionLabel}`)
        await onSoumissionCreated?.()
        // Réinitialiser le formulaire
        const defaultPrice = Math.max(floor, Math.min(ceiling, floor + 165))
        setProposedPriceInput(String(defaultPrice))
        setConditions('')
        setInternalNote('')
      } else {
        setSubmitError(response.message || 'Erreur lors de la création de la soumission.')
      }
    } catch (error) {
      setSubmitError(error.message || 'Une erreur s\'est produite lors de la soumission.')
      console.error('Erreur:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card-premium overflow-hidden flex flex-col w-full">
      <div className="px-6 py-4 bg-gradient-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 moroccan-pattern-dark opacity-30" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-px bg-ram-gold" />
            <span className="text-ram-gold text-[10px] uppercase tracking-[0.24em] font-medium">
              Soumission
            </span>
          </div>
          <h3 className="font-display font-semibold text-lg">Nouvelle proposition tarifaire</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-4 flex-1">
          {/* Affichage des messages */}
          {submitMessage && (
            <div className="p-3.5 rounded-lg border border-green-200 bg-green-50">
              <div className="font-semibold text-green-900 text-sm">{submitMessage}</div>
            </div>
          )}

          {submitError && (
            <div className="p-3.5 rounded-lg border border-red-200 bg-red-50">
              <div className="font-semibold text-red-900 text-sm">{submitError}</div>
            </div>
          )}

          {/* Tarif proposé */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold mb-1.5">
              Tarif propose
            </div>
            <input
              type="number"
              min={floor}
              max={ceiling}
              value={proposedPriceInput}
              onChange={handlePriceChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-display font-bold text-lg text-ram-secondary"
            />
            <p className="text-[11px] text-ink-muted mt-1.5 leading-relaxed">
              Plage autorisee : {floor} - {ceiling} MAD · Best marche actuel :{' '}
              <strong>{bestMarketPrice || '-'}</strong> MAD
            </p>
          </div>

          {/* Position projetée */}
          <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50">
            <div className="font-semibold text-blue-900 text-sm">{rankMessage}</div>
            <div className="text-[13px] text-blue-800 mt-1">Classement recalcule automatiquement apres soumission.</div>
          </div>

          {/* Conditions associées */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold mb-1.5">
              Conditions associees
            </div>
            <select
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-ink-subtle text-sm"
            >
              <option value="">Sélectionner une condition...</option>
              {conditionsOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Note interne */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold mb-1.5">
              Note interne (optionnel)
            </div>
            <textarea
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
              placeholder="Justification ou contexte de cette soumission..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-ink-subtle text-sm leading-relaxed h-20 resize-none"
            />
          </div>
        </div>

        {/* Bouton + footer — collé en bas */}
        <div className="flex flex-col gap-4 mt-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-premium-primary justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Soumission en cours...' : 'Soumettre le tarif'}
          </button>

          <div className="pt-3 border-t border-gray-100 text-[11px] text-ink-muted leading-relaxed">
            Soumission <strong>horodatee et notifiee</strong> a la Direction Achats RAM.
          </div>
        </div>
      </form>
    </div>
  )
}
