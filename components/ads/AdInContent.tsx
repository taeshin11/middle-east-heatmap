'use client'
import { useEffect, useRef } from 'react'

export default function AdInContent() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return
    ref.current.dataset.loaded = '1'
    const s = document.createElement('script')
    s.src = 'https://pl29155420.profitablecpmratenetwork.com/2fa853d3552be99de201063a7d4d3355/invoke.js'
    s.async = true
    s.setAttribute('data-cfasync', 'false')
    ref.current.appendChild(s)
  }, [])
  return (
    <div className="w-full my-4">
      <div id="container-2fa853d3552be99de201063a7d4d3355" ref={ref} />
    </div>
  )
}
