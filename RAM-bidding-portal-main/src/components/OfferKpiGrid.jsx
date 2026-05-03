import { motion } from 'framer-motion'
import { Trophy, TrendingDown, Users, MapPin, Package, Calendar, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

export default function OfferKpiGrid({
  offers = [],
  activeOffer,
  showDetails = false,
  onToggleDetails,
  ranking = [],
}) {
  const best = ranking.find((row) => row.rank === 1) || null
  const me = ranking.find((row) => row.me) || null
  const total = ranking.length || null
  const gap = best && me ? me.price - best.price : null
  const gapPct = best && me && best.price ? Math.round((gap / best.price) * 100) : null

  const kpis = [
    {
      label: 'Meilleure offre marche',
      value: best ? `${best.price} MAD` : '-',
      sub: best ? `${best.hotel} · maj ${best.lastUpdate}` : 'Aucune donnee',
      icon: <Trophy size={18} />,
      highlight: true,
    },
    {
      label: 'Mon classement actuel',
      value: me && total ? `#${me.rank} / ${total}` : '-',
      sub: me ? `Mon tarif : ${me.price} MAD` : 'Aucune donnee',
      icon: <Users size={18} />,
    },
    {
      label: 'Ecart vs meilleur',
      value: gap == null ? '-' : `+${gap} MAD`,
      sub: gapPct == null ? 'Aucune donnee' : `+${gapPct}% au-dessus du best`,
      icon: <TrendingDown size={18} />,
    },
  ]

  return (
    <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-4">

      {/* Carte consultation — large, 2/3 de la grille sur xl */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="xl:col-span-2 rounded-2xl overflow-hidden shadow-premium border border-transparent"
        style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2E1119 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" />
        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-px bg-ram-gold" />
                <span className="text-ram-gold text-[9px] uppercase tracking-[0.28em] font-medium">
                  Consultation active
                </span>
              </div>
              <h3 className="font-display font-bold text-white text-xl tracking-tight">
                {activeOffer?.reference || '—'}
              </h3>
            </div>

            {activeOffer && (
              <span className="shrink-0 mt-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">
                En cours
              </span>
            )}
          </div>

          {/* Infos clés en ligne */}
          {activeOffer ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <InfoBadge icon={<MapPin size={13} />} label="Escale" value={activeOffer.escale} />
              <InfoBadge icon={<Package size={13} />} label="Produit" value={activeOffer.productType} />
              <InfoBadge
                icon={<Calendar size={13} />}
                label="Période"
                value={activeOffer.period || `${toDate(activeOffer.startDate)} → ${toDate(activeOffer.endDate)}`}
              />
            </div>
          ) : (
            <p className="text-white/40 text-sm mb-4">Aucune consultation sélectionnée.</p>
          )}

          {/* Fourchette tarifaire */}
          {activeOffer && (
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-white/40">Plancher</span>
                <span className="font-display font-bold text-white text-sm">{activeOffer.priceFloor ?? '—'} MAD</span>
              </div>
              <div className="w-6 h-px bg-white/20" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-white/40">Plafond</span>
                <span className="font-display font-bold text-white text-sm">{activeOffer.priceCeiling ?? '—'} MAD</span>
              </div>
              {activeOffer.submissionLimit24h && (
                <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ram-gold/10 border border-ram-gold/20">
                  <span className="text-[10px] uppercase tracking-wider text-ram-gold/70">Limite / 24h</span>
                  <span className="font-display font-bold text-ram-gold text-sm">{activeOffer.submissionLimit24h}</span>
                </div>
              )}
            </div>
          )}

          {/* Bouton fiche complète */}
          <button
            onClick={onToggleDetails}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-ram-gold/40 bg-ram-gold/10 hover:bg-ram-gold/20 hover:border-ram-gold/70 transition-all duration-200"
          >
            <span className="text-ram-gold text-xs font-semibold tracking-wide">
              {showDetails ? 'Masquer la fiche complète' : 'Voir la fiche complète'}
            </span>
            {showDetails
              ? <ChevronUp size={14} className="text-ram-gold" />
              : <ChevronDown size={14} className="text-ram-gold group-hover:translate-y-0.5 transition-transform" />
            }
          </button>
        </div>
      </motion.div>

      {/* KPIs — colonne droite empilée */}
      <div className="flex flex-col gap-4">
        {kpis.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: (index + 1) * 0.07 }}
            className={`flex-1 rounded-2xl border p-4 shadow-premium relative overflow-hidden ${
              item.highlight
                ? 'bg-gradient-dark text-white border-transparent'
                : 'bg-white border-gray-100'
            }`}
          >
            {item.highlight && <div className="absolute inset-0 moroccan-pattern-dark opacity-30" />}
            <div className="relative flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className={`text-[9px] uppercase tracking-[0.18em] font-semibold mb-1 ${item.highlight ? 'text-ram-gold' : 'text-ink-muted'}`}>
                  {item.label}
                </div>
                <div className={`font-display font-bold text-xl leading-tight ${item.highlight ? 'text-white' : 'text-ram-secondary'}`}>
                  {item.value}
                </div>
                <div className={`text-[11px] mt-0.5 truncate ${item.highlight ? 'text-white/70' : 'text-ink-muted'}`}>
                  {item.sub}
                </div>
              </div>
              <div className={`shrink-0 p-2.5 rounded-xl ${item.highlight ? 'bg-white/10 text-ram-gold' : 'bg-ram-primary/8 text-ram-primary'}`}>
                {item.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function InfoBadge({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-1.5 text-white/40">
        {icon}
        <span className="text-[9px] uppercase tracking-wider font-medium">{label}</span>
      </div>
      <span className="text-white text-xs font-medium leading-tight truncate">{value || '—'}</span>
    </div>
  )
}

function toDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('fr-FR')
}
