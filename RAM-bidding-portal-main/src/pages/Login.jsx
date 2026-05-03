import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Veuillez renseigner votre email et mot de passe.')
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    navigate('/portal')
  }

  return (
    <div className="min-h-screen flex">
      {/* Panneau gauche — identité RAM */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-[52%] relative flex-col justify-between overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #1A0A0F 0%, #2E1119 40%, #4A1E2C 100%)' }}
      >
        {/* Motif marocain */}
        <div className="absolute inset-0 moroccan-pattern-dark opacity-60" />

        {/* Ligne dorée gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ram-gold/40 to-transparent" />

        {/* Grille décorative */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,106,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,106,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Cercle flou décoratif */}
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #C20831 0%, transparent 70%)' }}
        />
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A86A 0%, transparent 70%)' }}
        />

        <div className="relative z-10 p-12">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <img src="/logo-ram.png" alt="Royal Air Maroc" className="h-10 w-auto object-contain" />
            <div>
              <div className="font-display font-semibold text-white text-sm">Royal Air Maroc</div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-ram-gold">Partenaires Hôteliers</div>
            </div>
          </Link>
        </div>

        <div className="relative z-10 px-12 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-ram-gold" />
            <span className="text-ram-gold text-[10px] uppercase tracking-[0.3em] font-medium">
              Programme Stopover
            </span>
          </div>

          <h2 className="heading-display text-4xl xl:text-5xl text-white mb-6 leading-tight">
            Portail de <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #C9A86A, #E0C893)' }}>
              Bidding Hôtelier
            </span>
          </h2>

          <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-10">
            Accédez à vos appels d'offres, soumettez vos tarifs en temps réel et suivez votre classement parmi les partenaires RAM.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-xs">
            {[
              { value: '32', label: 'Hôtels partenaires' },
              { value: '8', label: 'Escales actives' },
              { value: '2.4M', label: 'Nuitées / an' },
              { value: '98%', label: 'Taux satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur-sm">
                <div className="font-display font-bold text-xl text-ram-gold">{stat.value}</div>
                <div className="text-white/50 text-[11px] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Royal Air Maroc · Portail Partenaires Hôteliers
          </p>
        </div>
      </motion.div>

      {/* Panneau droit — formulaire */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 lg:px-20 bg-bg relative overflow-hidden">
        {/* Motif subtil fond */}
        <div className="absolute inset-0 moroccan-pattern opacity-40" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative z-10 w-full max-w-sm mx-auto"
        >
          {/* Logo mobile uniquement */}
          <div className="flex lg:hidden items-center gap-3 mb-10">
            <img src="/logo-ram.png" alt="Royal Air Maroc" className="h-9 w-auto object-contain" />
            <div>
              <div className="font-display font-semibold text-ram-secondary text-sm">Royal Air Maroc</div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-ram-gold">Partenaires Hôteliers</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-ram-gold" />
              <span className="text-ram-gold text-[10px] uppercase tracking-[0.3em] font-medium">Espace sécurisé</span>
            </div>
            <h1 className="heading-display text-3xl text-ram-secondary mb-2">Connexion</h1>
            <p className="text-ink-muted text-sm">Accédez à votre espace partenaire RAM.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold block mb-1.5">
                Adresse email
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="vous@hotel.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-ink-DEFAULT placeholder:text-ink-subtle focus:outline-none focus:border-ram-primary focus:ring-2 focus:ring-ram-primary/10 transition-all"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
                  Mot de passe
                </label>
                <button
                  type="button"
                  className="text-[11px] text-ram-primary hover:underline font-medium"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 bg-white text-sm text-ink-DEFAULT placeholder:text-ink-subtle focus:outline-none focus:border-ram-primary focus:ring-2 focus:ring-ram-primary/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-ink-muted transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Bouton principal */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-premium-primary justify-center text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none mt-1"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Connexion en cours…
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[11px] text-ink-subtle uppercase tracking-wider">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Accès direct POC */}
          <Link
            to="/portal"
            className="w-full btn-premium border border-gray-200 bg-white hover:bg-gray-50 justify-center text-sm text-ink-muted hover:text-ink-DEFAULT"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
            Accès démo — portail direct
          </Link>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-[11px] text-ink-subtle text-center leading-relaxed">
              Accès réservé aux hôtels partenaires RAM.{' '}
              <Link to="/" className="text-ram-primary hover:underline font-medium">
                Retour à l'accueil
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
