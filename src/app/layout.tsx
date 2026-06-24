import './globals.css'
import type { ReactNode } from 'react'

// Root layout: minimal — the locale layout provides html/body with lang & dir
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
