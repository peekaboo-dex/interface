import { useTrail, animated, useTransition, config } from '@react-spring/web'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Footer } from '../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

import { HeaderSpace, PageWrapper } from '../../components/layout/Common'
import { PillButton } from '../../components/PillButton'
import { ExternalLink } from '../../components/Link'
import { ROUTES } from '../../utils/route'
import { useWindowWidth } from '../../hooks/useWindow'
import { StyledNewButton } from '../../components/ConnectWalletButton'
import { useRouter } from 'next/router'
import { Spacer } from '../../components/Spacer'
import { PrimaryButton } from '../../components/PrimaryButton'
import {
  DEFAULT_CHAIN_ID,
  DOCS_URL,
  EXCHANGE_CONTRACT_ADDRESS_GOERLI,
  PARADIGM_TEST_NFT_CONTRACT_ADDRESS,
} from '../../config'
import { useAccount, useBlockNumber, useProvider, useSigner } from 'wagmi'
import { NftDataFromAlchemy, useNftsInWalletByCollection } from '../../hooks/useNftsInWallet'
import { CHAIN_IDS } from '../../utils/chain'
import { first } from 'lodash'
import { ERC721__factory, IExchange__factory } from '../../contracts'
import { useSmartContractTransaction } from '../../hooks/react-query-typechain/useSmartContractTransaction'
import { useSmartContractReadCall } from '../../hooks/react-query-typechain/useSmartContractReadCall'
import { Exchange__factory } from '../../contracts/factories/Exchange__factory'
import { LogDescription } from '@ethersproject/abi'
import { Log } from '@ethersproject/providers'
import {
  AuctionCreatedEvent,
  AuctionFinalizedEvent,
  AuctionClosedEvent,
  // AuctionPuzzleSolvedEvent,
  BidCommittedEvent,
  BidRevealedEvent,
  RefundEvent,
} from '../../contracts/Exchange'

import { Network, Alchemy } from 'alchemy-sdk'
import { useAuctionStateStore } from '../../stores/useAuctionState'
import Decimal from 'decimal.js-light'
// import { BigNumber } from '@ethersproject/bignumber'
import { getShortenedAddress } from '../../utils/web3'
import { StatusIcon } from '../../components/StatusIcon'
import { StatusOfflineIcon } from '@heroicons/react/solid'
import { SpinnerIcon, ThickSpinnerIcon } from '../../components/Spinner'

import { BigNumber } from 'bignumber.js'
/**
 * 
21089476189734747060043434994253392989964361791723356428757238220845226767513
p: 196678590373864546134095295684411601219
q: 210485052613922587915193427777797082011
d: 20563773862567319768830793269659125851152488070937910911775755734171690101603
 * 
 */

const settings = {
  apiKey: 'KiGcPuDovdjrKoIDFWcY7ejSc801oQXL', // Replace with your Alchemy API Key.
  network: Network.OPT_GOERLI, // Replace with your network.
}

const alchemy = new Alchemy(settings)

const Title = styled.h1`
  font-family: 'extended-regular';
  font-style: normal;
  /* font-weight: 500; */
  /* font-size: 96px; */
  /* line-height: 100%; */
  text-align: center;
  /* color: #ffffff; */
  text-shadow: 0px 0px 30px rgba(164, 142, 123, 0.7);

  position: relative;
  font-size: 92px;
  font-weight: 700;
  line-height: 100%;
  z-index: 10;
  color: black;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 64px;
  `}

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 36px;
  `}
`
const AnimatedTitle = animated(Title)

const HalfAndHalfWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row-reverse;
  background: #131419;
  border-radius: 20px;
  width: 100%;
  overflow: hidden;

  max-height: 360px;
  min-height: 360px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: flex;
    flex-direction: column;
    max-height: 800px;
  `}
`

const HalfContentWrapper = styled.div`
  padding: 60px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 36px;
  `}
`

const HalfWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 360px;
  max-height: 360px;
  min-height: 360px;
  overflow: hidden;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    height: 100%;
  `}
`

const HalfAndHalfWrapperWithContent = styled(HalfWrapper)`
  align-items: center;
`

const HalfTitle = styled.div`
  font-family: 'extended-regular';
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 110%;
  color: black;
  margin-bottom: 8px;
`

const HalfDescription = styled.div`
  font-family: 'favorit-regular';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 24px;

  max-width: 360px;
  /* or 24px */

  color: #797c87;
`

const HalfButtonContainer = styled.div``

const BelowFoldSubtitle = styled.div`
  font-family: 'extended-regular';
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  font-size: 20px;
  `}
  line-height: 150%;
  color: black;
`

const BelowFoldWrapper = styled.div`
  position: relative;
  z-index: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`
const AniamtedBelowFoldWrapper = animated(BelowFoldWrapper)

const StyledExternalLink = styled(ExternalLink)`
  font-family: 'favorit-regular';
  margin-left: 4px;
  text-decoration: none;
  font-size: 24px;
  line-height: 150%;
  line-height: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  font-size: 24px;
  line-height: 150%;
  margin-left: 0px;
  `}
  color: #8C6649;
  cursor: pointer;
  :hover {
    text-decoration: underline;
    color: #8c6649;
  }
`

const GridBelowFold = styled.div`
  /* display: grid; */
  /* grid-template-columns:  1fr; */
  /* grid-template-rows:  1fr; */
  /* grid-column-gap: 80px; */
  /* grid-row-gap: 164px; */
`

// const GridLeftTop = styled.div`
//   grid-area: 1 / 1 / 1 / 1;
// `

const GridRightTop = styled.div`
  grid-area: 1 / 2 / 2 / 6;
`
// const GridLeftBody = styled.div`
//   grid-area: 2 / 1 / 3 / 2;
// `
const GridRightBody = styled.div`
  grid-area: 2 / 2 / 3 / 6;

  ${({ theme }) => theme.mediaWidth.upToMedium`
  display: flex;
  flex-direction: column;
  align-items: center;
  `}
`

const randomId = Math.floor(Math.random() * 1000) + 1

export default function HomePage() {
  const auctionStore = useAuctionStateStore()

  const hasActiveAuction = !!auctionStore.activeAuctionId

  const chainId = DEFAULT_CHAIN_ID

  const [selectedNft, setSelectedNft] = useState<NftDataFromAlchemy | null>(null)

  const router = useRouter()

  const account = useAccount()

  const walletAddress = account.address

  const nftsQuery = useNftsInWalletByCollection(
    walletAddress,
    PARADIGM_TEST_NFT_CONTRACT_ADDRESS,
    DEFAULT_CHAIN_ID.toString(),
  )

  const provider = useProvider({ chainId })

  const { data: signer } = useSigner()

  // const exchangeContract = IExchange__factory.connect(EXCHANGE_CONTRACT_ADDRESS_GOERLI, provider)
  const realExchangeContract = useMemo(() => {
    return Exchange__factory.connect(EXCHANGE_CONTRACT_ADDRESS_GOERLI, provider)
  }, [provider])

  const createAuctionMutation = useSmartContractTransaction(
    realExchangeContract,
    'createAuction',
    signer!,
  )

  const auctionCreatedEvent =
    realExchangeContract.interface.events[
      'AuctionCreated(uint256,address,address,uint256,uint256,bytes)'
    ]
  const auctionPuzzleSolvedEvent =
    realExchangeContract.interface.events['AuctionClosed(uint256,uint256,uint256,uint256)']
  const auctionFinalizedEvent =
    realExchangeContract.interface.events['AuctionFinalized(uint256,address,uint256)']
  const bidCommittedEvent =
    realExchangeContract.interface.events['BidCommitted(uint256,address,uint256,uint256)']
  const bidRevealedEvent =
    realExchangeContract.interface.events['BidRevealed(uint256,address,uint256,uint256,bool,bool)']
  const refundEvent = realExchangeContract.interface.events['Refund(uint256,uint256)']

  const topics = [
    realExchangeContract.interface.getEventTopic(auctionCreatedEvent),
    realExchangeContract.interface.getEventTopic(auctionPuzzleSolvedEvent),
    realExchangeContract.interface.getEventTopic(auctionFinalizedEvent),
    realExchangeContract.interface.getEventTopic(bidCommittedEvent),
    realExchangeContract.interface.getEventTopic(bidRevealedEvent),
    realExchangeContract.interface.getEventTopic(refundEvent),
  ]

  const resetAuction = useAuctionStateStore((s) => s.resetAuction)

  const handleAuctionCreated = useAuctionStateStore((s) => s.handleAuctionCreatedEvent)
  const handleBidComitted = useAuctionStateStore((s) => s.handleBidComittedEvent)
  const handleAuctionFinalized = useAuctionStateStore((s) => s.handleAuctionFinalized)
  const handleAuctionPuzzleSolved = useAuctionStateStore((s) => s.handleAuctionPuzzleSolved)
  const handleBidRevealed = useAuctionStateStore((s) => s.handleBidRevealed)

  const handleExchangeEventLog = (log: any) => {
    console.log('Log:unparsed', log)

    const parsedLogEvent = realExchangeContract.interface.parseLog(log)
    const eventName = parsedLogEvent.name
    console.log('Log:parsed', eventName, parsedLogEvent)

    switch (eventName) {
      case 'AuctionCreated':
        const auctionCreatedEvent = parsedLogEvent as unknown as AuctionCreatedEvent
        const auctionIdCreated = auctionCreatedEvent.args.auctionId
        const auctioneer = auctionCreatedEvent.args.auctioneer
        const publicKey = auctionCreatedEvent.args.publicKey
        const puzzle = auctionCreatedEvent.args.puzzle
        const tokenAddress = auctionCreatedEvent.args.tokenAddress
        const tokenId = auctionCreatedEvent.args.tokenId
        resetAuction()
        handleAuctionCreated(auctionIdCreated, auctioneer, publicKey, puzzle, tokenAddress, tokenId)
        break
      case 'BidCommitted':
        const bidCommittedEvent = parsedLogEvent as unknown as BidCommittedEvent
        const auctionIdBidCommitted = bidCommittedEvent.args.auctionId
        const bidderBidComitted = bidCommittedEvent.args.bidder
        const sealedBid = bidCommittedEvent.args.sealedBid
        const ethSent = bidCommittedEvent.args.ethSent
        handleBidComitted(auctionIdBidCommitted, bidderBidComitted, sealedBid, ethSent)
        break
      case 'AuctionClosed':
        const auctionPuzzleSolvedEvent = parsedLogEvent as unknown as AuctionClosedEvent
        const auctionIdPuzzleSolved = auctionPuzzleSolvedEvent.args.auctionId
        const p = auctionPuzzleSolvedEvent.args.p
        const q = auctionPuzzleSolvedEvent.args.q
        const d = auctionPuzzleSolvedEvent.args.d
        handleAuctionPuzzleSolved(auctionIdPuzzleSolved, p, q, d)
        break
      case 'BidRevealed':
        const bidRevealedEvent = parsedLogEvent as unknown as BidRevealedEvent
        const auctionIdBidRevealed = bidRevealedEvent.args.auctionId
        const bidderBidderRevealed = bidRevealedEvent.args.bidder
        const bid = bidRevealedEvent.args.bid
        const obfuscation = bidRevealedEvent.args.obfuscation
        const isCurrentHighestBid = bidRevealedEvent.args.isCurrentHighestBid
        const isValidBid = bidRevealedEvent.args.isValidBid
        handleBidRevealed(
          auctionIdBidRevealed,
          bidderBidderRevealed,
          bid,
          obfuscation,
          isCurrentHighestBid,
          isValidBid,
        )
        break
      case 'AuctionFinalized':
        const auctionFinalizedEvent = parsedLogEvent as unknown as AuctionFinalizedEvent
        const auctionIdFinalized = auctionFinalizedEvent.args.auctionId
        const winner = auctionFinalizedEvent.args.winner
        const winningBid = auctionFinalizedEvent.args.winningBid
        handleAuctionFinalized(auctionIdFinalized, winner, winningBid)
        break
      case 'Refund':
        const refundEvent = parsedLogEvent as unknown as RefundEvent
        const refundAuctionId = refundEvent.args.auctionId
        const amount = refundEvent.args.amount
        break
      default:
        console.log(eventName, parsedLogEvent)
        throw new Error(`Unkown event ${eventName}`)
    }
  }

  useEffect(() => {
    if (!realExchangeContract) {
      return
    }
    const sub = [topics]
    alchemy.ws.on(sub, handleExchangeEventLog)
    return () => {
      // unsubscribe
      alchemy.ws.off(sub, handleExchangeEventLog)
    }
  }, [realExchangeContract])

  const fromBlock = 12345

  const blockNumberQuery = useBlockNumber({
    chainId,
  })

  // const erc721Contract = selectedTokenAddress
  //   ? ERC721__factory.connect(selectedTokenAddress, provider)
  //   : undefined

  // const isNftApprovedQuery = useSmartContractReadCall(erc721Contract, 'isApprovedForAll', {
  //   callArgs: [walletAddress!, EXCHANGE_CONTRACT_ADDRESS_GOERLI],
  //   enabled: !!walletAddress,
  // })

  // const approveNftMutation = useSmartContractTransaction(
  //   erc721Contract,
  //   'setApprovalForAll',
  //   signer!,
  // )

  // const handleApproveNft = async () => {
  //   const res = await approveNftMutation.mutateAsync([EXCHANGE_CONTRACT_ADDRESS_GOERLI, true])
  // }

  // const auctionData = useSmartContractReadCall(realExchangeContract, 'auctions', {
  //   callArgs: [auctionId!],
  //   enabled: auctionId !== undefined,
  // })

  // const [bidCommitedEvents, setBidCommittedEvents] = useState<BidCommittedEvent[] | null>(null)

  // const handleCreateAuction = async () => {
  //   const tokenAddress = selectedTokenAddress
  //   const tokenId = selectedTokenId

  //   if (!tokenAddress || !tokenId) {
  //     return
  //   }
  //   const publicKey =
  //     '43956721711573782677826588347821892743637958973121373397379439265512945066361'
  //   const puzzle =
  //     '0x374437516c1f12828b0c822d4f131dbe0db9126f253d053c30851faa6b43dd062625ded71f9d26205c5c9e803c400d97ab882b7ca645e736708298645d4ecd97142ceee9e89a612e3b1105bee34d0d8a073b1f23c219d5a447512497a4347307'

  //   const result = await createAuctionMutation.mutateAsync([
  //     tokenAddress,
  //     tokenId,
  //     publicKey,
  //     puzzle,
  //   ])

  //   const events = result?.events
  //   const argsOfFirstEvent = events?.[0].args
  // }

  const trail = useTrail(4, {
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 8 },
  })

  useEffect(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  const { breakpoints } = useTheme()
  const windowWidth = useWindowWidth()
  const isScreenSmall = windowWidth <= breakpoints.upToMedium

  const NftName = `Peekaboo Test NFT #${randomId}`
  const collectionName = `Peekaboo Test Collection`

  const [manuallyStarted, setManuallyStarted] = useState<boolean>(false)

  const noBids = auctionStore.bids === undefined || auctionStore.bids.length === 0

  const hasAuctionStartedOnChain = auctionStore.activeAuctionId !== undefined
  const hasAuctionClosed = auctionStore.p !== undefined
  const hasAuctionBeenSolvedAndWinnerDetermined = auctionStore.winner !== undefined

  const waitingForAuctionToOfficiallyStartAfterClickingManualStart =
    manuallyStarted && !hasAuctionStartedOnChain

  const ownerAddress = '0x1eeD19957E0a81AED9a80f09a3CCEaD83Ea6D86b'

  let auctionStatus:
    | 'idle'
    | 'creating-onchain'
    | 'auction-open'
    | 'auction-close'
    | 'auction-settled' = 'idle'
  let auctionStatusLabel: string | null = 'Not for sale'
  if (waitingForAuctionToOfficiallyStartAfterClickingManualStart) {
    auctionStatusLabel = `Creating Auction`
    auctionStatus = 'creating-onchain'
  }
  if (hasAuctionStartedOnChain) {
    auctionStatusLabel = `Auction open`
    auctionStatus = 'auction-open'
  }
  if (hasAuctionClosed) {
    auctionStatusLabel = `Auction closed, calculating winner`
    auctionStatus = 'auction-close'
  }
  if (hasAuctionBeenSolvedAndWinnerDetermined) {
    auctionStatusLabel = `Auction settled, winner revealed`
    auctionStatus = 'auction-settled'
  }

  let DerivedButton = () => {
    if (auctionStatus === 'idle') {
      return (
        <PrimaryButton onPress={() => setManuallyStarted(true)}>Create Blind Auction</PrimaryButton>
      )
    }
    if (auctionStatus === 'creating-onchain') {
      return (
        <PrimaryButton onPress={() => setManuallyStarted(true)}>
          <ThickSpinnerIcon fill={'#ffffff'} />

          {/* <span style={{ display: 'inline-block', lineHeight: '120%'}}>
        Creating Auction 
        </span> */}
        </PrimaryButton>
      )
    }
    return null
  }

  let transitionKey: 'creating' | 'created' = 'creating'
  if (auctionStore.activeAuctionId) {
    transitionKey = 'created'
  }
  const transitions = useTransition(transitionKey, {
    from: {
      opacity: 0,
      y: 10,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: 10,
    },
    key: transitionKey,
    config: config.stiff,
  })

  const values = [42000000, 40003100, 39423453, 3545355].map((x) => x / 1e8)
  const winningBid = values[0]
  return (
    <>
      <PageWrapper blur={false}>
        <HeaderSpace style={{ height: 100 }} />

        <div>
          <AniamtedBelowFoldWrapper style={{ ...trail[2] }}>
            <ContentContainer style={{}}>
              <div>
                <H2>{NftName}</H2>
                <Spacer size={2} />
                <H5>{collectionName}</H5>
                <Spacer size={16} />

                {/* <div
                  style={{
                    fontSize: 16,
                    color: '#595A63',
                    marginBottom: 2,
                  }}
                >
                  Owned by {getShortenedAddress(ownerAddress)}
                </div> */}

                <div
                  style={{
                    position: 'relative',
                    height: 600,
                    width: '100%',
                  }}
                >
                  {transitions((styles, item) => {
                    if (item === 'creating') {
                      return (
                        <AnimatedPositionAbsolute style={styles}>
                          <Spacer size={16} />
                          {<DerivedButton />}
                        </AnimatedPositionAbsolute>
                      )
                    }

                    return (
                      <AnimatedPositionAbsolute style={styles}>
                        <Spacer size={16} />
                        <H3>Auction</H3>
                        <Spacer size={8} />
                        <H4>Status</H4>
                        <Spacer size={4} />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <H5 style={{ marginRight: 12 }}>{auctionStatusLabel}</H5>
                          <div>{auctionStatus === 'auction-open' && <StatusIcon />}</div>
                        </div>
                        <Spacer size={16} />

                        <H4>Bids</H4>
                        <Spacer size={4} />
                        {noBids && <div>No bids yet</div>}
                        <div style={{ width: '90%' }}>
                          {!noBids &&
                            auctionStore.bids?.map((bid, i) => {
                              const showIsWinner = auctionStatus === 'auction-settled' && i === 0
                              return (
                                <div
                                  key={bid.bidder}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                  }}
                                >
                                  <div>{getShortenedAddress(bid.bidder)}</div>

                                  <div style={{ position: 'relative', fontVariant: 'tabular-nums' }}>
                                    {showIsWinner && (
                                      <div
                                        style={{
                                          position: 'absolute',
                                          right: -20,
                                        }}
                                      >
                                        ✅
                                      </div>
                                    )}
                                    {auctionStatus === 'auction-settled'
                                      ? `${values[i]} ETH`
                                      : `<sealed bid 0x${bid.sealedBid.substring(0, 4)}>`}
                                  </div>
                                </div>
                              )
                            })}
                        </div>

                        {auctionStatus === 'auction-settled' && (
                          <>
                            <Spacer size={16} />

                            <H4>Winner</H4>
                            <Spacer size={4} />
                            <div>Winner: {getShortenedAddress(auctionStore?.winner ?? '')}</div>
                            <div>Winning bid: {winningBid} ETH</div>
                          </>
                        )}
                      </AnimatedPositionAbsolute>
                    )
                  })}
                </div>

                <div>
                  {/* <div
                    style={{
                      borderRadius: '100px',
                      padding: '20px',
                      width: 'fit-content',
                      boxShadow: `0px 16px 32px rgba(0, 0, 0, 0.06), 0px 12px 16px rgba(0, 0, 0, 0.04), 0px 4px 4px rgba(0, 0, 0, 0.03), inset 0px 4px 4px rgba(255, 255, 255, 0.25)`,
                    }}
                  >
                    
                    <div
                      style={{
                        fontSize: 12,
                        color: '#595A63',
                        marginBottom: 2,
                      }}
                    >
                      Owned by
                    </div>
                    <div style={{ fontWeight: 600 }}>{getShortenedAddress(ownerAddress)}</div>
                  </div> */}
                </div>
              </div>
              <div>
                <div
                  style={{
                    border: `8px solid #06283D`,
                    borderRadius: `24px`,
                    height: '100%',
                    maxHeight: 400,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    style={{
                      objectFit: 'cover',
                      height: '100%',
                      width: '100%',
                    }}
                    src={'https://i.imgur.com/W4ScEws.png'}
                  />
                </div>
                <Spacer size={8} />
                <div style={{ textAlign: 'center', fontSize: 16, color: '#595a63' }}>
                  View on OpenSea
                </div>
              </div>
            </ContentContainer>

            <div>
              <div>{selectedNft?.metadata?.name}</div>
              <div>{selectedNft?.id.tokenId ? parseInt(selectedNft?.id.tokenId) : ''}</div>
              <div>{selectedNft?.id.tokenMetadata?.tokenType}</div>
              {/* 
              <div>
                <img height={200} width={200} src={selectedNft?.metadata?.image} />
              </div> */}

              {/* <div>
                <PrimaryButton onPress={handleApproveNft}>Approve</PrimaryButton>
                <PrimaryButton onPress={handleCreateAuction}>Create Auction</PrimaryButton>
              </div> */}
            </div>
          </AniamtedBelowFoldWrapper>
        </div>

        <animated.div
          style={{
            display: 'none',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 16px',
            ...trail[3],
          }}
        >
          <div>
            debug: <StatusIcon />{' '}
          </div>
          {/* <ProgressCircle aria-label="Loading…" isIndeterminate /> */}
          <div>activeAuctionId: {auctionStore.activeAuctionId}</div>
          <div>auctioneer: {getShortenedAddress(auctionStore.auctioneer ?? '')}</div>
          <div>publicKey: {getShortenedAddress(auctionStore.publicKey ?? '')}</div>
          <div>puzzle: {getShortenedAddress(auctionStore.puzzle ?? '')}</div>
          <div>tokenAddress: {getShortenedAddress(auctionStore.tokenAddress ?? '')}</div>
          <div>tokenId: {auctionStore.tokenId}</div>
          <div>bids: {auctionStore.bids?.length}</div>
          <div>
            {auctionStore.bids?.map((bid) => {
              // let maybeRevealAmount: BigNumber | null = null
              // if (
              //   auctionStore.p !== undefined &&
              //   auctionStore.d !== undefined &&
              //   auctionStore.q !== undefined
              // ) {
              //   const sealedBidDecimal = BigNumber.from(bid.sealedBid)
              //   const pDecimal = BigNumber.from(auctionStore.p)
              //   const qDecimal = BigNumber.from(auctionStore.q)
              //   const dDecimal = BigNumber.from(auctionStore.d)

              //   const modVal = pDecimal.mul(qDecimal)
              //   maybeRevealAmount = sealedBidDecimal.pow(auctionStore.d).mod(modVal)
              // }

              return (
                <div key={bid.bidder}>
                  <div>{bid.bidder} -</div>
                  <div>{bid.sealedBid}</div>
                  {/* <div>{maybeRevealAmount?.toString()}</div> */}
                </div>
              )
            })}
          </div>
          <div>p: {auctionStore.p}</div>
          <div>q: {auctionStore.q}</div>
          <div>d: {auctionStore.d}</div>
          <div>revealedBidder: {auctionStore.revealedBidder}</div>
          <div>revealedBid: {auctionStore.revealedBid}</div>
          <div>obfuscation: {auctionStore.obfuscation}</div>
          <div>winner: {auctionStore.winner}</div>
          <div>winningBid: {auctionStore.winningBid}</div>

          {/* <HalfAndHalfWrapper style={{ marginBottom: 80, maxWidth: 1080, width: '100%' }}>
            <HalfWrapper style={{ position: 'relative' }}>
              <Image layout={'fill'} src={'/images/lemma-brand-1.png'} />
            </HalfWrapper>
            <HalfAndHalfWrapperWithContent>
              <HalfContentWrapper>
                <HalfTitle>Title here</HalfTitle>
                <HalfDescription>descirption</HalfDescription>
                <div style={{ width: 128 }}>
                  <Link passHref={true} href={ROUTES.mint}>
                    <PillButton elementType={'a'} mode={'light'}>
                      Mint USDL
                    </PillButton>
                  </Link>
                </div>
              </HalfContentWrapper>
            </HalfAndHalfWrapperWithContent>
          </HalfAndHalfWrapper> */}
        </animated.div>

        <FillSpacer />
        {/* <Footer /> */}
      </PageWrapper>
    </>
  )
}

const PositionAbsolute = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`

const AnimatedPositionAbsolute = animated(PositionAbsolute)

const H4 = styled.h4`
  font-size: 24px;
  font-weight: 600;
`

const H1 = styled.div``

const H2 = styled.div`
  font-size: 48px;
  font-weight: 900;
`

const H3 = styled.div`
  font-size: 36px;
  font-weight: 700;
`

const H5 = styled.h5`
  font-size: 18px;
  font-weight: 500;
  color: #595a63;
`

const ContentContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: calc(1256px + 40px);

  padding: 0 32px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0 16px;
  `}

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 72px;
  grid-row-gap: 0px;
`

const FillSpacer = styled.div`
  display: flex;
  flex: 1;
`

// <div style={{ marginTop: 100, marginBottom: 200 }}>
// <VideoWrapperOuter style={{
//   // height: 1000,
//   width: '100vw',
//   maxHeight: '70vh',
//   marginBottom: 200,

// }}>
//     <VideoContainer>
//       {/* <VideoGradientBottom/>
//       <VideoGradientLeft/>
//       <VideoGradientRight/> */}
//       <VideoContainerVideo
//         loop={true}
//         autoPlay={true}
//         playsInline={true}

//       src={'/videos/home.mp4'} />
//     </VideoContainer>
//     <VideoContent>content goes here</VideoContent>
//   </VideoWrapperOuter>
//     </div>

const RowContainer = styled.div`
  color: black;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 32px;
  margin-bottom: 64px;
  /* display: grid; */
  /* grid-column */

  gap: 60px;
  margin-bottom: 55px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(1fr, auto);
  grid-column-gap: 0px;
  grid-row-gap: 32px;
  margin-bottom: 64px;
  `}
`

const BelowFoldDescriptionTitle = styled.div`
  font-family: 'extended-regular';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 100%;
  margin-bottom: 24px;
  ${({ theme }) => theme.mediaWidth.upToLarge`
font-size: 36px;
  `}

  ${({ theme }) => theme.mediaWidth.upToMedium`
font-size: 28px;
  `}
`

const AnimatedRowContainer = animated(RowContainer)
