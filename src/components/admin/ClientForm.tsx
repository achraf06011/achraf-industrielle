'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Client, ClientInsert } from '@/lib/supabase/types'
import { Upload, X, Loader2, Save, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function ClientForm({ client }: { client?: Client }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isEdit = !!client

  const [name, setName] = useState(client?.name ?? '')
  const [logoUrl, setLogoUrl] = useState(client?.logo_url ?? '')
  const [descFr, setDescFr] = useState(client?.description_fr ?? '')
  const [descEn, setDescEn] = useState(client?.description_en ?? '')
  const [descAr, setDescAr] = useState(client?.description_ar ?? '')
  const [website, setWebsite] = useState(client?.website ?? '')
  const [orderIndex, setOrderIndex] = useState(client?.order_index?.toString() ?? '0')
  const [active, setActive] = useState(client?.active ?? true)

  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadFile(file)
    const reader = new FileReader()
    reader.onload = ev => setUploadPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError('Le nom du client est obligatoire.'); return }
    setSaving(true); setError('')

    try {
      let finalLogoUrl = logoUrl

      if (uploadFile) {
        const supabase = createClient()
        const ext = uploadFile.name.split('.').pop()
        const filename = `clients/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { data, error: uploadError } = await supabase.storage.from('projects').upload(filename, uploadFile, { cacheControl: '3600', upsert: false })
        if (uploadError) throw new Error(uploadError.message)
        const { data: urlData } = supabase.storage.from('projects').getPublicUrl(data.path)
        finalLogoUrl = urlData.publicUrl
      }

      const payload: ClientInsert = {
        name: name.trim(),
        logo_url: finalLogoUrl.trim() || null,
        description_fr: descFr.trim() || null,
        description_en: descEn.trim() || null,
        description_ar: descAr.trim() || null,
        website: website.trim() || null,
        order_index: parseInt(orderIndex) || 0,
        active,
      }

      const supabase = createClient()
      const { error: dbError } = isEdit
        ? await supabase.from('clients').update(payload).eq('id', client!.id)
        : await supabase.from('clients').insert(payload)

      if (dbError) throw new Error(dbError.message)
      setSuccess(true)
      setTimeout(() => router.push('/admin/clients'), 1200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
      setSaving(false)
    }
  }

  const preview = uploadPreview || logoUrl

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">

      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-white text-lg">Informations du client</h2>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Nom de l&apos;entreprise *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: OCP Group" required
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Site web</label>
          <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://www.exemple.com" type="url"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Ordre d&apos;affichage</label>
            <input value={orderIndex} onChange={e => setOrderIndex(e.target.value)} type="number" min="0"
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} className="w-4 h-4 rounded accent-blue-500" />
              <span className="text-gray-300 text-sm">Visible sur le site</span>
            </label>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-white text-lg">Travail réalisé</h2>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Description (Français)</label>
          <textarea value={descFr} onChange={e => setDescFr(e.target.value)} placeholder="Ex: Maintenance industrielle et installations électriques" rows={2}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Description (English)</label>
          <textarea value={descEn} onChange={e => setDescEn(e.target.value)} placeholder="Ex: Industrial maintenance and electrical installations" rows={2}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">الوصف (العربية)</label>
          <textarea value={descAr} onChange={e => setDescAr(e.target.value)} placeholder="مثال: الصيانة الصناعية والتركيبات الكهربائية" rows={2} dir="rtl"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" />
        </div>
      </section>

      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-white text-lg">Logo de l&apos;entreprise</h2>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">URL du logo</label>
          <input value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="https://..." type="url"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        </div>

        <div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          <button type="button" onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-gray-300 text-sm transition">
            <Upload className="w-4 h-4" /> Uploader le logo
          </button>
        </div>

        {preview && (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Logo" className="w-24 h-24 object-contain rounded-xl border border-gray-700 bg-white p-2" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <button type="button" onClick={() => { setLogoUrl(''); setUploadFile(null); setUploadPreview(null) }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition">
              <X className="w-3 h-3 text-white" />
            </button>
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
          <CheckCircle2 className="w-4 h-4 shrink-0" />Client {isEdit ? 'modifié' : 'ajouté'} avec succès. Redirection...
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={() => router.push('/admin/clients')} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-gray-300 transition">Annuler</button>
        <button type="submit" disabled={saving || success}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-xl font-semibold text-white transition">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Enregistrement...' : isEdit ? 'Enregistrer' : 'Ajouter le client'}
        </button>
      </div>
    </form>
  )
}
