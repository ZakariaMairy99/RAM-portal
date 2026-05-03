import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Award,
  ChevronDown,
  Building2,
  LineChart,
  Users,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Landing() {
  // Reveal au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-bg">
      <Navbar variant="transparent" />

      {/* ========= HERO SECTION ========= */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Vidéo background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
          >
            <source
              src="https://cdn.pixabay.com/video/2024/03/15/204306-924595608_large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Overlay sombre + dégradé rouge → prune */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-ram-secondary/40 via-transparent to-ram-primary/30" />
          <div className="absolute inset-0 moroccan-pattern-dark opacity-60" />
        </div>

        {/* Lignes dorées décoratives */}
        <div className="absolute top-32 left-12 hidden lg:block">
          <div className="gold-line-vertical h-32 mb-3" />
          <div className="text-[10px] uppercase tracking-[0.4em] text-ram-gold rotate-90 origin-left translate-x-3">
            Est. 1957
          </div>
        </div>

        {/* Contenu hero */}
        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-ram-gold" />
              <span className="text-ram-gold text-xs uppercase tracking-[0.3em] font-medium">
                Programme Partenaires Hôteliers
              </span>
            </div>

            {/* Titre */}
            <h1 className="heading-display text-white text-5xl md:text-7xl lg:text-8xl mb-6">
              L'excellence
              <br />
              <span className="text-ram-gold">en altitude.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/85 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
              Rejoignez le réseau des hôtels partenaires de la compagnie nationale.
              Soumettez vos tarifs, suivez votre positionnement en temps réel,
              et accompagnez nos équipages à travers le Royaume.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link to="/portal" className="btn-premium-gold text-base">
                Accéder au portail
                <ArrowRight size={18} />
              </Link>
              <a
                href="#program"
                className="btn-premium border border-white/30 text-white hover:bg-white/10"
              >
                Découvrir le programme
              </a>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </section>

      {/* ========= STATS BANNER ========= */}
      <section className="relative bg-gradient-dark text-white py-16 overflow-hidden">
        <div className="absolute inset-0 moroccan-pattern-dark opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <Stat number="32" label="Hôtels partenaires" />
            <Stat number="8" label="Escales couvertes" />
            <Stat number="2.4M" label="Nuitées / an" suffix="" />
            <Stat number="98%" label="Taux de satisfaction" />
          </div>
        </div>
      </section>

      {/* ========= ABOUT SECTION ========= */}
      <section id="about" className="py-32 relative">
        <div className="absolute inset-0 moroccan-pattern" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 reveal">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-ram-gold" />
                <span className="text-ram-gold text-xs uppercase tracking-[0.3em] font-medium">
                  À Propos
                </span>
              </div>
              <h2 className="heading-display text-4xl md:text-5xl text-ram-secondary mb-6">
                Un savoir-faire
                <br />
                <span className="text-ram-primary">depuis 1957.</span>
              </h2>
              <p className="text-ink-muted text-base md:text-lg leading-relaxed mb-6">
                Royal Air Maroc accompagne ses partenaires hôteliers dans une
                démarche d'excellence et de transparence. Notre programme de
                bidding garantit des conditions équitables et une visibilité
                temps réel sur le marché.
              </p>
              <p className="text-ink-muted text-base leading-relaxed mb-8">
                De Casablanca à Marrakech, en passant par Rabat et Tanger,
                nos partenaires partagent les valeurs de la compagnie nationale :
                hospitalité, exigence, et fierté marocaine.
              </p>
              <div className="gold-divider w-24" />
            </div>

            <div className="lg:col-span-7 reveal">
              <div className="grid grid-cols-2 gap-6">
                <FeatureCard
                  icon={<TrendingUp size={28} />}
                  title="Bidding temps réel"
                  text="Soumettez vos tarifs et visualisez votre classement instantanément"
                  delay={0}
                />
                <FeatureCard
                  icon={<Shield size={28} />}
                  title="Transparence totale"
                  text="Logique de classement paramétrable et entièrement journalisée"
                  delay={0.1}
                />
                <FeatureCard
                  icon={<Zap size={28} />}
                  title="Réactivité garantie"
                  text="Notifications instantanées sur chaque mouvement du marché"
                  delay={0.2}
                />
                <FeatureCard
                  icon={<Award size={28} />}
                  title="Partenariat premium"
                  text="Conditions négociées selon une logique de score composite"
                  delay={0.3}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========= PROGRAM SECTION ========= */}
      <section id="program" className="py-32 bg-gradient-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 moroccan-pattern-dark opacity-40" />
        <div className="absolute top-0 left-0 right-0 gold-divider" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 reveal">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-ram-gold" />
              <span className="text-ram-gold text-xs uppercase tracking-[0.3em] font-medium">
                Le Programme
              </span>
              <div className="w-12 h-px bg-ram-gold" />
            </div>
            <h2 className="heading-display text-4xl md:text-5xl mb-6">
              Trois piliers,
              <br />
              <span className="text-ram-gold">une même exigence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProgramCard
              number="01"
              icon={<Building2 size={32} />}
              title="Inscription"
              text="Rejoignez le programme via une procédure simplifiée. Notre équipe valide votre candidature sous 72h."
            />
            <ProgramCard
              number="02"
              icon={<LineChart size={32} />}
              title="Bidding"
              text="Recevez les consultations de la Direction Achats RAM, soumettez vos tarifs et suivez votre classement en direct."
            />
            <ProgramCard
              number="03"
              icon={<Users size={32} />}
              title="Partenariat"
              text="Accueillez nos équipages dans votre établissement et bénéficiez d'une visibilité accrue auprès du groupe RAM."
            />
          </div>
        </div>
      </section>

      {/* ========= HOW IT WORKS ========= */}
      <section id="how" className="py-32 bg-bg relative">
        <div className="absolute inset-0 moroccan-pattern" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 reveal">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-ram-gold" />
              <span className="text-ram-gold text-xs uppercase tracking-[0.3em] font-medium">
                Comment ça marche
              </span>
              <div className="w-12 h-px bg-ram-gold" />
            </div>
            <h2 className="heading-display text-4xl md:text-5xl text-ram-secondary mb-6">
              Quatre étapes
              <br />
              <span className="text-ram-primary">vers le partenariat.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
            <StepCard step="1" title="Connexion" text="Identifiez-vous via le portail sécurisé avec vos accès partenaire." />
            <StepCard step="2" title="Consultations" text="Consultez les demandes de prix actives sur vos escales d'intérêt." />
            <StepCard step="3" title="Soumission" text="Proposez votre tarif. Validation automatique et horodatage en temps réel." />
            <StepCard step="4" title="Suivi" text="Visualisez votre rang et l'évolution du marché en continu." />
          </div>
        </div>
      </section>

      {/* ========= CTA SECTION ========= */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-ram" />
        <div className="absolute inset-0 moroccan-pattern-dark opacity-50" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-12 text-center reveal">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-ram-gold" />
            <span className="text-ram-gold text-xs uppercase tracking-[0.3em] font-medium">
              Prêt à embarquer ?
            </span>
            <div className="w-12 h-px bg-ram-gold" />
          </div>
          <h2 className="heading-display text-4xl md:text-6xl text-white mb-6">
            Rejoignez l'aventure
            <br />
            <span className="text-ram-gold">RAM × Hôtels.</span>
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Accédez dès maintenant au portail de bidding et participez aux
            consultations actives sur les escales du Royaume.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/portal" className="btn-premium-gold text-base">
              Accéder au portail
              <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-premium border border-white/40 text-white hover:bg-white/10">
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ============ Sub-components ============ */

function Stat({ number, label, suffix = '' }) {
  return (
    <div className="text-center md:text-left">
      <div className="font-display font-bold text-4xl md:text-5xl text-ram-gold mb-2">
        {number}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/60">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, text, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="card-premium p-6 group"
    >
      <div className="w-14 h-14 rounded-xl bg-ram-primary/10 text-ram-primary flex items-center justify-center mb-4 group-hover:bg-ram-primary group-hover:text-white transition-all">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-lg text-ram-secondary mb-2">{title}</h3>
      <p className="text-sm text-ink-muted leading-relaxed">{text}</p>
      <div className="gold-divider w-12 mt-4" />
    </motion.div>
  )
}

function ProgramCard({ number, icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative group"
    >
      <div className="absolute -top-6 -left-2 text-7xl font-display font-bold text-ram-gold/20 group-hover:text-ram-gold/30 transition-colors">
        {number}
      </div>
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-ram-gold/30 transition-all">
        <div className="text-ram-gold mb-6">{icon}</div>
        <h3 className="font-display font-semibold text-2xl mb-4">{title}</h3>
        <p className="text-white/70 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  )
}

function StepCard({ step, title, text }) {
  return (
    <div className="card-premium p-7 hover:border-ram-gold/40 relative">
      <div className="absolute top-7 right-7 w-10 h-10 rounded-full bg-ram-secondary text-ram-gold font-display font-bold flex items-center justify-center text-sm">
        {step}
      </div>
      <h3 className="font-display font-semibold text-lg text-ram-secondary mb-3 mt-2 pr-12">{title}</h3>
      <p className="text-sm text-ink-muted leading-relaxed">{text}</p>
      <div className="gold-divider w-12 mt-5" />
    </div>
  )
}


