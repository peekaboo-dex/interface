/**
 * Default formatters
 */

import { BigNumber } from 'ethers'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const currencyFormatterNoDecimals = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

const decimalFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  maximumFractionDigits: 6,
  minimumFractionDigits: 0,
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
})

interface FormatLocaleNumberArgs {
  number: number | BigNumber
  locale: string | null | undefined
  options?: Intl.NumberFormatOptions
  sigFigs?: number
  fixedDecimals?: number
}

const DEFAULT_LOCALE = 'en-US'
const SUPPORTED_LOCALES = ['en-US']

function formatLocaleNumber({
  number,
  sigFigs,
  fixedDecimals,
  locale = 'en-US',
  options = {},
}: FormatLocaleNumberArgs): string {
  let localeArg: string | string[]
  if (!locale || (locale && !SUPPORTED_LOCALES.includes(locale))) {
    localeArg = DEFAULT_LOCALE
  } else {
    localeArg = [locale, DEFAULT_LOCALE]
  }
  options.minimumFractionDigits = options.minimumFractionDigits || fixedDecimals
  options.maximumFractionDigits = options.maximumFractionDigits || fixedDecimals

  // Fixed decimals should override significant figures.
  options.maximumSignificantDigits =
    options.maximumSignificantDigits || fixedDecimals ? undefined : sigFigs

  let numberString: number
  if (typeof number === 'number') {
    numberString = fixedDecimals ? parseFloat(number.toFixed(fixedDecimals)) : number
  } else {
    throw new Error('only number type')
    // const baseString = parseFloat(number.toSignificant(sigFigs))
    // numberString = fixedDecimals ? parseFloat(baseString.toFixed(fixedDecimals)) : baseString
  }

  return numberString.toLocaleString(localeArg, options)
}

export {
  currencyFormatter,
  decimalFormatter,
  percentFormatter,
  currencyFormatterNoDecimals,
  formatLocaleNumber,
}
