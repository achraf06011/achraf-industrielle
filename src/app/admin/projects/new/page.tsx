import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminNav from '@/components/admin/AdminNav'
import ProjectForm from '@/components/admin/ProjectForm'

export default async function NewProjectPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin')

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Nouveau projet</h1>
            <p className="text-gray-400 text-sm mt-1">Ajoutez un projet réalisé à votre portfolio</p>
          </div>
          <ProjectForm />
        </div>
      </main>
    </div>
  )
}
