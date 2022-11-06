import { $fetch } from 'ohmyfetch'
import useSWR from 'swr'
import type { Fetcher } from 'swr/dist/types'

const MAINNET_CHAIN_ID = 1
const KOVAN_CHAIN_ID = 42
const RINKEBY_CHAIN_ID = 4
const ROPSTEN_CHAIN_ID = 3
const GOERLI_CHAIN_ID = 5

const CHAIN_IDS = {
  MAINNET: MAINNET_CHAIN_ID,
  KOVAN: KOVAN_CHAIN_ID,
  RINKEBY: RINKEBY_CHAIN_ID,
  ROPSTEN: ROPSTEN_CHAIN_ID,
  GOERLI: GOERLI_CHAIN_ID,
}

export const getRpcUrlForChain = (chainId: string | number): string => {
  switch (parseInt(chainId.toString(10), 10)) {
    case CHAIN_IDS.GOERLI:
      return 'https://eth-goerli.g.alchemy.com/v2/fzfoTAzE9tNcmS6Ip6k9iIW0yXoHC2WW'
    case CHAIN_IDS.MAINNET:
      return 'https://eth-mainnet.g.alchemy.com/v2/78FpeWT_I1h9utpbdDPcHxglzb--wIJ0'
    case CHAIN_IDS.RINKEBY:
      return 'https://eth-rinkeby.alchemyapi.io/v2/dH-CZ9rd8Lz0u4xjDyNQcgPWoZJgU_k4'
    default:
      throw new Error(`No RPC URL found for chainID ${chainId}`)
  }
}

// alchemy
interface NftMetadata {
  image?: string
  attributes?: Array<Record<string, any>>
  name: string
  revealed: boolean
}
interface TokenUri {
  raw: string
  gateway: string
}
interface NftMedia {
  uri?: TokenUri
}
interface NftContract {
  address: string
}
interface NftId {
  tokenId: string
  tokenMetadata?: NftTokenMetadata
}
interface NftTokenMetadata {
  tokenType: 'ERC721' | 'ERC1155'
}

export interface NftDataWithMetadataFromAlchemy {
  contract: NftContract
  id: NftId
  title: string
  description: string
  tokenUri?: TokenUri
  media?: NftMedia[]
  metadata?: NftMetadata
  timeLastUpdated: string
}

// alchemy getnfts for wallet
export interface NftDataFromAlchemy extends BaseNftDataFromAlchemy {
  title: string
  description: string
  tokenUri?: TokenUri
  media?: NftMedia[]
  metadata?: NftMetadata
  timeLastUpdated: string
  error?: string
}
export interface BaseNftDataFromAlchemy {
  contract: NftContract
  id: NftId
}

// https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/getnfts#returns
export interface GetNftsBalanceFromAlchemyResponse {
  ownedNfts: NftDataFromAlchemy[]
  pageKey?: string
  totalCount: number
  error?: string
  blockHash?: string
}

const fetchNftsOwnedByContractAddress = async (
  walletAddress: string,
  contractAddress: string | string[] | null,
  chainId: string,
) => {
  const rpcUrl = getRpcUrlForChain(chainId)
  if (!rpcUrl) {
    console.warn(`No RPC Url found for chain ${chainId}`)
    return null
  }

  let contractAddressFragment = ''
  if (contractAddress === null) {
    //
  } else {
    contractAddressFragment = Array.isArray(contractAddress)
      ? contractAddress.map((address) => `contractAddresses[]=${address}`).join('&')
      : `contractAddresses[]=${contractAddress}`
  }
  const ownedNftsResponse = await $fetch<GetNftsBalanceFromAlchemyResponse>(
    `${rpcUrl}/getNFTs?owner=${walletAddress}&${contractAddressFragment}`,
  )

  return ownedNftsResponse
}

const useNftsInWalletByCollection = (
  walletAddress: string | undefined,
  collectionAddress: string | string[] | undefined | null,
  chainId: string | undefined,
  swrConfigOverrides?: Fetcher<GetNftsBalanceFromAlchemyResponse> | undefined,
) => {
  const hasDataToLookup = !!walletAddress && collectionAddress !== undefined && !!chainId

  const swrData = useSWR(
    hasDataToLookup ? [walletAddress, collectionAddress, chainId, 'alchemy-nft-balance'] : null,
    fetchNftsOwnedByContractAddress,
    {
      ...swrConfigOverrides,
    },
  )

  return swrData
}

// const usePagesInWallet = (
//   walletAddress: string | undefined,
//   collectionAddress: string | undefined,
//   chainId: string | undefined,
//   swrConfigOverrides?: Fetcher<GetNftsBalanceFromAlchemyResponse> | undefined,
// ) => {
//   const hasDeps = !!collectionAddress && !!chainId
//   const swrData = useSWR(
//     hasDeps ? [walletAddress, collectionAddress, chainId, 'alchemy-nft-pages-balance'] : null,
//     fetchNftsOwnedByContractAddress,
//     {
//       ...swrConfigOverrides,
//     },
//   )

//   return swrData
// }

export { useNftsInWalletByCollection }
