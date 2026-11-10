import '@/shared/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import ErrorBoundary from '@/shared/ui/error-boundary'
import { KitIconSprite } from '@/shared/ui/kit-icon'
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

    if (prefersReducedMotion) {
      return
    }

    let cancelled = false
    let refreshTimer = 0

    const bootAos = async () => {
      const [{ default: Aos }] = await Promise.all([
        import('aos'),
        import('aos/dist/aos.css'),
      ])

      if (cancelled) {
        return
      }

      Aos.init({
        duration: AOS_DURATION_MS,
        once: true,
        offset: 48,
        easing: 'ease-out-cubic',
      })

      refreshTimer = window.setTimeout(() => {
        if (!cancelled) {
          Aos.refreshHard()
        }
      }, 50)
    }

    void bootAos()

    return () => {
      cancelled = true
      window.clearTimeout(refreshTimer)
    }
  }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />
          <link rel="preload" href="/icons-kit/sprite.svg" as="image" type="image/svg+xml" />
        </Head>
        <div className={`app ${roboto.className} ${displayFont.variable}`}>
          <KitIconSprite />
          <PageAtmosphere firefliesCount={FIREFLIES_COUNT} />
          <Component {...pageProps} />
        </div>
      </ErrorBoundary>
    </I18nextProvider>
  )
}
