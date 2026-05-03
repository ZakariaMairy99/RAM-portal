import { motion } from 'framer-motion'

export default function OfferDetails({ offer }) {
  if (!offer) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-premium overflow-hidden flex flex-col w-full"
    >
      <div className="px-6 py-4 bg-gradient-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 moroccan-pattern-dark opacity-30" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-px bg-ram-gold" />
            <span className="text-ram-gold text-[10px] uppercase tracking-[0.24em] font-medium">
              Détail consultation
            </span>
          </div>
          <h3 className="font-display font-semibold text-lg">{offer.reference}</h3>
        </div>
      </div>

      <div className="p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <Field label="Escale concernee" value={offer.escale} />
          <Field label="Type de produit" value={offer.productType} />
          <Field label="Date de debut" value={toDate(offer.startDate)} />
          <Field label="Date de fin" value={toDate(offer.endDate)} />
          <Field label="Plancher tarifaire" value={toMoney(offer.priceFloor)} />
          <Field label="Plafond" value={toMoney(offer.priceCeiling)} />
          <Field label="Limite soumissions / 24h" value={offer.submissionLimit24h} />
          <Field
            label="Engagement minimal d'inventaire / hotel"
            value={offer.minInventoryCommitment}
          />
          <Field label="Volume previsionnel (nuitees/mois)" value={offer.volumeForecast} />
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100">
          <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold mb-2">
            Message accompagnant l'invitation
          </div>
          <div className="rounded-xl border border-ram-gold/30 bg-ram-gold/10 p-4">
            <div
              className="text-sm text-ram-secondary leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: offer.message || '<span class="opacity-60">Aucun message</span>',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold mb-1">{label}</div>
      <div className="text-sm text-ram-secondary font-medium">{value ?? '-'}</div>
    </div>
  )
}

function toDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleDateString('fr-FR')
}

function toMoney(value) {
  if (value == null || value === '') return '-'
  return `${value} MAD`
}
