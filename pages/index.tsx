import { useTrail, animated } from '@react-spring/web'
import React, { useEffect, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Footer } from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { HeaderSpace, PageWrapper } from '../components/layout/Common'
import { PillButton } from '../components/PillButton'
import { ExternalLink } from '../components/Link'
import { ROUTES } from '../utils/route'
import { useWindowWidth } from '../hooks/useWindow'
import { StyledNewButton } from '../components/ConnectWalletButton'
import { useRouter } from 'next/router'
import { Spacer } from '../components/Spacer'
import { PrimaryButton } from '../components/PrimaryButton'
import { DEFAULT_CHAIN_ID, DOCS_URL, EXCHANGE_CONTRACT_ADDRESS_GOERLI, PARADIGM_TEST_NFT_CONTRACT_ADDRESS } from '../config'
import { useAccount, useProvider, useSigner } from 'wagmi'
import { useNftsInWalletByCollection } from '../hooks/useNftsInWallet'
import { CHAIN_IDS } from '../utils/chain'
import { first } from 'lodash'
import { IExchange__factory } from '../contracts'
import { useSmartContractTransaction } from '../hooks/react-query-typechain/useSmartContractTransaction'
import { useSmartContractReadCall } from '../hooks/react-query-typechain/useSmartContractReadCall'

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

  const account = useAccount()

  const walletAddress = account.address

  const nftsQuery = useNftsInWalletByCollection(walletAddress, PARADIGM_TEST_NFT_CONTRACT_ADDRESS, DEFAULT_CHAIN_ID.toString())
  // console.log('nfts', nfts.data)

  const nfts = nftsQuery.data?.ownedNfts
  useEffect(() => {
    const nftToAuction = first(nfts)
    if (!nftToAuction) {
      return
    }
    setSelectedTokenId(parseInt(nftToAuction.id.tokenId, 16))
    setSelectedTokenAddress(nftToAuction.contract.address)
  } ,[nfts])
  const chainId = CHAIN_IDS.GOERLI

  const provider = useProvider({ chainId })

  const { data: signer } = useSigner()

  const exchangeContract = IExchange__factory.connect(EXCHANGE_CONTRACT_ADDRESS_GOERLI, provider)

  const createAuctionMutation = useSmartContractTransaction(exchangeContract, 'createAuction', signer!)

  // const doQuery = useSmartContractReadCall(exchangeContract, '')

  const handleCreateAuction = async () => {
    const tokenAddress = selectedTokenAddress
    const tokenId = selectedTokenId

    if (!tokenAddress || !tokenId) {
      return
    }
    const publicKey = ''
    const puzzle = ''

    const result = await createAuctionMutation.mutateAsync([
      tokenAddress,
      tokenId,
      publicKey,
      puzzle,
    ])

    const events = result?.events
    const argsOfFirstEvent = events?.[0].args
  }


  console.log('selectedTokenId', selectedTokenId)

  const router = useRouter()

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
      <PageWrapper blur={false}>
        <HeaderSpace style={{ height: 100 }} />
        <div>
          <AniamtedBelowFoldWrapper style={{ padding: '0 16px', ...trail[2] }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 500,
                maxWidth: 1600,
                width: '100%',
                maxHeight: 700,
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(180deg, #F8D6EB 31.16%, #F48FBD 100%)',
                padding: 0,
                border: `2px solid #101010`,
                borderRadius: 40,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 8,
                }}
              >
                <AnimatedTitle
                  style={{
                    // position: 'relative',
                    // fontSize: 92,
                    // fontWeight: 700,
                    // lineHeight: '100%',
                    // zIndex: 10,
                    // color: 'black',
                    ...trail[0],
                  }}
                >
                  Sealed bid auctions
                  <br />
                  for everyone
                </AnimatedTitle>

                <Spacer size={36} />

                <PrimaryButton
                  onPress={() =>
                    router.push({
                      pathname: '/auction/create',
                    })
                  }
                  style={{
                    maxWidth: 280,
                    border: 'none',
                    boxShadow: `0px 9px 50px rgba(0, 0, 0, 0.48), 0px 1.12694px 6.26078px rgba(0, 0, 0, 0.24)`,
                    borderRadius: 24,
                  }}
                >
                  Start an auction
                </PrimaryButton>
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  width: 1600,
                  height: 800,
                  right: 0,
                  opacity: 0.2,
                  mixBlendMode: 'overlay',
                  // height: '100%',
                }}
              >
                {/* noise.png on cdn */}
                <img
                  src={
                    'https://res.cloudinary.com/do5meyjh8/image/upload/v1665627353/noise_fzpnt5.png'
                  }
                />
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
          <div>
            {/* stuff here... */}
          </div>
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
