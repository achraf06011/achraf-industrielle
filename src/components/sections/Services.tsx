'use client'

import { useRef, MouseEvent, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Construction, Cog, Wrench, Zap, Package, Wheat, ArrowRight, X, Phone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { scrollToSection } from '@/lib/utils'

const serviceData = [
  { key: 'metallic', icon: Construction, gradient: 'from-blue-900 via-blue-700 to-blue-500', lightGradient: 'from-blue-50 to-blue-100/50', iconBg: 'bg-blue-600', modalGlow: 'from-blue-600/20 to-blue-400/5' },
  { key: 'machining', icon: Cog, gradient: 'from-slate-900 via-slate-700 to-slate-500', lightGradient: 'from-slate-50 to-slate-100/50', iconBg: 'bg-slate-700', modalGlow: 'from-slate-600/20 to-slate-400/5' },
  { key: 'maintenance', icon: Wrench, gradient: 'from-indigo-900 via-indigo-700 to-indigo-500', lightGradient: 'from-indigo-50 to-indigo-100/50', iconBg: 'bg-indigo-600', modalGlow: 'from-indigo-600/20 to-indigo-400/5' },
  { key: 'electrical', icon: Zap, gradient: 'from-sky-900 via-sky-700 to-sky-500', lightGradient: 'from-sky-50 to-sky-100/50', iconBg: 'bg-sky-600', modalGlow: 'from-sky-600/20 to-sky-400/5' },
  { key: 'plastics', icon: Package, gradient: 'from-cyan-900 via-cyan-700 to-cyan-500', lightGradient: 'from-cyan-50 to-cyan-100/50', iconBg: 'bg-cyan-600', modalGlow: 'from-cyan-600/20 to-cyan-400/5' },
  { key: 'agro', icon: Wheat, gradient: 'from-teal-900 via-teal-700 to-teal-500', lightGradient: 'from-teal-50 to-teal-100/50', iconBg: 'bg-teal-600', modalGlow: 'from-teal-600/20 to-teal-400/5' },
]

type ServiceItem = typeof serviceData[0]

function ServiceCard({ service, onOpen }: { service: ServiceItem; onOpen: (s: ServiceItem) => void }) {
  const t = useTranslations('services')
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = service.icon

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
    cardRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <motion.div variants={fadeInUp} className="group cursor-pointer" onClick={() => onOpen(service)}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-card-hover group-hover:border-brand-blue/20"
        style={{ transition: 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}
      >
        <div className={`h-1 bg-gradient-to-r ${service.gradient}`} />
        <div className="p-7 bg-white">
          <div className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-display font-bold text-xl text-gray-900 mb-3 group-hover:text-brand-blue transition-colors">
            {t(`${service.key}_title` as Parameters<typeof t>[0])}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            {t(`${service.key}_desc` as Parameters<typeof t>[0])}
          </p>
          <div className="flex items-center gap-2 text-brand-blue text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {t('cta')} <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-br ${service.lightGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`} />
      </div>
    </motion.div>
  )
}

function ServiceModal({ service, onClose }: { service: ServiceItem; onClose: () => void }) {
  const t = useTranslations('services')
  const Icon = service.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-lg bg-brand-dark rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          onClick={e => e.stopPropagation()}
        >
          {/* Top gradient */}
          <div className={`h-1.5 bg-gradient-to-r ${service.gradient}`} />

          {/* Glow bg */}
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${service.modalGlow} rounded-full blur-3xl pointer-events-none`} />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition z-10"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="p-8 relative z-10">
            {/* Icon + title */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center shadow-lg shrink-0`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-display font-bold text-2xl text-white">
                {t(`${service.key}_title` as Parameters<typeof t>[0])}
              </h2>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-8">
              {t(`${service.key}_desc` as Parameters<typeof t>[0])}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { onClose(); setTimeout(() => scrollToSection('quote'), 150) }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue hover:bg-blue-600 rounded-xl font-semibold text-white transition"
              >
                Demander un devis
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+212697601775"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 rounded-xl font-semibold text-white transition border border-white/10"
              >
                <Phone className="w-4 h-4" />
                +212 697 601 775
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Services() {
  const t = useTranslations('services')
  const [selected, setSelected] = useState<ServiceItem | null>(null)

  return (
    <section id="services" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}><Badge className="mb-4">{t('badge')}</Badge></motion.div>
          <motion.h2 variants={fadeInUp} className="font-display font-bold text-3xl md:text-5xl text-gray-900 mb-4">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {serviceData.map((service, index) => (
            <ServiceCard key={service.key} service={service} onOpen={setSelected} />
          ))}
        </motion.div>
      </div>

      {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
