'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Building2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations'
import type { Client } from '@/lib/supabase/types'

const PLACEHOLDER_CLIENTS = [
  { id: '1', name: 'OCP Group', logo_url: null, description_fr: 'Maintenance industrielle et installations électriques', website: null },
  { id: '2', name: 'Cosumar', logo_url: null, description_fr: 'Construction métallique et charpente industrielle', website: null },
  { id: '3', name: 'Sonacos', logo_url: null, description_fr: 'Usinage de précision et équipements sur mesure', website: null },
  { id: '4', name: 'Lafarge Maroc', logo_url: null, description_fr: 'Maintenance préventive et curative', website: null },
  { id: '5', name: 'Marjane', logo_url: null, description_fr: 'Électricité industrielle et automatisation', website: null },
  { id: '6', name: 'Managem', logo_url: null, description_fr: 'Structures métalliques et équipements miniers', website: null },
]

export default function Clients({ dbClients = [] }: { dbClients?: Client[] }) {
  const t = useTranslations('clients')
  const locale = useLocale()

  const clients = dbClients.length > 0 ? dbClients.filter(c => c.active) : PLACEHOLDER_CLIENTS

  function getDesc(c: Client | typeof PLACEHOLDER_CLIENTS[0]) {
    if ('active' in c) {
      if (locale === 'ar' && c.description_ar) return c.description_ar
      if (locale === 'en' && c.description_en) return c.description_en
      return c.description_fr ?? ''
    }
    return c.description_fr ?? ''
  }

  return (
    <section id="clients" className="py-24 bg-gray-50 overflow-hidden">
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {clients.map((client, i) => (
            <motion.div
              key={client.id}
              variants={fadeInUp}
              custom={i}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-brand-blue/20 hover:shadow-card-hover transition-all duration-300 p-5 flex flex-col items-center gap-3 cursor-default"
            >
              {/* Logo or placeholder */}
              <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden group-hover:border-brand-blue/20 transition-colors">
                {client.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={client.logo_url} alt={client.name} className="w-full h-full object-contain p-1" />
                ) : (
                  <Building2 className="w-7 h-7 text-gray-300 group-hover:text-brand-blue/40 transition-colors" />
                )}
              </div>

              {/* Name */}
              <p className="font-display font-bold text-gray-800 text-sm text-center leading-tight group-hover:text-brand-blue transition-colors">
                {client.name}
              </p>

              {/* Tooltip on hover */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-gray-900 text-white text-xs rounded-xl px-3 py-2 w-48 text-center opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10 shadow-xl">
                {getDesc(client)}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.3 }}
          className="mt-14 flex flex-wrap justify-center gap-12"
        >
          {[
            { value: '200+', label: locale === 'ar' ? 'عميل راضٍ' : locale === 'en' ? 'Satisfied clients' : 'Clients satisfaits' },
            { value: '8', label: locale === 'ar' ? 'سنوات من الخبرة' : locale === 'en' ? 'Years of experience' : 'Ans d\'expérience' },
            { value: '100%', label: locale === 'ar' ? 'التزام بالمواعيد' : locale === 'en' ? 'On-time delivery' : 'Respect des délais' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-black text-4xl text-brand-blue">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
