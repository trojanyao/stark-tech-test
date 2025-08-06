import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: 'StarkTech Finance'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
