import styled, {
  createGlobalStyle,
  DefaultTheme,
  css,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components'
import type { Colors } from './styled'

export const MAX_CONTENT_WIDTH = 1320
export const MAX_CONTENT_WIDTH_PX = '1320px'

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
  upToExtraLarge: 1500,
}

export type AvailableBreakpoints = keyof typeof MEDIA_WIDTHS

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `
  return accumulator
}, {}) as any

const white = '#FFFFFF'
const blackPure = '#000000'

const black = '#0E0F13'

export const colors: Colors = {
  white,
  black,
  blackPure,

  offWhite: '#F4F7FA',
  bgGray: '#F5F5F7',
  lightGray: '#B1B5C2',
  lightestGray: '#E4E7F0',
  darkGray: '#444650',

  // Text
  primary: white,
  secondary: '#888F96',

  red: '#FF6868',
}

export const theme: DefaultTheme = {
  ...colors,

  grids: {
    sm: 8,
    md: 12,
    lg: 24,
  },

  // media queries
  mediaWidth: mediaWidthTemplates,

  breakpoints: MEDIA_WIDTHS,

  // css snippets
  flexColumnNoWrap: css`
    display: flex;
    flex-flow: column nowrap;
  `,
  flexRowNoWrap: css`
    display: flex;
    flex-flow: row nowrap;
  `,

  //   modalStyle: {
  //     content: {
  //       border: 'none',
  //       boxShadow: '0px 2px 6px rgba(31, 34, 38, 0.08), 0px 8px 32px rgba(31, 34, 38, 0.12)',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       height: 'fit-content',
  //       left: 'auto',
  //       right: 'auto',
  //       top: 'auto',
  //       bottom: 'auto',
  //       margin: 'auto 0',
  //       overflow: 'hidden',
  //       position: 'relative',
  //     },
  //     overlay: {
  //       alignItems: 'unset',
  //       background: 'rgba(16, 32, 72, 0.6)',
  //       display: 'flex',
  //       justifyContent: 'center',
  //       overflow: 'auto',
  //       padding: '20px',
  //       zIndex: 12345,
  //     },
  //   },
}
