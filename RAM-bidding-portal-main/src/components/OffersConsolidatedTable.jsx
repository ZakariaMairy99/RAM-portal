import { motion } from 'framer-motion'

export default function OffersConsolidatedTable({ offers = [], activeOfferId, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card-premium overflow-hidden mt-8"
    >
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="font-display font-semibold text-base text-ram-secondary">
          Tableau consolidé des consultations publiées
        </h3>
        <p className="text-xs text-ink-muted mt-1">
          Vue synthese des offres disponibles et de leurs contraintes.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[980px]">
          <thead className="bg-bg border-b border-gray-100">
            <tr>
              <Th>Reference</Th>
              <Th>Escale</Th>
              <Th>Produit</Th>
              <Th>Periode</Th>
              <Th align="right">Plancher</Th>
              <Th align="right">Plafond</Th>
              <Th align="right">Pond. prix</Th>
              <Th align="right">Pond. SLA</Th>
              <Th align="right">Pond. qualite</Th>
              <Th>Statut</Th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr
                key={offer.id}
                onClick={() => onSelect?.(offer)}
                className={`border-b border-gray-50 cursor-pointer ${
                  activeOfferId === offer.id ? 'bg-ram-gold/10' : 'hover:bg-gray-50'
                }`}
              >
                <Td strong>{offer.reference}</Td>
                <Td>{offer.escale || '-'}</Td>
                <Td>{offer.productType || '-'}</Td>
                <Td>{offer.period || '-'}</Td>
                <Td align="right">{toMoney(offer.priceFloor)}</Td>
                <Td align="right">{toMoney(offer.priceCeiling)}</Td>
                <Td align="right">{toPercent(offer.weightPrice)}</Td>
                <Td align="right">{toPercent(offer.weightSla)}</Td>
                <Td align="right">{toPercent(offer.weightQuality)}</Td>
                <Td>
                  <StatusBadge status={offer.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

function StatusBadge({ status }) {
  if (status === 'active') {
    return <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">Publie</span>
  }
  if (status === 'pending') {
    return <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">A venir</span>
  }
  return <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">Clos</span>
}

function Th({ children, align = 'left' }) {
  const alignClass = align === 'right' ? 'text-right' : 'text-left'
  return (
    <th className={`px-4 py-3 text-[10px] uppercase tracking-wider text-ink-muted font-semibold ${alignClass}`}>
      {children}
    </th>
  )
}

function Td({ children, align = 'left', strong = false }) {
  const alignClass = align === 'right' ? 'text-right' : 'text-left'
  return (
    <td className={`px-4 py-3 ${alignClass} ${strong ? 'font-medium text-ram-secondary' : 'text-ink'}`}>
      {children}
    </td>
  )
}

function toMoney(value) {
  if (value == null || value === '') return '-'
  return `${value} MAD`
}

function toPercent(value) {
  if (value == null || value === '') return '-'
  return `${value}%`
}
