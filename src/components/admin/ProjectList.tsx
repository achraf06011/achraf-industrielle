'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Project } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'
import { Pencil, Trash2, Star, StarOff, ExternalLink } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  metallic: 'Construction métallique',
  maintenance: 'Maintenance',
  electrical: 'Électricité',
  agro: 'Agroalimentaire',
  textile: 'Textile',
}

const categoryColors: Record<string, string> = {
  metallic: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  maintenance: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  electrical: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  agro: 'bg-green-500/10 text-green-400 border-green-500/20',
  textile: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Supprimer le projet "${title}" ? Cette action est irréversible.`)) return
    setDeletingId(id)
    const supabase = createClient()
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      alert('Erreur lors de la suppression.')
      setDeletingId(null)
    } else {
      router.refresh()
    }
  }

  async function handleToggleFeatured(id: string, current: boolean) {
    const supabase = createClient()
    await supabase.from('projects').update({ featured: !current }).eq('id', id)
    router.refresh()
  }

  if (projects.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
        <p className="text-gray-400">Aucun projet pour l&apos;instant.</p>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold text-white transition"
        >
          Créer le premier projet
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="px-6 py-4 text-gray-400 font-medium">Projet</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Catégorie</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Année</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Mis en avant</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {projects.map(project => (
              <tr key={project.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {project.image_url ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image_url}
                          alt={project.title_fr}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-800 shrink-0 flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-white leading-tight">{project.title_fr}</p>
                      {project.location && (
                        <p className="text-gray-500 text-xs mt-0.5">{project.location}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${categoryColors[project.category]}`}>
                    {categoryLabels[project.category]}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">{project.year}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleFeatured(project.id, project.featured)}
                    className={`transition-colors ${project.featured ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-600 hover:text-yellow-400'}`}
                    title={project.featured ? 'Retirer de la mise en avant' : 'Mettre en avant'}
                  >
                    {project.featured ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition"
                      title="Modifier"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title_fr)}
                      disabled={deletingId === project.id}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition disabled:opacity-50"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
