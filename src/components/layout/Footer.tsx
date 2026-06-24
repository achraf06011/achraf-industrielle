'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import {
  MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube, ArrowRight, ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import { LogoFull } from '@/components/ui/Logo'
import { scrollToSection } from '@/lib/utils'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

export default function Footer() {
  const t = useTranslations()
  const year = new Date().getFullYear()

  const quickLinks = [
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.services'), id: 'services' },
    { label: t('nav.portfolio'), id: 'portfolio' },
    { label: t('nav.whyus'), id: 'whyus' },
    { label: t('nav.testimonials'), id: 'testimonials' },
    { label: t('nav.contact'), id: 'contact' },
  ]

  const services = [
    t('services.metallic_title'),
    t('services.machining_title'),
    t('services.maintenance_title'),
    t('services.electrical_title'),
    t('services.plastics_title'),
    t('services.agro_title'),
  ]

  return (
    <footer className="bg-brand-dark relative overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />

      {/* Grid bg */}
      <div className="absolute inset-0 bg-industrial-grid opacity-30 pointer-events-none" />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-blue/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="xl:col-span-1">
            <div className="mb-6">
              <LogoFull size={40} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>

            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-brand-blue/30 border border-white/5 hover:border-brand-blue/40 text-white/50 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-display font-semibold text-base mb-6 tracking-wide uppercase">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 text-brand-blue group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-display font-semibold text-base mb-6 tracking-wide uppercase">
              {t('footer.services_title')}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-brand-blue group-hover:translate-x-1 transition-transform shrink-0" />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-display font-semibold text-base mb-6 tracking-wide uppercase">
              {t('footer.contact_title')}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Marrakech+Massira+Avenue+Dakhla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-white text-sm transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
                  <span>
                    {t('contact.address_line1')}, {t('contact.address_line2')},&nbsp;
                    {t('contact.address_line3')}, {t('contact.address_line4')}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+212697601775"
                  className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                  +212 697601775
                </a>
              </li>
              <li>
                <a
                  href="mailto:aaachchak@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                  aaachchak@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <Clock className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
                  <div>
                    <p>{t('contact.hours_weekdays')}</p>
                    <p>{t('contact.hours_saturday')}</p>
                    <p className="text-brand-blue-bright text-xs mt-1">{t('contact.hours_emergency')}</p>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            {t('footer.copyright', { year })}
          </p>
          <p className="text-brand-blue-bright/60">{t('footer.made_in')}</p>
          <div className="flex items-center gap-6">
            <button className="hover:text-gray-300 transition-colors">{t('footer.privacy')}</button>
            <button className="hover:text-gray-300 transition-colors">{t('footer.terms')}</button>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-300 transition-colors group"
              title="Espace administration"
            >
              <ShieldCheck className="w-3.5 h-3.5 group-hover:text-brand-blue transition-colors" />
              <span className="text-xs">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
