'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

interface Country {
  id: string; slug: string; name: string; flag: string; risk_score: number; prev_score: number
  risk_tier: string; trend: string; '7_day_scores': number[]; threat_badges: string[]
  description: string; recent_incident: { date: string; summary: string; source: string; source_url: string }
  last_updated: string
}

interface Incident {
  id: number; date: string; country: string; type: string; description: string; source: string; source_url: string; severity: string
}

const threatBadgeColors: Record<string, string> = {
  missile: 'bg-red-900 text-red-200',
  airstrike: 'bg-orange-900 text-orange-200',
  maritime: 'bg-blue-900 text-blue-200',
  drone: 'bg-purple-900 text-purple-200',
  ground: 'bg-gray-700 text-gray-200',
}

const sevColors: Record<string, string> = {
  critical: 'bg-red-900 text-red-200',
  high: 'bg-orange-900 text-orange-200',
  medium: 'bg-yellow-900 text-yellow-200',
}

export default function CountryDetailPage({ params }: { params: { slug: string } }) {
  const [country, setCountry] = useState<Country | null>(null)
  const [incidents, setIncidents] = useState<Incident[]>([])

  useEffect(() => {
    fetch('/data/countries.json').then(r => r.json()).then((cs: Country[]) => setCountry(cs.find(c => c.slug === params.slug) || null))
    fetch('/data/incidents.json').then(r => r.json()).then((incs: Incident[]) => setIncidents(incs.filter(i => i.country === params.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))))
  }, [params.slug])

  if (!country) return <div className="text-gray-400 p-8">Loading...</div>

  const sparkOption = {
    grid: { top: 10, right: 20, bottom: 30, left: 40 },
    xAxis: { type: 'category' as const, data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], axisLabel: { color: '#9ca3af' } },
    yAxis: { type: 'value' as const, min: Math.min(...country['7_day_scores']) - 1, max: 10, axisLabel: { color: '#9ca3af' } },
    tooltip: { trigger: 'axis' as const },
    series: [{
      type: 'line' as const,
      data: country['7_day_scores'],
      smooth: true,
      symbol: 'circle',
      lineStyle: { color: '#ef4444', width: 3 },
      itemStyle: { color: '#ef4444' },
      areaStyle: { color: 'rgba(239,68,68,0.15)' }
    }]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-5xl">{country.flag}</span>
        <div>
          <h1 className="text-3xl font-bold text-white">{country.name}</h1>
          <p className="text-gray-400 text-sm">Last updated: {country.last_updated}</p>
        </div>
        <span className="text-5xl font-black text-red-400 ml-auto">{country.risk_score.toFixed(1)}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className={`text-sm px-3 py-1 rounded-full font-semibold uppercase ${country.risk_tier === 'critical' ? 'bg-red-900 text-red-200' : country.risk_tier === 'high' ? 'bg-orange-900 text-orange-200' : 'bg-yellow-900 text-yellow-200'}`}>
          {country.risk_tier}
        </span>
        {country.threat_badges.map(b => (
          <span key={b} className={`text-sm px-3 py-1 rounded-full ${threatBadgeColors[b] || 'bg-gray-700 text-gray-300'}`}>{b}</span>
        ))}
      </div>

      <p className="text-gray-300 leading-relaxed">{country.description}</p>

      <div className="bg-gray-900 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-white mb-3">7-Day Risk Trend</h2>
        <ReactECharts option={sparkOption} style={{ height: 200 }} />
      </div>

      {incidents.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Recent Incidents</h2>
          <div className="space-y-3">
            {incidents.map(inc => (
              <div key={inc.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500">{inc.date}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${sevColors[inc.severity] || 'bg-gray-700 text-gray-300'}`}>{inc.severity}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${threatBadgeColors[inc.type] || 'bg-gray-700 text-gray-300'}`}>{inc.type}</span>
                </div>
                <p className="text-sm text-gray-300 mb-1">{inc.description}</p>
                <a href={inc.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Source: {inc.source}</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
