import fs from 'fs'
import path from 'path'
import CountryRiskCard from '@/components/CountryRiskCard'

export const metadata = {
  title: 'Iran Military Threat Assessment — ME Risk Heatmap',
  description: 'Iran military threat assessment including missile program, drone capabilities, naval forces, and proxy network analysis.',
}

export default function IranMilitaryThreatPage() {
  const countries = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/countries.json'), 'utf8'))
  const iran = countries.find((c: any) => c.slug === 'iran')
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Iran Military Threat Assessment</h1>
      {iran && <CountryRiskCard country={iran} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Ballistic Missiles', desc: 'Iran has an estimated 3,000+ ballistic missiles. Shahab-3 can reach Israel. Hypersonic Fattah tested in 2023.' },
          { title: 'Drone Capabilities', desc: 'Shahed-136 attack drones deployed in Ukraine and region. Long-range Mohajer series for reconnaissance.' },
          { title: 'Naval Forces', desc: 'IRGC Navy controls Strait of Hormuz. Mine warfare and fast-boat swarm tactics. Can close strait for days.' },
          { title: 'Proxy Network', desc: 'Hezbollah (Lebanon), Hamas (Gaza), Houthis (Yemen), PMF (Iraq), IRGC advisors (Syria). Multi-front capability.' },
        ].map(item => (
          <div key={item.title} className="bg-gray-900 rounded-lg p-4">
            <h3 className="font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
