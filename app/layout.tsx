import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from './Providers'
import ScrollManager from './ScrollManager'
import './globals.scss'

const inter = Inter({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'justin gnananadchtheram',
  description: "justin gnananadchtheram's personal website",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Providers>
          <ScrollManager />
          <Navbar />
          <div style={{ background: '#121212', overflow: 'hidden' }}>
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
