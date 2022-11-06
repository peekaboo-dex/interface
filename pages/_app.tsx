import Head from 'next/head'
import App, { AppProps } from 'next/app'
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { OverlayProvider } from '@react-aria/overlays'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import {
  connectorsForWallets,
  RainbowKitProvider,
  lightTheme,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'

import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { NavigationLoadingProgressBar } from '../components/NaviationLoadingProgressBar'
import { Header } from '../components/header/Header'
import { theme } from '../styles/theme'

const DEFAULT_SITE_TITLE = 'Peekaboo'
const DEFAULT_SITE_DESCRIPTION = 'Timelocked Sealed Bid Auctions'

const DEFAULT_CHAIN = chain.goerli

import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

import '../styles/resets.css'
import '../styles/base.css'
import '@rainbow-me/rainbowkit/styles.css'

import { SSRProvider } from '@react-aria/ssr'
import Decimal from 'decimal.js-light'
import { Toaster } from 'react-hot-toast'
import { ROOT_URL_PRODUCTION, RPC_URL } from '../config'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { useIsomorphicLayoutEffect } from '@react-spring/web'

const { chains, provider } = configureChains(
  [chain.optimismGoerli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: RPC_URL,
      }),
    }),
    publicProvider(),
  ],
  // [alchemyProvider({ apiKey: 'a8FN9d6QlTeXkgWU-2__L99JeeX8orqc' }), publicProvider()],
)

const demoAppInfo = {
  appName: 'Peekaboo',
}

const { connectors } = getDefaultWallets({
  appName: `Peekaboo`,
  chains,
})

// const connectors = connectorsForWallets(wallets)

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function LemmaFinanceApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: any }>) {
  const [queryClient] = useState(() => new QueryClient())

  // state = {
  //   error: null,
  // }

  // componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  //   this.setState({ error })

  //   // if (super.componentDidCatch) {
  //   //   super.componentDidCatch(error, errorInfo)
  //   // }
  // }
  useIsomorphicLayoutEffect(() => {
    Decimal.set({ precision: 80, toExpPos: 1000, rounding: 1 })
  }, [])

  // componentDidMount() {
  //   // Ensure decimal-js settings are correct on mount
  //   Decimal.set({ precision: 80, toExpPos: 1000, rounding: 1 })
  // }

  // static getDerivedStateFromError() {
  //   return { error: true }
  // }

  // render() {

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta name="description" content={DEFAULT_SITE_DESCRIPTION} />
      </Head>
      <DefaultSeo
        title={DEFAULT_SITE_TITLE}
        description={DEFAULT_SITE_DESCRIPTION}
        // openGraph={{
        //   type: 'website',
        //   locale: 'en_US',
        //   url: ROOT_URL_PRODUCTION,
        //   title: DEFAULT_SITE_TITLE,
        //   description: DEFAULT_SITE_DESCRIPTION,
        //   site_name: 'Lemma',
        //   images: [
        //     {
        //       url: `${ROOT_URL_PRODUCTION}/images/og/lemma-banner.png`,
        //       width: 1200,
        //       height: 627,
        //       alt: 'Lemma.finance',
        //     },
        //   ],
        // }}
        // twitter={{
        //   handle: '@LemmaFinance',
        //   site: '@LemmaFinance',
        //   cardType: 'summary_large_image',
        // }}
        // additionalMetaTags={[
        //   {
        //     name: 'twitter:image',
        //     content: `${ROOT_URL_PRODUCTION}/images/og/lemma-banner.png`,
        //   },
        //   {
        //     name: 'twitter:url',
        //     content: ROOT_URL_PRODUCTION,
        //   },
        // ]}
      />
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
      <SSRProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <OverlayProvider>
                <WagmiConfig client={wagmiClient}>
                  <RainbowKitProvider
                    theme={lightTheme()}
                    appInfo={demoAppInfo}
                    chains={chains}
                    initialChain={DEFAULT_CHAIN}
                  >
                    <>
                      {/* <ProvidersEffects /> */}
                      {/* <BlockWatcherEffect /> */}
                      {/* <LemmaEffect /> */}
                      {/* <AppStateEffect /> */}
                    </>
                    <Toaster
                      position="top-right"
                      reverseOrder={false}
                      gutter={8}
                      containerClassName=""
                      containerStyle={{}}
                      toastOptions={{
                        // Define default options,
                        className: 'test-toast',
                        // duration: 5000,
                        style: {
                          lineHeight: '150%',
                          // fontFamily; 'favorit-regular',
                          fontSize: 16,
                          background: '#131417',
                          border: '1px solid #C7BADE',
                          color: '#fff',
                          paddingTop: 12,
                          paddingBottom: 12,
                          marginBottom: 32,

                          boxShadow: `0.3px 0.3px 2.2px rgba(0, 0, 0, 0.02), 0.7px 0.8px 5.3px rgba(0, 0, 0, 0.028),
                      1.3px 1.5px 10px rgba(0, 0, 0, 0.035), 2.2px 2.7px 17.9px rgba(0, 0, 0, 0.042),
                      4.2px 5px 33.4px rgba(0, 0, 0, 0.05), 10px 12px 80px rgba(0, 0, 0, 0.07)`,
                        },
                        // Default options for specific types
                        loading: {
                          duration: 1000 * 60,
                        },
                        success: {
                          duration: 10000,
                          theme: {
                            primary: 'green',
                            secondary: 'black',
                          },
                        },
                      }}
                    />
                    <NavigationLoadingProgressBar
                      color={'#C7BADE'}
                      height={2}
                      startPosition={40}
                      stopDelayMs={100}
                    />
                    <Header />
                    <Component {...pageProps} />
                  </RainbowKitProvider>
                </WagmiConfig>
              </OverlayProvider>
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </SSRProvider>
    </>
  )
}
