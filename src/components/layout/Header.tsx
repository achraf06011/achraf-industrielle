'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Globe, ChevronDown, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoFull } from '@/components/ui/Logo'
import { scrollToSection } from '@/lib/utils'
import { cn } from '@/lib/utils'

const locales = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇲🇦' },
]

export default function Header() {
  const t = useTranslations('nav')
  // ✅ useLocale() returns the actual current locale ('fr' | 'en' | 'ar')
  const currentLocale = useLocale()
  // usePathname() from next-intl returns path WITHOUT locale prefix (e.g. '/')
  const pathname = usePathname()
  const router = useRouter()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const navLinks = [
    { key: 'about', id: 'about' },
    { key: 'services', id: 'services' },
    { key: 'portfolio', id: 'portfolio' },
    { key: 'whyus', id: 'whyus' },
    { key: 'testimonials', id: 'testimonials' },
    { key: 'faq', id: 'faq' },
    { key: 'contact', id: 'contact' },
  ]

  const handleNav = (id: string) => {
    setIsMobileOpen(false)
    setTimeout(() => scrollToSection(id), 100)
  }

  const handleLangChange = (newLocale: string) => {
    setIsLangOpen(false)
    window.location.href = `/${newLocale}${pathname === '/' ? '' : pathname}`
  }

  const currentLang = locales.find((l) => l.code === currentLocale) ?? locales[0]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-brand-dark/95 backdrop-blur-xl border-b border-brand-blue/20 shadow-blue-glow'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-18 md:h-20" style={{ height: '72px' }}>
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('hero')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center"
            >
              <LogoFull size={40} />
            </motion.button>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNav(link.id)}
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
                >
                  {t(link.key)}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  <span className="hidden md:block font-semibold tracking-wide">
                    {currentLocale.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-3 h-3 transition-transform duration-200',
                      isLangOpen && 'rotate-180'
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 right-0 glass-dark border border-brand-blue/20 rounded-xl overflow-hidden min-w-[155px] shadow-blue-glow z-50"
                    >
                      {locales.map((locale) => (
                        <button
                          key={locale.code}
                          onClick={() => handleLangChange(locale.code)}
                          className={cn(
                            'flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors',
                            currentLocale === locale.code
                              ? 'text-brand-blue-bright bg-brand-blue/15 font-semibold'
                              : 'text-white/80 hover:text-white hover:bg-brand-blue/20'
                          )}
                        >
                          <span className="text-base">{locale.flag}</span>
                          <span>{locale.label}</span>
                          {currentLocale === locale.code && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-blue-bright" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <Button
                variant="premium"
                size="sm"
                className="hidden md:flex"
                onClick={() => handleNav('quote')}
              >
                <Phone className="w-4 h-4" />
                {t('cta')}
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="xl:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Menu"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-brand-dark/98 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
              {/* Logo inside mobile */}
              <div className="mb-8">
                <LogoFull size={44} />
              </div>

              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.key}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNav(link.id)}
                    className="flex items-center py-4 text-xl font-semibold text-white/80 hover:text-white border-b border-white/5 transition-colors text-left"
                  >
                    {t(link.key)}
                  </motion.button>
                ))}
              </nav>

              <div className="pt-6 space-y-4">
                {/* Language switcher in mobile */}
                <div className="flex gap-2">
                  {locales.map((locale) => (
                    <button
                      key={locale.code}
                      onClick={() => handleLangChange(locale.code)}
                      className={cn(
                        'flex-1 py-3 rounded-xl text-sm font-semibold transition-all',
                        currentLocale === locale.code
                          ? 'bg-brand-blue text-white shadow-blue-glow'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      {locale.flag} {locale.code.toUpperCase()}
                    </button>
                  ))}
                </div>

                <Button
                  variant="premium"
                  size="lg"
                  className="w-full"
                  onClick={() => handleNav('quote')}
                >
                  {t('cta')}
                </Button>

                <a
                  href="tel:+212697601775"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +212 697601775
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
