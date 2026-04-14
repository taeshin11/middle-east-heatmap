import fs from 'fs'
import path from 'path'
import CountryRiskCard from '@/components/CountryRiskCard'

export const metadata = {
  title: 'Middle East Heatmap | Real-Time Conflict Intelligence',
  description: 'Visual heatmap of conflict intensity and security risk levels across the Middle East and North Africa region',
  keywords: 'Middle East conflict, MENA security, regional tensions, Middle East risk, conflict heatmap, Arab world',
}

interface Country {
  id: string
  risk_score: number
  risk_tier: string
}

export default function HomePage() {
  const countries = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/countries.json'), 'utf8'))
  const sorted = [...countries].sort((a: Country, b: Country) => b.risk_score - a.risk_score)
  const criticalCount = countries.filter((c: Country) => c.risk_tier === 'critical').length
  const highCount = countries.filter((c: Country) => c.risk_tier === 'high').length
  const avgScore = (countries.reduce((s: number, c: Country) => s + c.risk_score, 0) / countries.length).toFixed(1)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-orange-950/20 to-slate-900 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative">
          <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">Middle East Risk Monitor</p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold mb-4">Middle East<br/><span className="text-orange-400">Heatmap</span></h1>
              <p className="text-slate-300 text-base max-w-2xl">Multi-country escalation signals across the Middle East. Real-time risk tiers with incident feeds.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center">
                <div className="text-3xl font-black text-orange-400">{countries.length}</div>
                <div className="text-xs text-slate-400 mt-1">Countries</div>
              </div>
              <div className="bg-red-500/20 border border-red-500/30 rounded-2xl px-5 py-4 text-center">
                <div className="text-3xl font-black text-red-400">{criticalCount}</div>
                <div className="text-xs text-slate-400 mt-1">Critical</div>
              </div>
              <div className="bg-orange-500/20 border border-orange-500/30 rounded-2xl px-5 py-4 text-center">
                <div className="text-3xl font-black text-orange-400">{highCount}</div>
                <div className="text-xs text-slate-400 mt-1">High Risk</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center">
                <div className="text-3xl font-black text-yellow-400">{avgScore}</div>
                <div className="text-xs text-slate-400 mt-1">Avg Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">Country Risk Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((c: { id: string; slug: string; name: string; flag: string; risk_score: number; prev_score: number; risk_tier: 'critical' | 'high' | 'medium' | 'low'; trend: string; '7_day_scores': number[]; threat_badges: string[]; description: string; recent_incident: { date: string; summary: string; source: string; source_url: string }; last_updated: string }) => (
            <CountryRiskCard key={c.id} country={c} />
          ))}
        </div>
      </div>
    </div>
  )
}
