import { motion } from 'framer-motion'
import { Calendar, AlertCircle } from 'lucide-react'

export default function ConsultationsList({ consultations, active, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-display font-semibold text-lg text-ram-secondary">
            Consultations publiées RAM
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            Liste des consultations disponibles pour l'hôtel
          </p>
        </div>
      </div>

      {consultations.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-ink-muted">
          Aucune consultation publiée visible pour le moment.
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {consultations.map((offer, i) => (
          <motion.button
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            onClick={() => onSelect(offer)}
            className={`text-left p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
              active?.id === offer.id
                ? 'border-ram-primary bg-white shadow-premium'
                : 'border-gray-100 bg-white hover:border-ram-gold/40 hover:shadow-premium'
            }`}
          >
            {offer.status === 'pending' && (
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-orange-50 border border-orange-200 rounded-full text-[10px] font-medium text-orange-700">
                <AlertCircle size={10} />
                A venir
              </div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <StatusBadge status={offer.status} />
              <span className="text-[11px] text-ink-muted font-mono">{offer.reference}</span>
            </div>

            <h3 className="font-display font-semibold text-base text-ram-secondary mb-2 leading-snug">
              {offer.productType}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-4">
              <Calendar size={12} />
              {offer.period || 'Periode non renseignee'}
            </div>

            <div className="pt-4 border-t border-dashed border-gray-200 grid grid-cols-3 gap-2">
              <Stat value={offer.escale || '-'} label="Escale" compact />
              <Stat value={offer.priceFloor != null ? `${offer.priceFloor} MAD` : '-'} label="Plancher" />
              <Stat
                value={offer.priceCeiling != null ? `${offer.priceCeiling} MAD` : '-'}
                label="Plafond"
                highlight={offer.priceCeiling != null}
              />
            </div>

            {active?.id === offer.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-ram-primary via-ram-gold to-ram-primary" />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

function StatusBadge({ status }) {
  const config = {
    active: { label: 'En cours', cls: 'bg-green-50 text-green-700 border-green-200' },
    pending: { label: 'Planifiee', cls: 'bg-orange-50 text-orange-700 border-orange-200' },
    closed: { label: 'Cloturee', cls: 'bg-gray-100 text-gray-600 border-gray-200' },
  }
  const c = config[status] || config.closed
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium border ${c.cls}`}>
      {c.label}
    </span>
  )
}

function Stat({ value, label, highlight, compact = false }) {
  return (
    <div>
      <div
        className={`${compact ? 'font-medium text-xs leading-snug' : 'font-display font-bold text-lg'} ${
          highlight ? 'text-ram-primary' : 'text-ram-secondary'
        }`}
      >
        {value}
      </div>
      <div className="text-[9px] uppercase tracking-wider text-ink-muted mt-0.5">{label}</div>
    </div>
  )
}
