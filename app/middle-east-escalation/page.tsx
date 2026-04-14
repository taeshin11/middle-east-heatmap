import fs from 'fs'
import path from 'path'
import CountryRiskCard from '@/components/CountryRiskCard'

export const metadata = {
  title: 'Middle East Escalation — Risk Tracking Dashboard',
  description: 'Track escalation risks across the Middle East. Missile threats, airstrikes, maritime incidents, and drone attacks.',
}

export default function MiddleEastEscalationPage() {
  const countries = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/countries.json'), 'utf8'))
  const sorted = [...countries].sort((a: any, b: any) => b.risk_score - a.risk_score)
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Middle East Escalation Tracker</h1>
      <p className="text-gray-400">Current escalation risk across the Middle East region. Data updated daily.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((c: any) => <CountryRiskCard key={c.id} country={c} />)}
      </div>
    </div>
  )
}
