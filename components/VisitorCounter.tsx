'use client'
import { useEffect, useState } from 'react'
export default function VisitorCounter() {
  const [stats, setStats] = useState<{ total: number; today: number } | null>(null)
  useEffect(() => { fetch('/api/visitor', { method: 'POST' }).then(r => r.json()).then(setStats).catch(() => {}) }, [])
  if (!stats) return null
  return (
    <div className="flex gap-4 text-xs text-gray-500">
      <span>Total: <strong className="text-gray-300">{stats.total.toLocaleString()}</strong></span>
      <span>Today: <strong className="text-gray-300">{stats.today.toLocaleString()}</strong></span>
    </div>
  )
}
