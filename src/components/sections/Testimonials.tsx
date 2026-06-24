'use client'

import { useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations'

const testimonialKeys = ['t1', 't2', 't3', 't4', 't5']

const avatarColors = [
  'from-blue-600 to-blue-400',
  'from-indigo-600 to-indigo-400',
  'from-cyan-600 to-cyan-400',
  'from-sky-600 to-sky-400',
  'from-teal-600 to-teal-400',
]

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const t = useTranslations('testimonials')

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section id="testimonials" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-industrial-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="dark" className="mb-4">{t('badge')}</Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 -ml-6">
              {testimonialKeys.map((key, index) => (
                <div
                  key={key}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] xl:flex-[0_0_calc(33.333%-16px)] min-w-0 pl-6"
                >
                  <div className="h-full glass-dark rounded-2xl p-7 border border-brand-blue/10 hover:border-brand-blue/25 transition-colors">
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-brand-blue/40 mb-4" />

                    {/* Stars */}
                    <StarRating />

                    {/* Text */}
                    <p className="text-gray-300 text-sm leading-relaxed mt-4 mb-6">
                      &ldquo;{t(`${key}_text`)}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[index]} flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-blue-glow`}
                      >
                        {t(`${key}_name`).charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{t(`${key}_name`)}</p>
                        <p className="text-gray-400 text-xs">{t(`${key}_role`)}</p>
                        <p className="text-brand-blue-bright text-xs font-medium">{t(`${key}_company`)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full glass border border-brand-blue/20 hover:border-brand-blue/50 text-white hover:bg-brand-blue/20 transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full glass border border-brand-blue/20 hover:border-brand-blue/50 text-white hover:bg-brand-blue/20 transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
