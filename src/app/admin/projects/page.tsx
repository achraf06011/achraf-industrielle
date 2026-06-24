import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import AdminNav from '@/components/admin/AdminNav'
import ProjectList from '@/components/admin/ProjectList'
import { PlusCircle } from 'lucide-react'

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin')

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Projets réalisés</h1>
              <p className="text-gray-400 text-sm mt-1">{projects?.length ?? 0} projet(s) au total</p>
            </div>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-white text-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              Nouveau projet
            </Link>
          </div>

          <ProjectList projects={projects ?? []} />
        </div>
      </main>
    </div>
  )
}
