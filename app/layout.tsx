import Navbar from '@/components/Navbar'
import QueryClientProvider from '@/components/QueryClientProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from './auth/Provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Track Issue',
  description: 'Track Issue App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Navbar />
            <main className='container my-6 px-4'>{children}</main>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
