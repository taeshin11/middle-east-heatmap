import fs from 'fs'
import path from 'path'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import CountryRiskCard from '@/components/CountryRiskCard'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export const metadata = {
  title: 'Iran-Israel Tension — Risk Dashboard',
  description: 'Iran-Israel tension tracker with risk scores, incident log, and threat analysis.',
}

export default async function IranIsraelTensionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const countries = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/countries.json'), 'utf8'))
  const relevant = countries.filter((c: any) => ['iran','israel'].includes(c.slug))
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Iran-Israel Tension Tracker</h1>
      <p className="text-gray-400">Real-time risk assessment of the Iran-Israel confrontation. Nuclear program, proxy conflicts, and direct strike capabilities.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {relevant.map((c: any) => <CountryRiskCard key={c.id} country={c} locale={locale} />)}
      </div>
      <div className="bg-gray-900 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-white mb-3">Key Tension Factors</h2>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Iran nuclear program advancement — enrichment above 60% reported</li>
          <li>• Israel declared &quot;red line&quot; on Iranian nuclear threshold</li>
          <li>• Iran proxy network (Hezbollah, Houthis, Hamas) engaged in multi-front pressure</li>
          <li>• Direct Iran-Israel strikes exchanged April 2024 — regional escalation risk elevated</li>
          <li>• US mediating restraint but unable to guarantee Israeli restraint on Iran nuclear sites</li>
        </ul>
      </div>
    </div>
  )
}
