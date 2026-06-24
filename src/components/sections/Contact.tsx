'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, viewportConfig } from '@/lib/animations'

export default function Contact() {
  const t = useTranslations('contact')

  const contactCards = [
    {
      icon: MapPin,
      title: t('address_title'),
      content: (
        <div className="text-gray-600 text-sm leading-relaxed">
          <p>{t('address_line1')}</p>
          <p>{t('address_line2')}</p>
          <p>{t('address_line3')}</p>
          <p className="font-medium text-gray-700">{t('address_line4')}</p>
        </div>
      ),
      action: (
        <a
          href="https://maps.google.com/?q=Marrakech+Massira+Avenue+Dakhla+Decathlon+Targa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-brand-blue text-sm font-semibold hover:text-brand-blue-light transition-colors mt-3"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Voir sur Maps
        </a>
      ),
      color: 'bg-blue-600',
    },
    {
      icon: Phone,
      title: t('phone_title'),
      content: (
        <div>
          <a
            href="tel:+212697601775"
            className="text-gray-900 font-bold text-xl hover:text-brand-blue transition-colors block"
          >
            +212 697601775
          </a>
        </div>
      ),
      action: (
        <div className="flex gap-3 mt-3">
          <a
            href="tel:+212697601775"
            className="inline-flex items-center gap-2 text-brand-blue text-sm font-semibold hover:text-brand-blue-light transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {t('call')}
          </a>
          <span className="text-gray-200">|</span>
          <a
            href="https://wa.me/212697601775"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-600 text-sm font-semibold hover:text-green-700 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {t('whatsapp')}
          </a>
        </div>
      ),
      color: 'bg-green-600',
    },
    {
      icon: Mail,
      title: t('email_title'),
      content: (
        <a
          href="mailto:aaachchak@gmail.com"
          className="text-brand-blue font-medium hover:underline block"
        >
          aaachchak@gmail.com
        </a>
      ),
      action: (
        <a
          href="mailto:aaachchak@gmail.com"
          className="inline-flex items-center gap-2 text-brand-blue text-sm font-semibold hover:text-brand-blue-light transition-colors mt-3"
        >
          <Mail className="w-3.5 h-3.5" />
          {t('email_btn')}
        </a>
      ),
      color: 'bg-indigo-600',
    },
    {
      icon: Clock,
      title: t('hours_title'),
      content: (
        <div className="text-gray-600 text-sm space-y-1">
          <p>{t('hours_weekdays')}</p>
          <p>{t('hours_saturday')}</p>
          <p className="text-brand-blue font-semibold">{t('hours_emergency')}</p>
        </div>
      ),
      action: null,
      color: 'bg-sky-600',
    },
  ]

  return (
    <section id="contact" className="py-24 bg-gray-50 overflow-hidden">
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

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
          {/* Contact Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-5"
          >
            {contactCards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-blue/20 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 ${card.color} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display font-bold text-gray-900 text-sm mb-2">{card.title}</p>
                      {card.content}
                      {card.action}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="xl:col-span-3"
          >
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-full min-h-[400px]">
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <h3 className="font-display font-bold text-gray-900 text-base flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-blue" />
                  {t('map_title')}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {t('address_line1')}, {t('address_line2')}, {t('address_line4')}
                </p>
              </div>
              <div className="relative h-[350px] xl:h-[calc(100%-80px)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.3!2d-8.032!3d31.622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee44b4b6e9c9%3A0x1f7a6c2e8d3f5a8b!2sDecathlon%20Targa%20Marrakech!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0, filter: 'grayscale(15%) contrast(1.05)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ACHRAF INDUSTRIELLE - Avenue Dakhla, Massira, Marrakech"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-blue-light p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="font-display font-bold text-white text-xl mb-1">
              Prêt à démarrer votre projet ?
            </h3>
            <p className="text-white/80 text-sm">
              Contactez-nous dès maintenant pour un devis gratuit et sans engagement
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+212697601775">
              <Button variant="outline-white" size="lg">
                <Phone className="w-4 h-4" />
                Appeler
              </Button>
            </a>
            <a href="https://wa.me/212697601775" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white border-0"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
