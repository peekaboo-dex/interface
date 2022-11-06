// @ts-check
/** @type {import('next').NextConfig} */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function getConfig(config) {
  return config
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, strixpPrefix,
  //   urlPrefix, include, ignore
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
const nextConfig = getConfig({
  experimental: {},
  productionBrowserSourceMaps: false,
  // https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['assets.coingecko.com'],
  },
  /**
   * Dynamic configuration available for the browser and server.
   * Note: requires `ssr: true` or a `getInitialProps` in `_app.tsx`
   * @link https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
   */
  //   publicRuntimeConfig: {
  //     NODE_ENV: env.NODE_ENV,
  //   },
})

module.exports = nextConfig
