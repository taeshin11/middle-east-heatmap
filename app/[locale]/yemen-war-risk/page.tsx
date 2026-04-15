import fs from 'fs'
import path from 'path'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import CountryRiskCard from '@/components/CountryRiskCard'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export const metadata = {
  title: 'Yemen War Risk — Houthi Red Sea Campaign',
  description: 'Yemen conflict and Houthi Red Sea campaign risk tracker. Shipping disruptions and humanitarian data.',
}

export default async function YemenWarRiskPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const countries = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/countries.json'), 'utf8'))
  const incidents = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/incidents.json'), 'utf8'))
  const yemen = countries.find((c: any) => c.slug === 'yemen')
  const yemenIncidents = incidents.filter((i: any) => i.country === 'Yemen')
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Yemen War Risk — Houthi Campaign</h1>
      {yemen && <CountryRiskCard country={yemen} locale={locale} />}
      <div className="bg-red-950/30 border border-red-800 rounded-lg p-4">
        <h2 className="text-red-300 font-semibold mb-2">Red Sea Shipping Disruption</h2>
        <p className="text-red-200 text-sm">Houthi forces have attacked 100+ vessels since Nov 2023. Major shipping lines rerouting around Cape of Good Hope (+14 days). Insurance costs up 300%+.</p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-white mb-3">Yemen Incidents</h2>
        <div className="space-y-3">
          {yemenIncidents.map((inc: any) => (
            <div key={inc.id} className="bg-gray-900 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">{inc.date}</p>
              <p className="text-sm text-gray-300">{inc.description}</p>
              <a href={inc.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Source: {inc.source}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
