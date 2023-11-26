import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './global.scss'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--rubik-default'
})

export const metadata: Metadata = {
  title: 'Test 05 Postulacion',
  description: 'Technical test exercise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  )
}
