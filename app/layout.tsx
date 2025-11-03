import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Koushik Saha - Full Stack Developer',
    description: 'Portfolio showcasing projects, skills, and experience',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className="bg-black text-white">
        {children}
        </body>
        </html>
    )
}
