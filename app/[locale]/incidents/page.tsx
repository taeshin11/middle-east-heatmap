import fs from 'fs'
import path from 'path'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export const metadata = {
  title: 'Middle East Incidents Log — ME Risk Heatmap',
  description: 'Full incident log for the Middle East region.',
}

const sevColors: Record<string, string> = {
  critical: 'bg-red-900 text-red-200',
  high: 'bg-orange-900 text-orange-200',
  medium: 'bg-yellow-900 text-yellow-200',
}

const typeColors: Record<string, string> = {
  missile: 'bg-red-800 text-red-200',
  airstrike: 'bg-orange-800 text-orange-200',
  maritime: 'bg-blue-800 text-blue-200',
  drone: 'bg-purple-800 text-purple-200',
  ground: 'bg-gray-700 text-gray-200',
}

export default async function IncidentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const incidents = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/incidents.json'), 'utf8'))
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Incident Log</h1>
      <div className="space-y-3">
        {incidents.map((inc: any) => (
          <div key={inc.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-sm text-gray-400 font-medium">{inc.date}</span>
              <span className="text-sm font-bold text-white">{inc.country}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${sevColors[inc.severity] || 'bg-gray-700 text-gray-300'}`}>{inc.severity}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[inc.type] || 'bg-gray-700 text-gray-300'}`}>{inc.type}</span>
            </div>
            <p className="text-sm text-gray-300 mb-1">{inc.description}</p>
            <a href={inc.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Source: {inc.source}</a>
          </div>
        ))}
      </div>
    </div>
  )
}
