import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Koushik Saha - Full Stack Engineer | React • Node.js',
    description: 'Full Stack Software Engineer with 6+ years building scalable systems for 1M+ users',
    keywords: ['React', 'Node.js', 'Full Stack', 'System Design'],
    openGraph: {
        title: 'Koushik Saha Portfolio',
        description: 'Full Stack Engineer specializing in scalable systems',
        url: 'https://koushiksaha.dev',
    }
};

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
