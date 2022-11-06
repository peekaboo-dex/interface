import Decimal from 'decimal.js-light'

export const BASE_TEN = 10

export const toUnitAmount = (amount: Decimal, decimals: number) => {
  const unit = new Decimal(BASE_TEN).pow(decimals)

  const unitAmount = amount.dividedBy(unit)
  const hasDecimals = unit.decimalPlaces() !== 0
  if (hasDecimals) {
    throw new Error(`Invalid unit amount: ${amount.toString()}, incorrect decimals ${decimals}`)
  }
  return unitAmount
}

export const toBaseUnitAmount = (amount: Decimal, decimals: number): Decimal => {
  const unit = new Decimal(BASE_TEN).pow(decimals)
  const baseUnitAmount = unit.times(amount)
  const hasDecimals = baseUnitAmount.decimalPlaces() !== 0
  if (hasDecimals) {
    throw new Error(`Invalid unit amount: ${amount.toString()} - Too many decimal places`)
  }
  return baseUnitAmount
}

export const toNearestBaseUnitAmount = (amount: Decimal, decimals: number): Decimal => {
  const unit = new Decimal(BASE_TEN).pow(decimals)
  const baseUnitAmount = unit.times(amount)
  const nearestBaseUnitAmount = baseUnitAmount.toDecimalPlaces(0)
  return nearestBaseUnitAmount
}

export const toBaseUnitAmountSafe = (
  amount?: Decimal | string | number,
  decimals?: Decimal | string | number,
): Decimal | undefined => {
  if (amount === undefined) {
    return undefined
  }
  if (decimals === undefined) {
    return undefined
  }
  return toBaseUnitAmount(new Decimal(amount), new Decimal(decimals).toNumber())
}

// Easier to work with if values can be undefined
export const convertRawAmountToDecimalSafe = (
  value?: Decimal | string | number,
  decimals?: Decimal | string | number,
): Decimal | undefined => {
  if (value === undefined) {
    return undefined
  }
  if (decimals === undefined) {
    return undefined
  }
  return new Decimal(value).dividedBy(new Decimal(10).pow(new Decimal(decimals)))
}
