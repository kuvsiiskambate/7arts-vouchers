import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { TRPCProvider } from '@/lib/trpc/provider'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'hub.7arts.bg — Национална културна платформа',
  description: 'Българската оперативна система за култура. Финансиране, събития, работа и репутация за независими творци.',
  keywords: ['култура', 'изкуство', 'финансиране', 'crowdfunding', 'събития', 'театър', 'музика', 'България'],
  authors: [{ name: '7Arts' }],
  openGraph: {
    title: 'hub.7arts.bg — Национална културна платформа',
    description: 'Българската оперативна система за култура',
    type: 'website',
    locale: 'bg_BG',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg" className={montserrat.variable}>
      <body className="min-h-screen bg-brand-dark text-white antialiased">
        <TRPCProvider>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </TRPCProvider>
      </body>
    </html>
  )
}
