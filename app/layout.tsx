import Script from 'next/script'
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

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
    google: 'WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc',
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Middle East Heatmap",
              "url": "https://middle-east-heatmap.vercel.app",
              "description": "Visual heatmap of conflict intensity and security risk levels across the Middle East and North Africa",
              "publisher": {
                "@type": "Organization",
                "name": "Middle East Heatmap",
                "url": "https://middle-east-heatmap.vercel.app"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
