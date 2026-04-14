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

const tierTopGradient: Record<string, string> = {
  critical: 'bg-gradient-to-r from-red-500 to-red-600',
  high: 'bg-gradient-to-r from-orange-500 to-orange-600',
  medium: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
  low: 'bg-gradient-to-r from-green-500 to-green-600',
}

const tierBadge: Record<string, string> = {
  critical: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  high: 'bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-700 ring-1 ring-inset ring-yellow-500/20',
  low: 'bg-green-500/10 text-green-600 ring-1 ring-inset ring-green-500/20',
}

const riskScoreColor: Record<string, string> = {
  critical: 'text-red-600',
  high: 'text-orange-500',
  medium: 'text-yellow-600',
  low: 'text-green-600',
}

const threatBadgeColors: Record<string, string> = {
  missile: 'bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20',
  airstrike: 'bg-orange-500/10 text-orange-600 ring-1 ring-inset ring-orange-500/20',
  maritime: 'bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-500/20',
  drone: 'bg-purple-500/10 text-purple-600 ring-1 ring-inset ring-purple-500/20',
  ground: 'bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20',
}

const sparklineColor: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
}

export default function CountryRiskCard({ country }: { country: Country }) {
  const sparkline = {
    grid: { top: 2, right: 2, bottom: 2, left: 2 },
    xAxis: { show: false, type: 'category' as const, data: country['7_day_scores'].map((_: number, i: number) => i) },
    yAxis: { show: false, type: 'value' as const, min: Math.min(...country['7_day_scores']) - 0.5, max: 10 },
    series: [{
      type: 'line' as const,
      data: country['7_day_scores'],
      smooth: true,
      symbol: 'none',
      lineStyle: { color: sparklineColor[country.risk_tier], width: 2.5 },
      areaStyle: { color: `${sparklineColor[country.risk_tier]}20` }
    }]
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      {/* Color-coded top border */}
      <div className={`h-1.5 ${tierTopGradient[country.risk_tier]}`}></div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{country.flag}</span>
            <div>
              <h3 className="font-black text-slate-900 text-lg group-hover:text-orange-600 transition-colors leading-tight">{country.name}</h3>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase mt-1 inline-block ${tierBadge[country.risk_tier]}`}>
                {country.risk_tier}
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`text-4xl font-black ${riskScoreColor[country.risk_tier]}`}>{country.risk_score.toFixed(1)}</div>
            <div className="text-xs text-slate-400">/10</div>
          </div>
        </div>

        {/* Threat badges row */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {country.threat_badges?.map(badge => (
            <span key={badge} className={`text-xs px-2 py-0.5 rounded-full font-semibold ${threatBadgeColors[badge] ?? 'bg-slate-100 text-slate-600'}`}>{badge}</span>
          ))}
        </div>

        {/* 7-day sparkline */}
        <div className="h-12 mb-4">
          <ReactECharts option={sparkline} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />
        </div>

        {/* Recent incident */}
        <div className="bg-slate-50 rounded-lg p-3 text-xs mb-3">
          <span className="font-semibold text-slate-700">Latest: </span>
          <span className="text-slate-600">{country.recent_incident?.summary}</span>
        </div>

        <Link href={`/country/${country.slug}`} className="text-xs text-orange-600 hover:text-orange-800 font-semibold transition-colors">
          Full analysis →
        </Link>
      </div>
    </div>
  )
}
