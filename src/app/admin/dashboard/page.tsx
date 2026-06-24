import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminNav from '@/components/admin/AdminNav'
import { FolderOpen, Star, Calendar, TrendingUp } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin')

  const { data: projects } = await supabase
    .from('projects')
    .select('id, category, year, featured')
    .order('created_at', { ascending: false })

  const total = projects?.length ?? 0
  const featured = projects?.filter(p => p.featured).length ?? 0
  const currentYear = new Date().getFullYear().toString()
  const thisYear = projects?.filter(p => p.year === currentYear).length ?? 0

  const categoryCounts: Record<string, number> = {}
  projects?.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1
  })

  const categoryLabels: Record<string, string> = {
    metallic: 'Construction métallique',
    maintenance: 'Maintenance industrielle',
    electrical: 'Électricité industrielle',
    agro: 'Agroalimentaire',
    textile: 'Textile',
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-1">Tableau de bord</h1>
          <p className="text-gray-400 text-sm mb-8">Bienvenue, {user.email}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <StatCard icon={FolderOpen} label="Total projets" value={total} color="blue" />
            <StatCard icon={Star} label="Projets mis en avant" value={featured} color="yellow" />
            <StatCard icon={Calendar} label={`Projets ${currentYear}`} value={thisYear} color="green" />
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Projets par catégorie
            </h2>
            <div className="space-y-3">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const count = categoryCounts[key] ?? 0
                const pct = total > 0 ? Math.round((count / total) * 100) : 0
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{label}</span>
                      <span className="text-gray-400">{count} projet{count !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType
  label: string
  value: number
  color: 'blue' | 'yellow' | 'green'
}) {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
  }
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <div className={`inline-flex p-2.5 rounded-xl border mb-4 ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-gray-400 text-sm mt-1">{label}</p>
    </div>
  )
}
