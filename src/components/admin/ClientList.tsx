'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Client } from '@/lib/supabase/types'
import { createClient } from '@/lib/supabase/client'
import { Pencil, Trash2, Globe, Building2, Eye, EyeOff } from 'lucide-react'

export default function ClientList({ clients }: { clients: Client[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Supprimer le client "${name}" ?`)) return
    setDeletingId(id)
    const supabase = createClient()
    const { error } = await supabase.from('clients').delete().eq('id', id)
    if (error) { alert('Erreur lors de la suppression.'); setDeletingId(null) }
    else router.refresh()
  }

  async function handleToggleActive(id: string, current: boolean) {
    const supabase = createClient()
    await supabase.from('clients').update({ active: !current }).eq('id', id)
    router.refresh()
  }

  if (clients.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
        <p className="text-gray-400">Aucun client pour l&apos;instant.</p>
        <Link href="/admin/clients/new" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold text-white transition">
          Ajouter le premier client
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
              <th className="px-6 py-4 text-gray-400 font-medium">Client</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Travail réalisé</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Site web</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Visible</th>
              <th className="px-6 py-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {clients.map(client => (
              <tr key={client.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 shrink-0 flex items-center justify-center overflow-hidden">
                      {client.logo_url
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={client.logo_url} alt={client.name} className="w-full h-full object-contain p-1" />
                        : <Building2 className="w-4 h-4 text-gray-500" />
                      }
                    </div>
                    <p className="font-medium text-white">{client.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{client.description_fr ?? '—'}</td>
                <td className="px-6 py-4">
                  {client.website
                    ? <a href={client.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition text-xs"><Globe className="w-3 h-3" />Site</a>
                    : <span className="text-gray-600 text-xs">—</span>
                  }
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleToggleActive(client.id, client.active)}
                    className={`transition-colors ${client.active ? 'text-green-400 hover:text-green-300' : 'text-gray-600 hover:text-gray-400'}`}>
                    {client.active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/clients/${client.id}/edit`} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition"><Pencil className="w-4 h-4" /></Link>
                    <button onClick={() => handleDelete(client.id, client.name)} disabled={deletingId === client.id}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition disabled:opacity-50">
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
