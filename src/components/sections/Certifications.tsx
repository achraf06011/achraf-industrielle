'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ShieldCheck, Leaf, Users, Award, Landmark, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations'

const CERTS = [
  { key: 'iso9001', icon: ShieldCheck, color: 'from-blue-600 to-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/10' },
  { key: 'iso14001', icon: Leaf, color: 'from-green-600 to-green-400', border: 'border-green-500/20', bg: 'bg-green-500/10' },
  { key: 'iso45001', icon: Users, color: 'from-orange-600 to-orange-400', border: 'border-orange-500/20', bg: 'bg-orange-500/10' },
  { key: 'ce', icon: Award, color: 'from-purple-600 to-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-500/10' },
  { key: 'cnss', icon: Landmark, color: 'from-teal-600 to-teal-400', border: 'border-teal-500/20', bg: 'bg-teal-500/10' },
  { key: 'since', icon: Calendar, color: 'from-brand-blue to-brand-blue-bright', border: 'border-brand-blue/20', bg: 'bg-brand-blue/10' },
] as const

export default function Certifications() {
  const t = useTranslations('certifications')

  return (
    <section id="certifications" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-industrial-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-blue/8 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}><Badge className="mb-4">{t('badge')}</Badge></motion.div>
          <motion.h2 variants={fadeInUp} className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CERTS.map(({ key, icon: Icon, color, border, bg }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className={`group relative bg-gray-900/80 backdrop-blur-sm border ${border} rounded-2xl p-6 hover:bg-gray-800/80 transition-all duration-300`}
            >
              {/* Glow on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${color} opacity-5`} />

              <div className="relative z-10">
                <div className={`inline-flex w-12 h-12 rounded-xl ${bg} items-center justify-center mb-4`}>
                  <div className={`bg-gradient-to-br ${color} rounded-lg w-10 h-10 flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {t(`${key}_title` as Parameters<typeof t>[0])}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t(`${key}_desc` as Parameters<typeof t>[0])}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.4 }}
          className="mt-14 flex items-center justify-center gap-3 text-gray-500 text-sm"
        >
          <ShieldCheck className="w-4 h-4 text-brand-blue-bright" />
          <span>Certifications vérifiables — disponibles sur demande</span>
        </motion.div>
      </div>
    </section>
  )
}
