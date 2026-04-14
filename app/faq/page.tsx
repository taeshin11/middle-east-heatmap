import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Use & FAQ',
  description: 'Learn how to use Middle East Heatmap. FAQ about our data, methodology, and features.',
  keywords: 'Middle East conflict, MENA security, regional tensions, Middle East risk, conflict heatmap, Arab world, FAQ, how to use, guide',
}

export default function FaqPage() {
  const faqs = [
    { q: 'What is Middle East Heatmap and who is it for?', a: 'Middle East Heatmap is a free, publicly accessible intelligence platform that provides a visual heatmap of conflict intensity and security risk levels across the Middle East and North Africa region. It is designed for journalists, researchers, policy analysts, students, NGO workers, and anyone with a professional or personal interest in global conflict dynamics. No registration or payment is required.' },
    { q: 'Where does the data on this platform come from?', a: 'Our data is sourced from publicly available datasets including ACLED, SIPRI, Uppsala Conflict Data Program, United Nations agencies, official government sources, and verified open-source intelligence. Each data entry cites its primary source where possible.' },
    { q: 'How frequently is the data updated?', a: 'Breaking conflict events are updated within 24-48 hours of verification. Statistical summaries are reviewed weekly or monthly. The "last updated" timestamp on each section indicates when that data was most recently refreshed.' },
    { q: 'Is this platform free to use?', a: 'Middle East Heatmap is entirely free. We believe conflict intelligence should be accessible to everyone. The platform is sustained through advertising. There are no paywalls, premium tiers, or registration requirements.' },
    { q: 'Can I use or cite data from Middle East Heatmap in my research?', a: 'You may reference and cite our data with attribution to the platform and original primary source. For academic publications, cross-reference against primary sources. For partnership or bulk data access, contact us at contact@middle-east-heatmap.vercel.app.' }
  ]
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>How to Use &amp; FAQ</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">How to Use Middle East Heatmap</h1>
        <p className="text-xl text-slate-600 mb-10">A guide to navigating the platform and getting the most from our data.</p>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Getting Started in 3 Steps</h2>
          <div className="grid gap-4">
            {[
              { step: '1', title: 'Explore the Dashboard', desc: 'Start on the homepage to get a high-level overview of current activity. The main dashboard displays key metrics, recent events, and interactive visualizations.' },
              { step: '2', title: 'Filter & Drill Down', desc: 'Use filter controls to narrow data by region, date range, type, or severity. Click on any event, country, or data point to access detailed information and sourced reports.' },
              { step: '3', title: 'Track Changes Over Time', desc: 'Use timeline and historical views to understand trends. Bookmark pages or check our update sections to stay current on developments that matter to you.' }
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0">{step}</div>
                <div><h3 className="font-semibold text-slate-800 mb-1">{title}</h3><p className="text-slate-600 text-sm">{desc}</p></div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6">
                <h3 className="font-semibold text-slate-800 mb-3">{q}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
