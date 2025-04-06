import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Router } from 'next/router'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: "/ingest",
      ui_host: "https://eu.posthog.com",
      loaded: (posthogInstance) => {
        if (process.env.NODE_ENV === "development") posthogInstance.debug()
      },
    })

    const handleRouteChange = () => posthog?.capture("$pageview")
    Router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [])

  return (
    <PostHogProvider client={posthog}>
      <Component {...pageProps} />
    </PostHogProvider>
  )
}

export default MyApp
