import { hexlify } from '@ethersproject/bytes'
import { ExternalProvider, JsonRpcProvider, Provider } from '@ethersproject/providers'

const MAINNET_CHAIN_ID = 1
const GOERLI_CHAIN_ID = 5

const CHAIN_IDS = {
  MAINNET: MAINNET_CHAIN_ID,
  GOERLI: GOERLI_CHAIN_ID,
}

const SUPPORTED_CHAINS = [GOERLI_CHAIN_ID]

export { SUPPORTED_CHAINS }

export interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}

const getChainLabel = (chainId: number) => {
  switch (chainId) {
    default:
      return `Chain ${chainId.toString(10)}`
  }
}

const DEFAULT_CHAIN_ID = CHAIN_IDS.GOERLI

export { CHAIN_IDS, DEFAULT_CHAIN_ID, getChainLabel }
