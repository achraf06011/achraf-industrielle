'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Briefcase, Users, Headphones } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

function AnimatedCounter({
  target,
  duration = 2000,
  suffix = '',
}: {
  target: number | string
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView || typeof target === 'string') return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  if (typeof target === 'string') {
    return (
      <span ref={ref} className="tabular-nums">
        {inView ? target : target}
        {suffix}
      </span>
    )
  }

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const t = useTranslations('stats')

  const stats = [
    {
      icon: Calendar,
      value: t('founded_value'),
      suffix: '',
      label: t('founded_label'),
      isString: true,
      color: 'from-blue-600 to-blue-400',
    },
    {
      icon: Briefcase,
      value: t('projects_value'),
      suffix: t('projects_suffix'),
      label: t('projects_label'),
      isString: false,
      color: 'from-cyan-600 to-cyan-400',
    },
    {
      icon: Users,
      value: t('clients_value'),
      suffix: t('clients_suffix'),
      label: t('clients_label'),
      isString: false,
      color: 'from-indigo-600 to-indigo-400',
    },
    {
      icon: Headphones,
      value: t('support_value'),
      suffix: '',
      label: t('support_label'),
      isString: true,
      color: 'from-sky-600 to-sky-400',
    },
  ]

  return (
    <section id="stats" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-3">
            {t('title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-brand-blue/20 shadow-sm hover:shadow-card-hover transition-all duration-300 text-center overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 to-brand-blue/0 group-hover:from-brand-blue/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />

                {/* Icon */}
                <div className={`w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Value */}
                <div className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-2">
                  <AnimatedCounter
                    target={stat.isString ? stat.value : parseInt(stat.value)}
                    suffix={stat.suffix}
                  />
                </div>

                {/* Label */}
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
