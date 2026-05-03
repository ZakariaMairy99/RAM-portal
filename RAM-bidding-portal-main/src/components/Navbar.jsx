import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar({ variant = 'transparent' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    if (variant !== 'transparent') return
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  const isSolid = variant === 'solid' || scrolled || mobileOpen

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isSolid
          ? 'bg-white/95 backdrop-blur-md shadow-premium'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-ram-primary rounded-lg flex items-center justify-center font-display font-bold text-white text-lg shadow-ram">
                RAM
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-ram-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className={`transition-colors ${isSolid ? 'text-ram-secondary' : 'text-white'}`}>
              <div className="font-display font-semibold text-base leading-tight">
                Royal Air Maroc
              </div>
              <div className={`text-[10px] uppercase tracking-widest font-medium ${
                isSolid ? 'text-ram-gold' : 'text-ram-gold-light'
              }`}>
                Partenaires Hôteliers
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {isLanding ? (
              <>
                <NavLink isSolid={isSolid} href="#about">À propos</NavLink>
                <NavLink isSolid={isSolid} href="#program">Programme</NavLink>
                <NavLink isSolid={isSolid} href="#how">Comment ça marche</NavLink>
                <NavLink isSolid={isSolid} href="#contact">Contact</NavLink>
              </>
            ) : (
              <Link to="/" className={`font-medium text-sm transition-colors ${
                isSolid ? 'text-ink hover:text-ram-primary' : 'text-white hover:text-ram-gold'
              }`}>
                ← Retour à l'accueil
              </Link>
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">            <Link to="/portal" className="btn-premium-primary text-sm">
              Accéder au portail
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className={isSolid ? 'text-ram-secondary' : 'text-white'} />
            ) : (
              <Menu className={isSolid ? 'text-ram-secondary' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="lg:hidden border-t border-gray-100 py-6 space-y-4"
          >
            <a href="#about" className="block text-ink font-medium">À propos</a>
            <a href="#program" className="block text-ink font-medium">Programme</a>
            <a href="#how" className="block text-ink font-medium">Comment ça marche</a>
            <a href="#contact" className="block text-ink font-medium">Contact</a>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link to="/portal" className="btn-premium-primary text-sm justify-center">
                Accéder au portail
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

function NavLink({ href, children, isSolid }) {
  return (
    <a
      href={href}
      className={`text-sm font-medium tracking-wide transition-colors relative group ${
        isSolid ? 'text-ink' : 'text-white'
      }`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ram-gold transition-all group-hover:w-full" />
    </a>
  )
}





