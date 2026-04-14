import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Middle East Heatmap Terms of Service — the rules and conditions governing use of our platform.',
  keywords: 'terms of service, terms of use, user agreement',
}

export default function TermsPage() {
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing Middle East Heatmap at middle-east-heatmap.vercel.app, you agree to these Terms of Service. If you disagree, please discontinue use. We reserve the right to modify these terms; continued use constitutes acceptance.' },
    { title: '2. Description of Service', content: 'Middle East Heatmap is a free, publicly accessible web platform that provides a visual heatmap of conflict intensity and security risk levels across the Middle East and North Africa region. Provided for informational and educational purposes only. No fees charged, no registration required.' },
    { title: '3. Disclaimer of Warranties', content: 'THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. Data may be incomplete, inaccurate, or outdated. ALL DATA IS FOR INFORMATIONAL PURPOSES ONLY — NOT MILITARY, LEGAL, OR FINANCIAL ADVICE. Independently verify information before making decisions.' },
    { title: '4. Limitation of Liability', content: 'Middle East Heatmap SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES from use of the Service. Total liability shall not exceed $0, as the Service is entirely free.' },
    { title: '5. Accuracy of Information', content: 'We strive for accuracy but make no guarantees about timeliness, completeness, or suitability for any purpose. We are not responsible for errors in underlying third-party data sources.' },
    { title: '6. Intellectual Property', content: 'Original content and design are protected by copyright. Underlying data is subject to its original source licenses. You may cite information for non-commercial, educational, or journalistic purposes with attribution. Commercial republication without permission is prohibited.' },
    { title: '7. Prohibited Uses', content: 'Do not: (a) use for illegal activities; (b) attempt unauthorized access; (c) systematically harvest data without permission; (d) spread disinformation; (e) disrupt the Service.' },
    { title: '8. Third-Party Content', content: 'Advertising (including Google AdSense) and external links may appear on the Service. We are not responsible for third-party content or practices.' },
    { title: '9. Governing Law', content: 'These Terms shall be governed by applicable law. Disputes shall be resolved through good-faith negotiation first.' },
    { title: '10. Contact', content: 'Questions about these Terms? Contact us at contact@middle-east-heatmap.vercel.app.' },
  ]
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>Terms of Service</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Terms of Service</h1>
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
