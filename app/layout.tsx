import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import VisitorCounter from '@/components/VisitorCounter'

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Middle East Risk Heatmap — Country Risk Cards",
  description: "Country-by-country risk analysis for the Middle East with threat badges and 7-day trend sparklines.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <header className="border-b border-gray-800 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
            <Link href="/" className="text-xl font-bold text-white">🌡️ ME Risk Heatmap</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
              <Link href="/incidents" className="text-gray-300 hover:text-white">Incidents</Link>
              <Link href="/middle-east-escalation" className="text-gray-300 hover:text-white">Escalation</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">{children}</main>
        <footer className="border-t border-gray-800 bg-gray-900 py-6 mt-8">
          <div className="max-w-7xl mx-auto px-4 space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1,2,3,4].map(i => <div key={i} className="h-16 border border-dashed border-gray-700 rounded flex items-center justify-center text-gray-600 text-xs">Ad {i}</div>)}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <span>© {new Date().getFullYear()} ME Risk Heatmap. For informational purposes only.</span>
              <VisitorCounter />
            </div>
            <div className="text-xs text-gray-600 flex flex-wrap gap-3">
              <Link href="/middle-east-escalation" className="hover:text-gray-400">Middle East Escalation</Link>
              <Link href="/iran-israel-tension" className="hover:text-gray-400">Iran-Israel Tension</Link>
              <Link href="/iran-military-threat" className="hover:text-gray-400">Iran Military Threat</Link>
              <Link href="/yemen-war-risk" className="hover:text-gray-400">Yemen War Risk</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
