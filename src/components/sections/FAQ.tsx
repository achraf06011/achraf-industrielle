'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations'
import { scrollToSection } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const faqItems = [
  { q: 'q1', a: 'a1' },
  { q: 'q2', a: 'a2' },
  { q: 'q3', a: 'a3' },
  { q: 'q4', a: 'a4' },
  { q: 'q5', a: 'a5' },
  { q: 'q6', a: 'a6' },
] as const

export default function FAQ() {
  const t = useTranslations('faq')

  return (
    <section id="faq" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-center mb-14"
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

          {/* FAQ items */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <Accordion type="single" collapsible className="px-4">
                {faqItems.map(({ q, a }, index) => (
                  <AccordionItem key={q} value={q}>
                    <AccordionTrigger>
                      <div className="flex items-start gap-4 text-left pr-4">
                        <div className="w-7 h-7 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-brand-blue text-xs font-bold">{index + 1}</span>
                        </div>
                        <span>{t(q)}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-11">{t(a)}</div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>

          {/* CTA below FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-brand-blue/5 to-brand-blue-bright/5 border border-brand-blue/10">
              <HelpCircle className="w-10 h-10 text-brand-blue" />
              <div>
                <p className="font-display font-bold text-gray-900 text-lg mb-1">
                  Vous avez d&apos;autres questions ?
                </p>
                <p className="text-gray-500 text-sm">
                  Notre équipe est disponible pour vous répondre sous 24h
                </p>
              </div>
              <Button
                variant="premium"
                onClick={() => scrollToSection('contact')}
              >
                Contactez-nous
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
