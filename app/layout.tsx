import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import VisitorCounter from '@/components/VisitorCounter'

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Middle East Heatmap | Real-Time Intelligence',
    template: '%s | Middle East Heatmap'
  },
  description: 'Visual heatmap of conflict intensity and security risk levels across the Middle East and North Africa region',
  keywords: 'Middle East conflict, MENA security, regional tensions, Middle East risk, conflict heatmap, Arab world',
  openGraph: {
    type: 'website',
    siteName: 'Middle East Heatmap',
    title: 'Middle East Heatmap | Real-Time Intelligence',
    description: 'Visual heatmap of conflict intensity and security risk levels across the Middle East and North Africa region',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Middle East Heatmap',
    description: 'Visual heatmap of conflict intensity and security risk levels across the Middle East and North Africa region',
  },
  verification: {
    google: 'add-your-google-site-verification-here',
  },
  other: {
    'google-adsense-account': 'ca-pub-add-your-publisher-id-here',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-400"></span>
                </span>
                <Link href="/" className="text-lg font-bold">ME Risk Heatmap</Link>
                <span className="text-xs text-slate-400 border border-slate-700 rounded-full px-2 py-0.5 hidden sm:block">LIVE</span>
              </div>
              <nav className="flex gap-1">
                <Link href="/" className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm">Home</Link>
                <Link href="/incidents" className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm">Incidents</Link>
                <Link href="/iran-israel-tension" className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm hidden sm:block">Iran-Israel</Link>
                <Link href="/middle-east-escalation" className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm hidden md:block">Escalation</Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1 w-full">{children}</main>
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-bold">ME Risk Heatmap</div>
              <div className="text-xs text-slate-500 mt-1">For informational purposes only.</div>
            </div>
            <VisitorCounter />
          </div>
          <div className="max-w-7xl mx-auto px-4 pb-4 flex gap-4 text-xs text-slate-600 flex-wrap">
            <Link href="/middle-east-escalation" className="hover:text-slate-400">Middle East Escalation</Link>
            <Link href="/iran-israel-tension" className="hover:text-slate-400">Iran-Israel Tension</Link>
            <Link href="/iran-military-threat" className="hover:text-slate-400">Iran Military Threat</Link>
            <Link href="/yemen-war-risk" className="hover:text-slate-400">Yemen War Risk</Link>
          </div>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-slate-700 pt-6 mb-4 mt-4">
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
              <a href="/faq" className="hover:text-white transition-colors">How to Use &amp; FAQ</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
