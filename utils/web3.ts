import dayjs from 'dayjs'
import { CHAIN_IDS, DEFAULT_CHAIN_ID } from './chain'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

// https://day.js.org/docs/en/plugin/duration
dayjs.extend(duration)
// https://day.js.org/docs/en/plugin/relative-time
dayjs.extend(relativeTime)

// To use:
// dayjs.duration(1, "minutes").humanize(); // a minute

export const getShortenedAddress = (address: string, start: number = 6, end: number = 4) => {
  const shortenedAddress = `${address.slice(0, start)}...${address.slice(-1 * end)}`
  return shortenedAddress
}

export const getEtherscanRootUrlForChain = (chainId: number = DEFAULT_CHAIN_ID) => {
  switch (chainId) {
    case CHAIN_IDS.GOERLI:
      return 'https://goerli.etherscan.io'
    case CHAIN_IDS.MAINNET:
    default:
      return 'https://etherscan.io'
  }
}

export const getEtherscanLinkFromTxHash = (txHash: string, chainId: number) => {
  if (!txHash) {
    return undefined
  }
  const etherscanRoot = getEtherscanRootUrlForChain(chainId)
  const normalizedHash = txHash.replace(/-.*/g, '')
  const etherscanLink = `${etherscanRoot}/tx/${normalizedHash}`
  return etherscanLink
}

export const getEtherscanLinkForAccount = (account: string, chainId: number) => {
  if (!account) {
    return undefined
  }
  const etherscanRoot = getEtherscanRootUrlForChain(chainId)
  const normalizedAccount = account.replace(/-.*/g, '')
  const etherscanLink = `${etherscanRoot}/address/${normalizedAccount}`
  return etherscanLink
}

export const calculateTimeUntilBlock = (
  currentBlock: number,
  destinationBlock: number,
  blockTimeInSeconds: number = 14 * 1000,
  from = new Date(),
) => {
  const numberOfBlocksUntilDesiredBlock = Math.max(destinationBlock - currentBlock, 0)
  const secondsUntilDesiredBlock = numberOfBlocksUntilDesiredBlock * blockTimeInSeconds

  const timeLength = dayjs.duration(secondsUntilDesiredBlock, 'minutes')
  return timeLength
  // const estimatedDateOfDesiredBlock = dayjs().add(secondsUntilDesiredBlock, 'second')
  // return estimatedDateOfDesiredBlock;
}

export const calculateTimeFromBlockLength = (
  numberOfBlocksToWait: number,
  blockTimeInSeconds: number = 14 * 1000,
) => {
  const secondsUntilDesiredBlock = numberOfBlocksToWait * blockTimeInSeconds
  const timeLength = dayjs.duration(secondsUntilDesiredBlock, 'minutes')
  return timeLength
}
