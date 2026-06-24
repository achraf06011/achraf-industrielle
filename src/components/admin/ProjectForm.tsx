'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Project, ProjectInsert } from '@/lib/supabase/types'
import { Upload, Link as LinkIcon, X, Loader2, Save, AlertCircle, CheckCircle2, Plus, ImageIcon } from 'lucide-react'

const CATEGORIES = [
  { value: 'metallic', label: 'Construction métallique' },
  { value: 'maintenance', label: 'Maintenance industrielle' },
  { value: 'electrical', label: 'Électricité industrielle' },
  { value: 'agro', label: 'Agroalimentaire' },
  { value: 'textile', label: 'Textile' },
] as const

function convertGoogleDriveUrl(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (idMatch) return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`
  return url
}

type FormData = {
  title_fr: string; title_en: string; title_ar: string
  description_fr: string; description_en: string; description_ar: string
  category: string; location: string; year: string
  image_url: string; featured: boolean
}

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const isEdit = !!project

  const [form, setForm] = useState<FormData>({
    title_fr: project?.title_fr ?? '',
    title_en: project?.title_en ?? '',
    title_ar: project?.title_ar ?? '',
    description_fr: project?.description_fr ?? '',
    description_en: project?.description_en ?? '',
    description_ar: project?.description_ar ?? '',
    category: project?.category ?? 'metallic',
    location: project?.location ?? '',
    year: project?.year ?? new Date().getFullYear().toString(),
    image_url: project?.image_url ?? '',
    featured: project?.featured ?? false,
  })

  // Main image
  const [imageMode, setImageMode] = useState<'url' | 'upload' | 'drive'>('url')
  const [driveInput, setDriveInput] = useState('')
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)

  // Gallery images
  const [galleryImages, setGalleryImages] = useState<string[]>(project?.gallery_images ?? [])
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const [galleryUrlInput, setGalleryUrlInput] = useState('')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function set(field: keyof FormData, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleMainFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadFile(file)
    const reader = new FileReader()
    reader.onload = ev => setUploadPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  function handleGalleryFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setGalleryFiles(prev => [...prev, ...files])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => setGalleryPreviews(prev => [...prev, ev.target?.result as string])
      reader.readAsDataURL(file)
    })
  }

  function addGalleryUrl() {
    const url = galleryUrlInput.trim()
    if (!url) return
    const final = url.includes('drive.google.com') ? convertGoogleDriveUrl(url) : url
    setGalleryImages(prev => [...prev, final])
    setGalleryUrlInput('')
  }

  function removeGalleryExisting(index: number) {
    setGalleryImages(prev => prev.filter((_, i) => i !== index))
  }

  function removeGalleryNew(index: number) {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index))
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index))
  }

  async function uploadToStorage(file: File): Promise<string> {
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { data, error } = await supabase.storage.from('projects').upload(filename, file, { cacheControl: '3600', upsert: false })
    if (error) throw new Error(error.message)
    const { data: urlData } = supabase.storage.from('projects').getPublicUrl(data.path)
    return urlData.publicUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title_fr.trim()) { setError('Le titre en français est obligatoire.'); return }
    setSaving(true); setError('')

    try {
      // Main image
      let finalImageUrl = form.image_url
      if (imageMode === 'upload' && uploadFile) {
        finalImageUrl = await uploadToStorage(uploadFile)
      } else if (imageMode === 'drive' && driveInput.trim()) {
        finalImageUrl = convertGoogleDriveUrl(driveInput.trim())
      }

      // Gallery: upload new files, keep existing URLs
      const newGalleryUrls = await Promise.all(galleryFiles.map(f => uploadToStorage(f)))
      const allGalleryImages = [...galleryImages, ...newGalleryUrls]

      const payload: ProjectInsert = {
        title_fr: form.title_fr.trim(),
        title_en: form.title_en.trim() || null,
        title_ar: form.title_ar.trim() || null,
        description_fr: form.description_fr.trim() || null,
        description_en: form.description_en.trim() || null,
        description_ar: form.description_ar.trim() || null,
        category: form.category as ProjectInsert['category'],
        location: form.location.trim() || null,
        year: form.year.trim(),
        image_url: finalImageUrl.trim() || null,
        gallery_images: allGalleryImages,
        featured: form.featured,
      }

      const supabase = createClient()
      const { error: dbError } = isEdit
        ? await supabase.from('projects').update(payload).eq('id', project!.id)
        : await supabase.from('projects').insert(payload)

      if (dbError) throw new Error(dbError.message)
      setSuccess(true)
      setTimeout(() => router.push('/admin/projects'), 1200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setSaving(false)
    }
  }

  const mainPreview = imageMode === 'upload' ? uploadPreview : form.image_url

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">

      {/* Titles */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-white text-lg">Titre du projet</h2>
        <Field label="Titre (Français) *"><Input value={form.title_fr} onChange={v => set('title_fr', v)} placeholder="Ex: Structure métallique entrepôt" /></Field>
        <Field label="Title (English)"><Input value={form.title_en} onChange={v => set('title_en', v)} placeholder="Ex: Warehouse metal structure" /></Field>
        <Field label="العنوان (العربية)"><Input value={form.title_ar} onChange={v => set('title_ar', v)} placeholder="مثال: هيكل معدني للمستودع" dir="rtl" /></Field>
      </section>

      {/* Meta */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-white text-lg">Informations générales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Catégorie *">
            <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Field>
          <Field label="Année *"><Input value={form.year} onChange={v => set('year', v)} placeholder="2024" type="number" min="2000" max="2100" /></Field>
        </div>
        <Field label="Lieu / Ville"><Input value={form.location} onChange={v => set('location', v)} placeholder="Ex: Marrakech, Maroc" /></Field>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4 rounded accent-blue-500" />
          <span className="text-gray-300 text-sm">Mettre en avant sur le site</span>
        </label>
      </section>

      {/* Descriptions */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-white text-lg">Description</h2>
        <Field label="Description (Français)"><Textarea value={form.description_fr} onChange={v => set('description_fr', v)} placeholder="Décrivez le projet..." /></Field>
        <Field label="Description (English)"><Textarea value={form.description_en} onChange={v => set('description_en', v)} placeholder="Describe the project..." /></Field>
        <Field label="الوصف (العربية)"><Textarea value={form.description_ar} onChange={v => set('description_ar', v)} placeholder="اوصف المشروع..." dir="rtl" /></Field>
      </section>

      {/* Main image */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-white text-lg">Photo principale <span className="text-gray-500 text-sm font-normal">(miniature)</span></h2>
        <div className="flex gap-2 flex-wrap">
          {(['url', 'upload', 'drive'] as const).map(mode => (
            <button key={mode} type="button" onClick={() => setImageMode(mode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition ${imageMode === mode ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'}`}>
              {mode === 'upload' ? <Upload className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
              {mode === 'url' ? 'URL directe' : mode === 'upload' ? 'Upload fichier' : 'Google Drive'}
            </button>
          ))}
        </div>

        {imageMode === 'url' && <Field label="URL de l'image"><Input value={form.image_url} onChange={v => set('image_url', v)} placeholder="https://..." type="url" /></Field>}
        {imageMode === 'drive' && (
          <div className="space-y-2">
            <Field label="Lien Google Drive"><Input value={driveInput} onChange={v => setDriveInput(v)} placeholder="https://drive.google.com/file/d/..." /></Field>
            {driveInput && <p className="text-xs text-gray-500">URL convertie: {convertGoogleDriveUrl(driveInput)}</p>}
          </div>
        )}
        {imageMode === 'upload' && (
          <>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleMainFileChange} className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center gap-3 px-6 py-8 border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-xl transition cursor-pointer">
              <Upload className="w-8 h-8 text-gray-500" />
              <span className="text-gray-400 text-sm">{uploadFile ? uploadFile.name : 'Cliquez pour choisir une image'}</span>
            </button>
          </>
        )}

        {mainPreview && (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mainPreview} alt="Aperçu" className="w-40 h-28 object-cover rounded-xl border border-gray-700" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <button type="button" onClick={() => { set('image_url', ''); setUploadFile(null); setUploadPreview(null); setDriveInput('') }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center">
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        )}
      </section>

      {/* Gallery */}
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-white text-lg">Galerie de photos <span className="text-gray-500 text-sm font-normal">(optionnel — plusieurs photos)</span></h2>

        {/* Add by URL */}
        <div className="flex gap-2">
          <input value={galleryUrlInput} onChange={e => setGalleryUrlInput(e.target.value)}
            placeholder="Ajouter une URL ou lien Google Drive..."
            className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm" />
          <button type="button" onClick={addGalleryUrl}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-sm font-medium transition flex items-center gap-2">
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>

        {/* Upload multiple */}
        <div>
          <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryFilesChange} className="hidden" />
          <button type="button" onClick={() => galleryInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-gray-300 text-sm transition">
            <Upload className="w-4 h-4" /> Uploader plusieurs photos
          </button>
        </div>

        {/* Gallery preview grid */}
        {(galleryImages.length > 0 || galleryPreviews.length > 0) && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
            {galleryImages.map((url, i) => (
              <div key={`existing-${i}`} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-24 object-cover rounded-xl border border-gray-700" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <button type="button" onClick={() => removeGalleryExisting(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {galleryPreviews.map((url, i) => (
              <div key={`new-${i}`} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-24 object-cover rounded-xl border border-blue-500/50" />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 rounded text-white text-xs">Nouveau</div>
                <button type="button" onClick={() => removeGalleryNew(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {galleryImages.length === 0 && galleryPreviews.length === 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700">
            <ImageIcon className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500 text-sm">Aucune photo dans la galerie</span>
          </div>
        )}
      </section>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 text-green-400 text-sm bg-green-900/20 border border-green-800 rounded-xl px-4 py-3">
          <CheckCircle2 className="w-4 h-4 shrink-0" />Projet {isEdit ? 'modifié' : 'créé'} avec succès. Redirection...
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={() => router.push('/admin/projects')} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-gray-300 transition">Annuler</button>
        <button type="submit" disabled={saving || success}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Enregistrement...' : isEdit ? 'Enregistrer les modifications' : 'Créer le projet'}
        </button>
      </div>
    </form>
  )
}

function Field({ label, children, dir }: { label: string; children: React.ReactNode; dir?: string }) {
  return <div><label className="block text-sm font-medium text-gray-300 mb-1.5" dir={dir}>{label}</label>{children}</div>
}
function Input({ value, onChange, placeholder, type = 'text', dir, min, max }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string; dir?: string; min?: string; max?: string }) {
  return <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} dir={dir} min={min} max={max} className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
}
function Textarea({ value, onChange, placeholder, dir }: { value: string; onChange: (v: string) => void; placeholder?: string; dir?: string }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} dir={dir} rows={3} className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" />
}
