import { useTrail, animated } from '@react-spring/web'
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
  AuctionPuzzleSolvedEvent,
  BidCommittedEvent,
  BidRevealedEvent,
  RefundEvent,
} from '../../contracts/Exchange'

import { Network, Alchemy } from 'alchemy-sdk'
import { useAuctionStateStore } from '../../stores/useAuctionState'

const settings = {
  apiKey: 'KiGcPuDovdjrKoIDFWcY7ejSc801oQXL', // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
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

export default function HomePage() {
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<string | null>(null)
  const [selectedTokenId, setSelectedTokenId] = useState<number | null>(null)
  const [selectedNft, setSelectedNft] = useState<NftDataFromAlchemy | null>(null)

  const router = useRouter()

  const account = useAccount()

  const walletAddress = account.address

  const nftsQuery = useNftsInWalletByCollection(
    walletAddress,
    PARADIGM_TEST_NFT_CONTRACT_ADDRESS,
    DEFAULT_CHAIN_ID.toString(),
  )
  // console.log('nfts', nfts.data)

  const nfts = nftsQuery.data?.ownedNfts
  useEffect(() => {
    const nftToAuction = first(nfts)
    if (!nftToAuction) {
      return
    }
    setSelectedTokenId(parseInt(nftToAuction.id.tokenId, 16))
    setSelectedTokenAddress(nftToAuction.contract.address)
    setSelectedNft(nftToAuction)
  }, [nfts])
  const chainId = CHAIN_IDS.GOERLI

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

  const auctionId = router?.query.auctionId?.toString()

  const erc721Contract = selectedTokenAddress
    ? ERC721__factory.connect(selectedTokenAddress, provider)
    : undefined

  const isNftApprovedQuery = useSmartContractReadCall(erc721Contract, 'isApprovedForAll', {
    callArgs: [walletAddress!, EXCHANGE_CONTRACT_ADDRESS_GOERLI],
    enabled: !!walletAddress,
  })

  const approveNftMutation = useSmartContractTransaction(
    erc721Contract,
    'setApprovalForAll',
    signer!,
  )

  const handleApproveNft = async () => {
    const res = await approveNftMutation.mutateAsync([EXCHANGE_CONTRACT_ADDRESS_GOERLI, true])
  }

  const auctionData = useSmartContractReadCall(realExchangeContract, 'auctions', {
    callArgs: [auctionId!],
    enabled: auctionId !== undefined,
  })

  const auctionCreatedEvent =
    realExchangeContract.interface.events[
      'AuctionCreated(uint256,address,address,uint256,uint256,bytes)'
    ]
  const auctionPuzzleSolvedEvent =
    realExchangeContract.interface.events['AuctionPuzzleSolved(uint256,uint256,uint256,uint256)']
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

  const handleAuctionCreated = useAuctionStateStore((s) => s.handleAuctionCreatedEvent)
  const handleBidComitted = useAuctionStateStore((s) => s.handleBidComittedEvent)
  const handleAuctionFinalized = useAuctionStateStore((s) => s.handleAuctionFinalized)
  const handleAuctionPuzzleSolved = useAuctionStateStore((s) => s.handleAuctionPuzzleSolved)
  const handleBidRevealed = useAuctionStateStore((s) => s.handleBidRevealed)

  const handleExchangeEventLog = (log: any) => {
    console.log('EVENT:txn', log)

    const parsedLogEvent = realExchangeContract.interface.parseLog(log)

    const eventName = parsedLogEvent.name

    switch (eventName) {
      case 'AuctionCreated':
        const auctionCreatedEvent = parsedLogEvent as unknown as AuctionCreatedEvent
        const auctionIdCreated = auctionCreatedEvent.args.auctionId
        const auctioneer = auctionCreatedEvent.args.auctioneer
        const publicKey = auctionCreatedEvent.args.publicKey
        const puzzle = auctionCreatedEvent.args.puzzle
        const tokenAddress = auctionCreatedEvent.args.tokenAddress
        const tokenId = auctionCreatedEvent.args.tokenId
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
      case 'AuctionPuzzleSolved':
        const auctionPuzzleSolvedEvent = parsedLogEvent as unknown as AuctionPuzzleSolvedEvent
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

  const [bidCommitedEvents, setBidCommittedEvents] = useState<BidCommittedEvent[] | null>(null)

  useEffect(() => {
    const getLogsAsync = async () => {
      // realExchangeContract.on({
      //   address: EXCHANGE_CONTRACT_ADDRESS_GOERLI,
      //   topics: [topics],
      // }, (txn) => {
      //   console.log('contratxn', txn)
      // })
      // provider.on(, (txn) => {
      // })
      //  const pulledLogs = await provider.getLogs({
      //     fromBlock: fromBlock,
      //     toBlock: 'latest',
      //     address: EXCHANGE_CONTRACT_ADDRESS_GOERLI,
      //     // nested arr to OR (otherwise its an AND if you flatten -- https://docs.ethers.io/v5/concepts/events/)
      //     topics: [topics],
      //   })
      //   const parsedLogsTuple: Array<readonly [LogDescription, Log]> = pulledLogs.map((originalLog) => {
      //     const parsedLogDescription = realExchangeContract.interface.parseLog(originalLog)
      //     return [parsedLogDescription, originalLog] as const
      //   })
      //   parsedLogsTuple.map(([parsedLog, originalLog]) => {
      //     const bidCommittedLog = parsedLog as unknown as BidCommittedEvent
      //     const [auctionId, bidder, sealedBid, ethSent] = bidCommittedLog.args
      //   })
    }

    // getLogsAsync()
  }, [])

  // useEffect(() => {

  //   const doAsync = async () => {

  //     const bid = await realExchangeContract.callStatic.revealBid(auctionId, bidder)

  //   }

  // }, [])

  // const revealBidData = useSmartContractReadCall(realExchangeContract, 'revealBid', {
  //   callArgs: [auctionId!, bidderAddress],
  //   enabled: auctionId !== undefined
  // })

  const handleCreateAuction = async () => {
    const tokenAddress = selectedTokenAddress
    const tokenId = selectedTokenId

    if (!tokenAddress || !tokenId) {
      return
    }
    const publicKey =
      '43956721711573782677826588347821892743637958973121373397379439265512945066361'
    const puzzle =
      '0x374437516c1f12828b0c822d4f131dbe0db9126f253d053c30851faa6b43dd062625ded71f9d26205c5c9e803c400d97ab882b7ca645e736708298645d4ecd97142ceee9e89a612e3b1105bee34d0d8a073b1f23c219d5a447512497a4347307'

    const result = await createAuctionMutation.mutateAsync([
      tokenAddress,
      tokenId,
      publicKey,
      puzzle,
    ])

    const events = result?.events
    const argsOfFirstEvent = events?.[0].args
  }

  const trail = useTrail(4, {
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 8 },
  })

  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (!videoRef.current) {
      return
    }
    videoRef.current.playbackRate = 0.9
  }, [])

  useEffect(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  const { breakpoints } = useTheme()
  const windowWidth = useWindowWidth()
  const isScreenSmall = windowWidth <= breakpoints.upToMedium

  return (
    <>
      <link
        rel="preload"
        as="video"
        href="https://res.cloudinary.com/do5meyjh8/video/upload/v1665627174/lemma_2_pre5hu.mov"
      />
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/do5meyjh8/image/upload/v1665627353/noise_fzpnt5.png"
      />

      <PageWrapper blur={false}>
        <HeaderSpace style={{ height: 100 }} />

        <div>
          <AniamtedBelowFoldWrapper style={{ padding: '0 16px', ...trail[2] }}>
            <div>
              <div>{selectedNft?.metadata?.name}</div>
              <div>{selectedNft?.id.tokenId ? parseInt(selectedNft?.id.tokenId) : ''}</div>
              <div>{selectedNft?.id.tokenMetadata?.tokenType}</div>

              <div>
                <img height={200} width={200} src={selectedNft?.metadata?.image} />
              </div>

              <div>
                <PrimaryButton onPress={handleApproveNft}>Approve</PrimaryButton>
                <PrimaryButton onPress={handleCreateAuction}>Create Auction</PrimaryButton>
              </div>
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
          <HalfAndHalfWrapper style={{ marginBottom: 40, maxWidth: 1080, width: '100%' }}>
            <HalfAndHalfWrapperWithContent>
              <HalfContentWrapper>
                <HalfTitle>
                  Earn yield with
                  <br />
                  basis trading
                </HalfTitle>
                <HalfDescription>
                  Lend out assets to long traders & earn sustainable, USD denominated yield
                </HalfDescription>
                <div style={{ width: 128 }}>
                  <Link passHref={true} href={'/'}>
                    <PillButton elementType={'a'} mode={'light'}>
                      Start earning
                    </PillButton>
                  </Link>
                </div>
              </HalfContentWrapper>
            </HalfAndHalfWrapperWithContent>
            <HalfWrapper style={{ position: 'relative', minHeight: 360, width: '100%' }}>
              <Image alt={'lemma illustration'} layout={'fill'} src={'/images/lemma-brand-1.png'} />
            </HalfWrapper>
          </HalfAndHalfWrapper>

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
