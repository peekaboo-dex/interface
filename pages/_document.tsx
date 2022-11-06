import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang={'en'} dir={'ltr'}>
        <Head>
          <link
            rel="preload"
            href="/fonts/monoregular/favoritmono-regular-webfont.woff2"
            as="font"
            type="font/woff"
            crossOrigin={'true'}
          />
          <link
            rel="preload"
            href="/fonts/extendedregular/favoritextended-regular-webfont.woff2"
            as="font"
            type="font/woff"
            crossOrigin={'true'}
          />
          <link
            rel="preload"
            href="/fonts/regular/favorit-regular-webfont.woff2"
            as="font"
            type="font/woff"
            crossOrigin={'true'}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
