'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

interface Country {
  id: string; slug: string; name: string; flag: string; risk_score: number; prev_score: number
  risk_tier: 'critical' | 'high' | 'medium' | 'low'; trend: string
  '7_day_scores': number[]; threat_badges: string[]
  description: string; recent_incident: { date: string; summary: string; source: string; source_url: string }
  last_updated: string
}

const tierColors = {
  critical: { border: 'border-red-700', badge: 'bg-red-900 text-red-200', score: 'text-red-400' },
  high: { border: 'border-orange-700', badge: 'bg-orange-900 text-orange-200', score: 'text-orange-400' },
  medium: { border: 'border-yellow-700', badge: 'bg-yellow-900 text-yellow-200', score: 'text-yellow-400' },
  low: { border: 'border-green-700', badge: 'bg-green-900 text-green-200', score: 'text-green-400' },
}

const threatBadgeColors: Record<string, string> = {
  missile: 'bg-red-900 text-red-200',
  airstrike: 'bg-orange-900 text-orange-200',
  maritime: 'bg-blue-900 text-blue-200',
  drone: 'bg-purple-900 text-purple-200',
  ground: 'bg-gray-700 text-gray-200',
}

export default function CountryRiskCard({ country }: { country: Country }) {
  const colors = tierColors[country.risk_tier]
  const trendArrow = country.trend === 'worsening' ? '▲' : country.trend === 'improving' ? '▼' : '→'
  const trendColor = country.trend === 'worsening' ? 'text-red-400' : country.trend === 'improving' ? 'text-green-400' : 'text-gray-400'

  const sparkline = {
    grid: { top: 0, right: 0, bottom: 0, left: 0 },
    xAxis: { show: false, type: 'category' as const, data: country['7_day_scores'].map((_: number, i: number) => i) },
    yAxis: { show: false, type: 'value' as const, min: Math.min(...country['7_day_scores']) - 0.5, max: 10 },
    series: [{ type: 'line' as const, data: country['7_day_scores'], smooth: true, symbol: 'none', lineStyle: { color: country.risk_tier === 'critical' ? '#ef4444' : '#f97316', width: 2 }, areaStyle: { color: 'rgba(239,68,68,0.1)' } }]
  }

  return (
    <div className={`rounded-lg border ${colors.border} bg-gray-900 p-4 hover:bg-gray-800 transition-colors`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-3xl">{country.flag}</span>
          <h3 className="font-bold text-white text-lg mt-1">{country.name}</h3>
        </div>
        <div className="text-right">
          <p className={`text-4xl font-black ${colors.score}`}>{country.risk_score.toFixed(1)}</p>
          <p className={`text-sm font-bold ${trendColor}`}>{trendArrow}</p>
        </div>
      </div>

      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase ${colors.badge}`}>
        {country.risk_tier}
      </span>

      <div className="my-2 h-12">
        <ReactECharts option={sparkline} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {country.threat_badges.map(b => (
          <span key={b} className={`text-xs px-2 py-0.5 rounded-full ${threatBadgeColors[b] || 'bg-gray-700 text-gray-300'}`}>{b}</span>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-2 line-clamp-2">{country.description}</p>

      <div className="bg-gray-800 rounded p-2 mb-2">
        <p className="text-xs text-gray-500 mb-0.5">{country.recent_incident.date}</p>
        <p className="text-xs text-gray-300 line-clamp-2">{country.recent_incident.summary}</p>
      </div>

      <Link href={`/country/${country.slug}`} className="text-xs text-blue-400 hover:underline">
        Full analysis →
      </Link>
    </div>
  )
}
