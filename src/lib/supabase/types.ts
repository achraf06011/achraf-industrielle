export type ProjectCategory =
  | 'metallic'
  | 'maintenance'
  | 'electrical'
  | 'agro'
  | 'textile'

export type Project = {
  id: string
  title_fr: string
  title_en: string | null
  title_ar: string | null
  description_fr: string | null
  description_en: string | null
  description_ar: string | null
  category: ProjectCategory
  location: string | null
  year: string
  image_url: string | null
  gallery_images: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>
export type ProjectUpdate = Partial<ProjectInsert>

export type Client = {
  id: string
  name: string
  logo_url: string | null
  description_fr: string | null
  description_en: string | null
  description_ar: string | null
  website: string | null
  order_index: number
  active: boolean
  created_at: string
}

export type ClientInsert = Omit<Client, 'id' | 'created_at'>
export type ClientUpdate = Partial<ClientInsert>
