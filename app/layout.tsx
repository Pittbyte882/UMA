import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Great_Vibes, Dancing_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SplashWrapper } from '@/components/SplashWrapper'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
})

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
})

const greatVibes = Great_Vibes({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-script',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  weight: '400',
  subsets: ["latin"],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ultimate Music Academy | Vocal Lessons by Samantha Nelson',
  description: 'Professional vocal training for kids, teens, and adults through confidence-building, artistry, and real-world music mentorship.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased bg-pearl-white">
        <SplashWrapper />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}