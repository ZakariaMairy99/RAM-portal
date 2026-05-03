import { Mail, MapPin, Phone, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-bg-dark text-white overflow-hidden">
      {/* Motif marocain subtil */}
      <div className="absolute inset-0 moroccan-pattern-dark opacity-40" />

      {/* Ligne dorée du haut */}
      <div className="gold-divider" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo-ram.png" alt="Royal Air Maroc" className="h-12 w-auto object-contain" />
              <div>
                <div className="font-display font-semibold">Royal Air Maroc</div>
                <div className="text-[10px] uppercase tracking-widest text-ram-gold">
                  Partenaires Hôteliers
                </div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Le programme de partenariat hôtelier de la compagnie nationale du Royaume du Maroc.
            </p>
            <div className="gold-divider mt-8 mb-6 w-16" />
            <div className="text-[10px] uppercase tracking-widest text-ram-gold font-medium">
              المملكة المغربية
            </div>
            <div className="text-xs text-white/40 mt-1">Royaume du Maroc</div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-ram-gold font-semibold mb-6">
              Programme
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#" className="hover:text-ram-gold transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-ram-gold transition-colors">Devenir partenaire</a></li>
              <li><a href="#" className="hover:text-ram-gold transition-colors">Escales couvertes</a></li>
              <li><a href="#" className="hover:text-ram-gold transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-ram-gold font-semibold mb-6">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#" className="hover:text-ram-gold transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-ram-gold transition-colors">FAQ Bidding</a></li>
              <li><a href="#" className="hover:text-ram-gold transition-colors">Contacter la Direction Achats</a></li>
              <li><a href="#" className="hover:text-ram-gold transition-colors">Conditions partenariat</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-ram-gold font-semibold mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-ram-gold mt-0.5 shrink-0" />
                <span>Aéroport Mohammed V<br />Casablanca, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-ram-gold shrink-0" />
                <span>+212 522 489 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-ram-gold shrink-0" />
                <span>achats-hotels@royalairmaroc.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={16} className="text-ram-gold shrink-0" />
                <span>royalairmaroc.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="gold-divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © 2026 Royal Air Maroc — Tous droits réservés
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ram-gold transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-ram-gold transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-ram-gold transition-colors">CGU</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
