import '@/shared/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import Aos from 'aos'
import 'aos/dist/aos.css'
import ErrorBoundary from '@/shared/ui/error-boundary'
import { i18n, syncClientLocale } from '@/shared/i18n'
import { AOS_DURATION_MS, FIREFLIES_COUNT } from '@/shared/config'
import { roboto, displayFont } from '@/shared/lib/fonts'

const PageAtmosphere = dynamic(
  () => import('@/widgets/page-atmosphere/ui/PageAtmosphere'),
  { ssr: false }
)

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    syncClientLocale()
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    Aos.init({
      duration: prefersReducedMotion ? 0 : AOS_DURATION_MS,
      disable: prefersReducedMotion,
      once: true,
      offset: 48,
      easing: 'ease-out-cubic',
    })

    const refreshTimer = window.setTimeout(() => {
      Aos.refreshHard()
    }, 50)

    return () => window.clearTimeout(refreshTimer)
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />
        </Head>
        <div className={`app ${roboto.className} ${displayFont.variable}`}>
          <PageAtmosphere firefliesCount={FIREFLIES_COUNT} />
          <Component {...pageProps} />
        </div>
      </ErrorBoundary>
    </I18nextProvider>
  )
}
