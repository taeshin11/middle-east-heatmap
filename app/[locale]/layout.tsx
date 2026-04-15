import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import VisitorCounter from '@/components/VisitorCounter'
import { FeedbackButton } from '@/components/FeedbackButton'
import AdMobileSticky from '@/components/ads/AdMobileSticky'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()
  const t = await getTranslations({ locale })

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-400"></span>
              </span>
              <Link href={`/${locale}`} className="text-lg font-bold">ME Risk Heatmap</Link>
              <span className="text-xs text-slate-400 border border-slate-700 rounded-full px-2 py-0.5 hidden sm:block">LIVE</span>
            </div>
            <nav className="flex gap-1">
              <Link href={`/${locale}`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm">{t('nav.home')}</Link>
              <Link href={`/${locale}/incidents`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm">{t('nav.incidents')}</Link>
              <Link href={`/${locale}/iran-israel-tension`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm hidden sm:block">Iran-Israel</Link>
              <Link href={`/${locale}/middle-east-escalation`} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm hidden md:block">Escalation</Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">{children}</main>
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-bold">ME Risk Heatmap</div>
            <div className="text-xs text-slate-500 mt-1">For informational purposes only.</div>
          </div>
          <VisitorCounter />
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-4 flex gap-4 text-xs text-slate-600 flex-wrap">
          <Link href={`/${locale}/middle-east-escalation`} className="hover:text-slate-400">Middle East Escalation</Link>
          <Link href={`/${locale}/iran-israel-tension`} className="hover:text-slate-400">Iran-Israel Tension</Link>
          <Link href={`/${locale}/iran-military-threat`} className="hover:text-slate-400">Iran Military Threat</Link>
          <Link href={`/${locale}/yemen-war-risk`} className="hover:text-slate-400">Yemen War Risk</Link>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-slate-700 pt-6 mb-4 mt-4">
            <Link href={`/${locale}/about`} className="hover:text-white transition-colors">About Us</Link>
            <Link href={`/${locale}/faq`} className="hover:text-white transition-colors">How to Use &amp; FAQ</Link>
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
      <AdMobileSticky />
      <FeedbackButton siteName="Middle East Heatmap" siteUrl="https://middle-east-heatmap.vercel.app" />
    </NextIntlClientProvider>
  )
}
