import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Word Game',
  description: 'Actividad PW C2',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body className={inter.body}>{children}</body>
    </html>
  )
}
