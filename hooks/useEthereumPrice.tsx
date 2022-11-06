import useSWR from 'swr'

interface PriceData {
  usd: number
}

export interface Token {
  symbol: string
  name: string
  decimals: number
  chainId: number
  address: string
  logoURI: string
}

interface CryptoUsdPricesCoingeckoResponse {
  'aave': PriceData
  'wrapped-bitcoin': PriceData
  'ethereum': PriceData
  'curve-dao-token': PriceData
  'usd-coin': PriceData
  'chainlink': PriceData
  'perpetual-protocol': PriceData
}

// https://api.coingecko.com/api/v3/simple/price?ids=ethereum,curve-dao-token,perpetual-protocol,usd-coin,wrapped-bitcoin,chainlink,aave&vs_currencies=usd
const fetchCryptoPricesInUsd = async () => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,curve-dao-token,perpetual-protocol,usd-coin,wrapped-bitcoin,chainlink,aave&vs_currencies=usd',
  )
  const resJson: CryptoUsdPricesCoingeckoResponse = await res.json()
  return resJson
}

const CRYPTO_USD_PRICE_SWR_FETCH_KEY = 'crypto-price-usd'

const useCryptoUsdPrices = () => {
  const cryptoPriceInUsdRes = useSWR<CryptoUsdPricesCoingeckoResponse>(
    CRYPTO_USD_PRICE_SWR_FETCH_KEY,
    fetchCryptoPricesInUsd,
    {
      refreshInterval: 60 * 1000,
    },
  )

  return cryptoPriceInUsdRes
}

const useUsdPriceOfToken = (token: Token | undefined | null) => {
  const allCryptoPricesQuery = useCryptoUsdPrices()

  const cryptoPrices = allCryptoPricesQuery.data

  if (!token) {
    return undefined
  }

  switch (token?.symbol.toUpperCase()) {
    case 'USDC':
    case 'USDL':
      return cryptoPrices?.['usd-coin'].usd
    case 'AAVE':
      return cryptoPrices?.aave.usd
    case 'LINK':
      return cryptoPrices?.chainlink.usd
    case 'CRV':
      return cryptoPrices?.['curve-dao-token'].usd
    case 'ETH':
    case 'WETH':
    case 'LETH':
      return cryptoPrices?.ethereum.usd
    case 'PERP':
      return cryptoPrices?.['perpetual-protocol'].usd
    case 'WBTC':
      return cryptoPrices?.['wrapped-bitcoin'].usd
    default:
      throw new Error(`Unknown token ${token?.symbol}`)
  }
}

export { useCryptoUsdPrices, useUsdPriceOfToken }
