import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Middle East Heatmap Privacy Policy — how we collect, use, and protect your information.',
  keywords: 'privacy policy, data protection, cookies, GDPR',
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const sections = [
    { title: '1. Introduction', content: 'Middle East Heatmap operates the website at middle-east-heatmap.vercel.app. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.' },
    { title: '2. Information We Collect', content: 'We automatically collect browser type, operating system, referring URLs, device information, and pages visited through standard server logs and analytics tools. We do not require user registration and do not intentionally collect personally identifiable information.' },
    { title: '3. Cookies and Tracking Technologies', content: 'We use cookies to improve your experience, analyze traffic, and serve relevant advertisements. Types: Essential cookies (basic functionality), Analytics cookies (Google Analytics — anonymized), Advertising cookies (Google AdSense — personalized ads based on browsing history), and Preference cookies (language selection). Control cookies through your browser settings.' },
    { title: '4. Google AdSense & Third-Party Advertising', content: 'We use Google AdSense to display advertisements. AdSense uses cookies to serve ads based on your prior visits to our website and other sites. Opt out of personalized advertising at https://www.google.com/settings/ads or http://www.aboutads.info/choices. Learn more at https://policies.google.com/technologies/partner-sites.' },
    { title: '5. Google Analytics', content: 'We use Google Analytics to analyze traffic patterns. It collects anonymized information about how users interact with our site. We do not combine this data with personally identifiable information.' },
    { title: '6. Third-Party Links', content: 'Our website may link to third-party sites. We are not responsible for their privacy practices. Review their policies before providing any information.' },
    { title: '7. Data Retention & Security', content: 'We implement reasonable security measures. Analytics data is retained for up to 26 months before automatic deletion. No Internet transmission method is 100% secure.' },
    { title: "8. Children's Privacy", content: 'Our service is not directed to individuals under 13. We do not knowingly collect personal information from children under 13.' },
    { title: '9. Changes to This Policy', content: 'We may update this Privacy Policy periodically. Changes will be posted on this page with an updated date.' },
    { title: '10. Contact Us', content: 'Questions about this Privacy Policy? Contact us at contact@middle-east-heatmap.vercel.app.' },
  ]
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>Privacy Policy</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
        <p className="text-slate-500 mb-10">Last updated: April 2025</p>
        <div className="space-y-4">
          {sections.map(({ title, content }) => (
            <section key={title} className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">{title}</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
