'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Search, PenTool, Play, CheckCircle, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations'

const stepIcons = [Search, PenTool, Play, CheckCircle, Truck]
const stepColors = [
  'from-blue-600 to-blue-400',
  'from-indigo-600 to-indigo-400',
  'from-brand-blue to-brand-blue-light',
  'from-cyan-600 to-cyan-400',
  'from-sky-600 to-sky-400',
]

export default function Process() {
  const t = useTranslations('process')

  const steps = [
    { key: 'step1', icon: stepIcons[0], color: stepColors[0] },
    { key: 'step2', icon: stepIcons[1], color: stepColors[1] },
    { key: 'step3', icon: stepIcons[2], color: stepColors[2] },
    { key: 'step4', icon: stepIcons[3], color: stepColors[3] },
    { key: 'step5', icon: stepIcons[4], color: stepColors[4] },
  ]

  return (
    <section id="process" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-industrial-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="dark" className="mb-4">{t('badge')}</Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-display font-bold text-3xl md:text-5xl text-white mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          {/* Connecting line */}
          <div className="relative mb-16">
            <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-blue via-brand-blue-bright to-brand-blue opacity-40" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-5 gap-4"
            >
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.key}
                    variants={fadeInUp}
                    className="flex flex-col items-center"
                  >
                    {/* Number + Icon */}
                    <div className="relative mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-blue-glow relative z-10`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-dark-2 border border-brand-blue/40 flex items-center justify-center z-20">
                        <span className="text-brand-blue-bright text-xs font-bold">{index + 1}</span>
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="font-display font-bold text-white text-base mb-2 text-center">
                      {t(`${step.key}_title`)}
                    </h3>
                    <p className="text-gray-400 text-xs text-center leading-relaxed">
                      {t(`${step.key}_desc`)}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-5"
              >
                {/* Icon + line */}
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-blue-glow shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-brand-blue/40 to-transparent mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-brand-blue-bright text-xs font-bold tracking-widest">
                      {t(`${step.key}_number`)}
                    </span>
                    <h3 className="font-display font-bold text-white text-base">
                      {t(`${step.key}_title`)}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t(`${step.key}_desc`)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
