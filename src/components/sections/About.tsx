'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Shield, Star, Lightbulb, Clock, AlertTriangle, Headphones, CheckCircle2, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportConfig } from '@/lib/animations'
import { scrollToSection } from '@/lib/utils'

const valueIcons: Record<string, React.ElementType> = {
  expertise: Star,
  quality: CheckCircle2,
  innovation: Lightbulb,
  deadline: Clock,
  safety: AlertTriangle,
  support: Headphones,
}

export default function About() {
  const t = useTranslations('about')

  const values = ['expertise', 'quality', 'innovation', 'deadline', 'safety', 'support']

  const timelineItems = [
    { year: '2016', titleKey: '2016_title', descKey: '2016_desc' },
    { year: '2018', titleKey: '2018_title', descKey: '2018_desc' },
    { year: '2020', titleKey: '2020_title', descKey: '2020_desc' },
    { year: '2022', titleKey: '2022_title', descKey: '2022_desc' },
    { year: '2024', titleKey: '2024_title', descKey: '2024_desc' },
  ]

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4">{t('badge')}</Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display font-bold text-3xl md:text-5xl text-gray-900 mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Main content: text + visual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          {/* Left: Text */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{t('description1')}</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{t('description2')}</p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((key) => {
                const Icon = valueIcons[key]
                return (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-blue-50/50 border border-transparent hover:border-brand-blue/10 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0 group-hover:bg-brand-blue/20 transition-colors">
                      <Icon className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{t(`values.${key}.title`)}</p>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{t(`values.${key}.description`)}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <Button variant="premium" size="lg" onClick={() => scrollToSection('services')}>
              {t('discover_btn')}
            </Button>
          </motion.div>

          {/* Right: Visual / Timeline */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative"
          >
            {/* Decorative card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-dark to-brand-dark-2 p-8 shadow-blue-glow-lg">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blue-bright/5 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-industrial-grid opacity-20" />

              {/* Timeline */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp className="w-6 h-6 text-brand-blue-bright" />
                  <h3 className="font-display font-bold text-xl text-white">{t('timeline.title')}</h3>
                </div>

                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-brand-blue via-brand-blue-bright to-transparent" />

                  <div className="space-y-8">
                    {timelineItems.map((item, index) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 pl-2"
                      >
                        {/* Dot */}
                        <div className="relative z-10 shrink-0">
                          <div className="w-10 h-10 rounded-full bg-brand-blue border-2 border-brand-blue-bright/40 flex items-center justify-center shadow-blue-glow">
                            <span className="text-white text-xs font-bold">{item.year.slice(2)}</span>
                          </div>
                        </div>
                        <div className="pt-1.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-brand-blue-bright text-xs font-bold tracking-widest">{item.year}</span>
                            <span className="text-white font-semibold text-sm">{t(`timeline.${item.titleKey}`)}</span>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed">{t(`timeline.${item.descKey}`)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
