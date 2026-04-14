import fs from 'fs'
import path from 'path'
import CountryRiskCard from '@/components/CountryRiskCard'

export const metadata = {
  title: 'Middle East Risk Heatmap — Country Risk Cards & Threat Badges',
  description: 'Real-time Middle East country risk scores with 7-day sparklines, threat badges (missile, airstrike, maritime, drone, ground), and incident tracking.',
}

export default function HomePage() {
  const countries = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/countries.json'), 'utf8'))
  const sorted = [...countries].sort((a: any, b: any) => b.risk_score - a.risk_score)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Middle East Risk Heatmap</h1>
        <p className="text-gray-400">Country risk scores with threat badges and 7-day trend sparklines. Updated 2026-04-14.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Countries Tracked', value: countries.length, color: 'text-blue-400' },
          { label: 'Critical Tier', value: countries.filter((c: any) => c.risk_tier === 'critical').length, color: 'text-red-400' },
          { label: 'High Tier', value: countries.filter((c: any) => c.risk_tier === 'high').length, color: 'text-orange-400' },
          { label: 'Avg Risk Score', value: (countries.reduce((s: number, c: any) => s + c.risk_score, 0) / countries.length).toFixed(1), color: 'text-yellow-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 rounded-lg p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Country Risk Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((c: any) => <CountryRiskCard key={c.id} country={c} />)}
        </div>
      </div>
    </div>
  )
}
