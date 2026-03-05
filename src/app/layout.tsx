import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SoilSmart - Smart Agricultural Technology for Sustainable Farming',
  description: 'Empowering African farmers with affordable, data-driven tools for soil health monitoring, smart irrigation, and AI-powered agricultural guidance.',
  keywords: 'agriculture, soil health, smart farming, IoT sensors, sustainable farming, Africa',
  authors: [{ name: 'Echo Solutions Ltd' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'SoilSmart - Smart Agricultural Technology',
    description: 'Data-driven tools for sustainable farming and soil health management',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

