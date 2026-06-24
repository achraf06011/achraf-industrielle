import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Portfolio from '@/components/sections/Portfolio'
import Clients from '@/components/sections/Clients'
import Certifications from '@/components/sections/Certifications'
import WhyUs from '@/components/sections/WhyUs'
import Testimonials from '@/components/sections/Testimonials'
import QuoteForm from '@/components/sections/QuoteForm'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import { createClient } from '@/lib/supabase/server'
import { setRequestLocale } from 'next-intl/server'
import type { Project, Client } from '@/lib/supabase/types'

async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('projects').select('*').order('featured', { ascending: false }).order('created_at', { ascending: false })
    return data ?? []
  } catch { return [] }
}

async function getClients(): Promise<Client[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('clients').select('*').eq('active', true).order('order_index').order('created_at', { ascending: false })
    return data ?? []
  } catch { return [] }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const [dbProjects, dbClients] = await Promise.all([getProjects(), getClients()])

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Header />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Process />
      <Portfolio dbProjects={dbProjects} />
      <Clients dbClients={dbClients} />
      <Certifications />
      <WhyUs />
      <Testimonials />
      <QuoteForm />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
