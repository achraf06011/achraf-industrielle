'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Eye, Construction, Zap, Wrench, Wheat, Package, X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { staggerContainer, fadeInUp, scaleIn, viewportConfig } from '@/lib/animations'
import type { Project } from '@/lib/supabase/types'

type FilterCategory = 'all' | 'metallic' | 'maintenance' | 'electrical' | 'agro' | 'textile'

const STATIC_PROJECTS = [
  { id: 'p1', category: 'metallic', year: '2024', icon: Construction, gradient: 'from-blue-900 to-blue-600' },
  { id: 'p2', category: 'electrical', year: '2024', icon: Zap, gradient: 'from-sky-900 to-sky-600' },
  { id: 'p3', category: 'textile', year: '2023', icon: Package, gradient: 'from-indigo-900 to-indigo-600' },
  { id: 'p4', category: 'agro', year: '2023', icon: Wheat, gradient: 'from-teal-900 to-teal-600' },
  { id: 'p5', category: 'metallic', year: '2023', icon: Construction, gradient: 'from-slate-900 to-brand-blue' },
  { id: 'p6', category: 'maintenance', year: '2022', icon: Wrench, gradient: 'from-zinc-900 to-zinc-600' },
  { id: 'p7', category: 'metallic', year: '2022', icon: Construction, gradient: 'from-blue-800 to-cyan-600' },
  { id: 'p8', category: 'electrical', year: '2022', icon: Zap, gradient: 'from-cyan-900 to-cyan-600' },
  { id: 'p9', category: 'agro', year: '2021', icon: Wheat, gradient: 'from-emerald-900 to-emerald-600' },
]

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  metallic: Construction,
  electrical: Zap,
  maintenance: Wrench,
  agro: Wheat,
  textile: Package,
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  metallic: 'from-blue-900 to-blue-600',
  electrical: 'from-sky-900 to-sky-600',
  textile: 'from-indigo-900 to-indigo-600',
  agro: 'from-teal-900 to-teal-600',
  maintenance: 'from-zinc-900 to-zinc-600',
}

function GalleryLightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex)

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIndex(i => (i - 1 + images.length) % images.length)
  }
  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIndex(i => (i + 1) % images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition z-10"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 rounded-full text-white text-sm font-medium">
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center px-16"
        onClick={e => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[index]}
          alt={`Photo ${index + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
      </motion.div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Thumbnails strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setIndex(i) }}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${i === index ? 'border-brand-blue scale-110' : 'border-white/20 opacity-60 hover:opacity-100'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default function Portfolio({ dbProjects = [] }: { dbProjects?: Project[] }) {
  const t = useTranslations('portfolio')
  const locale = useLocale()
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null)

  const useDB = dbProjects.length > 0

  const filters: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: t('filter_all') },
    { key: 'metallic', label: t('filter_metallic') },
    { key: 'maintenance', label: t('filter_maintenance') },
    { key: 'electrical', label: t('filter_electrical') },
    { key: 'agro', label: t('filter_agro') },
    { key: 'textile', label: t('filter_textile') },
  ]

  function getDbTitle(p: Project) {
    if (locale === 'ar' && p.title_ar) return p.title_ar
    if (locale === 'en' && p.title_en) return p.title_en
    return p.title_fr
  }

  function getDbDesc(p: Project) {
    if (locale === 'ar' && p.description_ar) return p.description_ar
    if (locale === 'en' && p.description_en) return p.description_en
    return p.description_fr ?? ''
  }

  const filteredDB = dbProjects.filter(p => activeFilter === 'all' || p.category === activeFilter)
  const filteredStatic = STATIC_PROJECTS.filter(p => activeFilter === 'all' || p.category === activeFilter)

  const selectedDB = useDB ? dbProjects.find(p => p.id === selectedId) : null
  const selectedStatic = !useDB ? STATIC_PROJECTS.find(p => p.id === selectedId) : null

  return (
    <section id="portfolio" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center mb-14"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-brand-blue text-white shadow-blue-glow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* DB Projects Grid */}
        {useDB && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDB.map((project) => {
                const Icon = CATEGORY_ICONS[project.category] ?? Construction
                const gradient = CATEGORY_GRADIENTS[project.category] ?? 'from-blue-900 to-blue-600'
                return (
                  <motion.div
                    key={project.id}
                    layout
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.85 }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-card-hover transition-all duration-300"
                    onClick={() => setSelectedId(project.id)}
                  >
                    <div className={`relative h-56 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                      {project.image_url ? (
                        <Image src={project.image_url} alt={getDbTitle(project)} fill className="object-cover" />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-industrial-grid opacity-20" />
                          <div className="relative z-10">
                            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                              <Icon className="w-10 h-10 text-white/80" />
                            </div>
                          </div>
                        </>
                      )}
                      <div className="absolute inset-0 bg-brand-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2 text-white">
                          <Eye className="w-8 h-8" />
                          <span className="text-sm font-semibold">{t('view_project')}</span>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
                        {project.category}
                      </div>
                      {project.featured && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-yellow-500/80 backdrop-blur-sm text-white text-xs font-semibold">
                          ★
                        </div>
                      )}
                      {project.gallery_images?.length > 0 && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs">
                          <Images className="w-3 h-3" />
                          {project.gallery_images.length}
                        </div>
                      )}
                    </div>
                    <div className="bg-white p-5 border border-gray-100 rounded-b-2xl">
                      <h3 className="font-display font-bold text-gray-900 text-base mb-2 group-hover:text-brand-blue transition-colors">
                        {getDbTitle(project)}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-400 text-xs">
                        {project.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {project.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Static fallback grid */}
        {!useDB && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredStatic.map((project) => {
                const Icon = project.icon
                return (
                  <motion.div
                    key={project.id}
                    layout
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.85 }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-card-hover transition-all duration-300"
                    onClick={() => setSelectedId(project.id)}
                  >
                    <div className={`relative h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 bg-industrial-grid opacity-20" />
                      <div className="relative z-10">
                        <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-10 h-10 text-white/80" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-brand-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2 text-white">
                          <Eye className="w-8 h-8" />
                          <span className="text-sm font-semibold">{t('view_project')}</span>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
                        {project.category}
                      </div>
                    </div>
                    <div className="bg-white p-5 border border-gray-100 rounded-b-2xl">
                      <h3 className="font-display font-bold text-gray-900 text-base mb-2 group-hover:text-brand-blue transition-colors">
                        {t(`${project.id}_title`)}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-400 text-xs">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {t(`${project.id}_location`)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox — DB project */}
      <Dialog open={!!selectedDB} onOpenChange={open => !open && setSelectedId(null)}>
        {selectedDB && (() => {
          const Icon = CATEGORY_ICONS[selectedDB.category] ?? Construction
          const gradient = CATEGORY_GRADIENTS[selectedDB.category] ?? 'from-blue-900 to-blue-600'
          const allImages = [
            ...(selectedDB.image_url ? [selectedDB.image_url] : []),
            ...(selectedDB.gallery_images ?? []),
          ]
          return (
            <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className={`relative h-64 bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                {selectedDB.image_url ? (
                  <Image src={selectedDB.image_url} alt={getDbTitle(selectedDB)} fill className="object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-industrial-grid opacity-20" />
                    <div className="relative z-10 w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                  </>
                )}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold capitalize">{selectedDB.category}</span>
                  <span className="px-3 py-1 rounded-full bg-brand-blue/70 backdrop-blur-sm text-white text-xs font-semibold">{selectedDB.year}</span>
                </div>
                {allImages.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); setLightbox({ images: allImages, index: 0 }) }}
                    className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold hover:bg-black/60 transition"
                  >
                    <Images className="w-3.5 h-3.5" />
                    {allImages.length} photos
                  </button>
                )}
              </div>
              <div className="p-8">
                <h2 className="font-display font-bold text-2xl text-white mb-4">{getDbTitle(selectedDB)}</h2>
                {getDbDesc(selectedDB) && (
                  <p className="text-gray-300 leading-relaxed mb-6">{getDbDesc(selectedDB)}</p>
                )}
                <div className="flex flex-wrap gap-6 text-sm mb-6">
                  {selectedDB.location && (
                    <div>
                      <span className="text-gray-500 text-xs uppercase tracking-wider">{t('location')}</span>
                      <div className="flex items-center gap-2 text-white mt-1">
                        <MapPin className="w-4 h-4 text-brand-blue-bright" />
                        {selectedDB.location}
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">{t('year')}</span>
                    <div className="flex items-center gap-2 text-white mt-1">
                      <Calendar className="w-4 h-4 text-brand-blue-bright" />
                      {selectedDB.year}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">{t('category')}</span>
                    <div className="text-white mt-1 capitalize">{selectedDB.category}</div>
                  </div>
                </div>

                {/* Gallery thumbnails */}
                {allImages.length > 1 && (
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
                      Galerie ({allImages.length} photos)
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {allImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setSelectedId(null); setLightbox({ images: allImages, index: i }) }}
                          className="relative aspect-square rounded-lg overflow-hidden group/thumb border-2 border-transparent hover:border-brand-blue transition"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          )
        })()}
      </Dialog>

      {/* Lightbox — Static project */}
      <Dialog open={!!selectedStatic} onOpenChange={open => !open && setSelectedId(null)}>
        {selectedStatic && (
          <DialogContent className="max-w-2xl p-0 overflow-hidden">
            <div className={`relative h-64 bg-gradient-to-br ${selectedStatic.gradient} flex items-center justify-center`}>
              <div className="absolute inset-0 bg-industrial-grid opacity-20" />
              <div className="relative z-10 w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <selectedStatic.icon className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold capitalize">{selectedStatic.category}</span>
                <span className="px-3 py-1 rounded-full bg-brand-blue/70 backdrop-blur-sm text-white text-xs font-semibold">{selectedStatic.year}</span>
              </div>
            </div>
            <div className="p-8">
              <h2 className="font-display font-bold text-2xl text-white mb-4">{t(`${selectedStatic.id}_title`)}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{t(`${selectedStatic.id}_desc`)}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{t('location')}</span>
                  <div className="flex items-center gap-2 text-white mt-1">
                    <MapPin className="w-4 h-4 text-brand-blue-bright" />
                    {t(`${selectedStatic.id}_location`)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{t('year')}</span>
                  <div className="flex items-center gap-2 text-white mt-1">
                    <Calendar className="w-4 h-4 text-brand-blue-bright" />
                    {selectedStatic.year}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{t('category')}</span>
                  <div className="text-white mt-1 capitalize">{selectedStatic.category}</div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Full-screen gallery lightbox */}
      <AnimatePresence>
        {lightbox && (
          <GalleryLightbox
            images={lightbox.images}
            startIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
