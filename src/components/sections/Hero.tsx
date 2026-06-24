'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Shield, Award, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { scrollToSection } from '@/lib/utils'

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  width: (((i * 7 + 3) % 3) + 1) + 'px',
  opacity: ((i * 13 + 10) % 50) / 100 + 0.1,
  left: ((i * 37 + 5) % 100) + '%',
  duration: ((i * 11 + 8) % 10) + 8 + 's',
  delay: ((i * 17) % 8) + 's',
  drift: ((i * 23 + 1) % 100) - 50 + 'px',
}))

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-brand-blue-bright"
          style={{
            width: p.width,
            height: p.width,
            opacity: p.opacity,
            left: p.left,
            bottom: '0px',
            animation: `particle-float ${p.duration} ${p.delay} linear infinite`,
            ['--drift' as string]: p.drift,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const t = useTranslations('hero')
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const badges = [
    { icon: Shield, text: t('trusted') },
    { icon: Award, text: t('certified') },
    { icon: Clock, text: t('available') },
  ]

  const titleLines = [t('title_line1'), t('title_line2'), t('title_line3')]

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Industrial Grid */}
      <div className="absolute inset-0 bg-industrial-grid opacity-40" />

      {/* Animated Glow Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(15, 76, 129, 0.25) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 168, 232, 0.15) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Light Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full"
            style={{
              top: `${25 + i * 25}%`,
              background: 'linear-gradient(90deg, transparent 0%, rgba(15, 76, 129, 0.3) 40%, rgba(0, 168, 232, 0.2) 60%, transparent 100%)',
              transformOrigin: 'left center',
            }}
            animate={{ scaleX: [0.8, 1.05, 0.8], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
          />
        ))}
      </div>

      {/* Particles */}
      <Particles />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/40 bg-brand-blue/10 text-brand-blue-bright text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-bright animate-pulse" />
          {t('badge')}
        </motion.div>

        {/* Title */}
        <div className="mb-8">
          {titleLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                className={`font-display font-bold leading-tight tracking-tight ${
                  index === 1
                    ? 'text-4xl sm:text-5xl md:text-6xl xl:text-7xl gradient-text-white'
                    : 'text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-white'
                }`}
              >
                {line}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            variant="premium"
            size="xl"
            onClick={() => scrollToSection('quote')}
            className="group"
          >
            {t('cta_quote')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline-white"
            size="xl"
            onClick={() => scrollToSection('services')}
            className="group"
          >
            <Play className="w-5 h-5" />
            {t('cta_discover')}
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {badges.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="flex items-center gap-2 text-white/60 text-sm"
            >
              <div className="w-7 h-7 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-brand-blue-bright" />
              </div>
              {text}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs"
        onClick={() => scrollToSection('stats')}
        style={{ cursor: 'pointer' }}
      >
        <span className="tracking-widest uppercase">{t('scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-brand-blue-bright" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
