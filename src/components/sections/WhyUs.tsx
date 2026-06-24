'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Clock, Target, Cpu, Headphones } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { staggerContainer, fadeInUp, fadeInLeft, viewportConfig } from '@/lib/animations'

const reasonIcons = [TrendingUp, Users, Clock, Target, Cpu, Headphones]
const reasonColors = [
  'bg-blue-600',
  'bg-indigo-600',
  'bg-cyan-600',
  'bg-sky-600',
  'bg-brand-blue',
  'bg-slate-700',
]

const reasons = ['experience', 'team', 'deadline', 'custom', 'technology', 'support']

export default function WhyUs() {
  const t = useTranslations('whyus')

  return (
    <section id="whyus" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4">{t('badge')}</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="font-display font-bold text-3xl md:text-5xl text-gray-900 mb-4">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Reasons Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {reasons.map((reason, index) => {
              const Icon = reasonIcons[index]
              return (
                <motion.div
                  key={reason}
                  variants={fadeInUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-blue/20 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${reasonColors[index]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-base mb-2 group-hover:text-brand-blue transition-colors">
                    {t(`${reason}_title`)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(`${reason}_desc`)}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right: Visual card */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-dark to-brand-dark-2 p-10 shadow-blue-glow-lg">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-industrial-grid opacity-20" />

              <div className="relative z-10">
                {/* Large number display */}
                <div className="flex items-end gap-4 mb-8">
                  <span className="font-display font-bold text-8xl text-white leading-none">10</span>
                  <div className="pb-3">
                    <div className="text-brand-blue-bright font-bold text-xl">+</div>
                    <div className="text-gray-400 text-sm">années</div>
                    <div className="text-gray-400 text-sm">d&apos;excellence</div>
                  </div>
                </div>

                {/* Stats list */}
                <div className="space-y-4 mb-8">
                  {[
                    { label: '500+ Projets livrés', pct: 95 },
                    { label: '200+ Clients satisfaits', pct: 98 },
                    { label: 'Respect des délais', pct: 97 },
                    { label: 'Satisfaction client', pct: 99 },
                  ].map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-300">{label}</span>
                        <span className="text-brand-blue-bright font-bold">{pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-bright"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact CTA */}
                <div className="glass rounded-xl p-4 border border-brand-blue/20">
                  <p className="text-brand-blue-bright font-bold text-sm mb-1">Disponible 24h/24</p>
                  <a
                    href="tel:+212697601775"
                    className="text-white text-2xl font-display font-bold hover:text-brand-blue-bright transition-colors"
                  >
                    +212 697601775
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
