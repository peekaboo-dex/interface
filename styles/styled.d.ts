import { FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'
//   import { Styles } from 'react-modal';

export type Color = string
export interface Colors {
  // base
  white: Color
  black: Color
  offWhite: Color
  blackPure: Color

  // mediumGray: Color
  lightGray: Color
  lightestGray: Color
  darkGray: Color
  bgGray: Color

  primary: Color
  secondary: Color

  red: Color
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    grids: Grids

    breakpoints: {
      upToExtraSmall: number
      upToSmall: number
      upToMedium: number
      upToLarge: number
      upToExtraLarge: number
    }

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>
      upToSmall: ThemedCssFunction<DefaultTheme>
      upToMedium: ThemedCssFunction<DefaultTheme>
      upToLarge: ThemedCssFunction<DefaultTheme>
      upToExtraLarge: ThemedCssFunction<DefaultTheme>
    }

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation
    flexRowNoWrap: FlattenSimpleInterpolation

    //   modalStyle: Styles;
  }
}
