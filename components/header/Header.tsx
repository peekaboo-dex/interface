import React, { useCallback, useState } from 'react'
import { useButton } from 'react-aria'
import styled, { useTheme } from 'styled-components'
import { useDisconnect, useEnsName } from 'wagmi'
import { useAccount, useNetwork } from 'wagmi'
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { State } from 'zustand'
import { MAX_CONTENT_WIDTH_PX } from '../../styles/theme'
import { ConnectWalletButton } from '../ConnectWalletButton'
import { NavTabs } from './NavTabs'
import { createStore } from '../../stores/factory'
import { getShortenedAddress } from '../../utils/web3'
import { CHAIN_IDS } from '../../utils/chain'
import { useWindowWidth } from '../../hooks/useWindow'
import { useMounted } from '../../hooks/useMounted'
import { useRouter } from 'next/router'

const MAX_HEADER_WIDTH_IN_PX = MAX_CONTENT_WIDTH_PX

const HEADER_HEIGHT_IN_PX = '58px'

const HeaderWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex: 1;
  justify-content: space-between;

  /* max-width: ${MAX_HEADER_WIDTH_IN_PX}; */

  width: 100%;
  max-width: calc(1256px + 40px);

  padding: 0 32px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0 16px;
  `}
  color: black;
  margin: 24px auto 0 auto;
  height: ${HEADER_HEIGHT_IN_PX};
  max-height: ${HEADER_HEIGHT_IN_PX};
  min-height: ${HEADER_HEIGHT_IN_PX};
  z-index: 100;

  position: absolute;
  display: flex;
  flex: 1;
  left: 0;
  right: 0;
  overflow-x: auto;
`

const LeftWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`

const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 200px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: fit-content;
  `}
`

const HeaderLabelText = styled.span`
  display: block;
  text-decoration: none;
  font-family: 'extended-regular';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: black;
  cursor: pointer;
`

interface HeaderStore extends State {}

export const useHeaderStore = createStore<HeaderStore>((_get) => ({
  // showDialog: false,
  // hasTriedEagerConnecting: false,
  // setShowDialog: (show: boolean) => {
  //   set((draft) => {
  //     draft.showDialog = show
  //   })
  // },
  // setHasTriedEagerConnecting: (hasEagerConnected: boolean) => {
  //   set((draft) => {
  //     draft.hasTriedEagerConnecting = hasEagerConnected
  //   })
  // },
}))

const Header: React.FC<{}> = () => {
  // const { activate, chainId, error, account, deactivate, library } = useWeb3React<Web3Provider>()

  const openButtonRef = React.useRef<HTMLButtonElement | null>(null)

  const router = useRouter()

  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => openConnectModal?.(),
    },
    openButtonRef,
  )

  const { data: ensName } = useEnsName()

  const networkData = useNetwork()
  const chainId = networkData.chain?.id
  const accountData = useAccount()
  const account = accountData.address

  const disconnectActions = useDisconnect()

  const logoutUser = useCallback(async () => {
    await disconnectActions.disconnectAsync()
  }, [disconnectActions.disconnectAsync])

  const { breakpoints } = useTheme()
  const windowWidth = useWindowWidth()
  const isScreenSmall = windowWidth <= breakpoints.upToSmall

  const mounted = useMounted()

  const isHomePage = router.pathname === '/'

  return (
    <>
      <HeaderWrapper key={'header-wrapper'}>
        <LeftWrapper
          style={{
            width: 200,
          }}
        >
          {mounted && (
            <>
              <div
                onClick={() => router.push('/')}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div>
                  <img src={'/images/logo.png'} />
                </div>
                {/* <LemmaIcon style={{ height: 32, width: 32, marginRight: 16 }} /> */}
                <LemmaHeaderText style={{ marginRight: 32 }}>Peekaboo</LemmaHeaderText>
              </div>
            </>
          )}
        </LeftWrapper>
        {/* <CenterWrapper>
          <NavTabs compact={isScreenSmall} />
        </CenterWrapper> */}

        {!isScreenSmall && (
          <RightWrapper key={'header-right'}>
            {!account && (
              <ConnectWalletButton {...(openButtonProps as any)} ref={openButtonRef}>
                {isScreenSmall ? 'Connect' : 'Connect wallet'}
              </ConnectWalletButton>
            )}
            {account && (
              <HeaderLabelText key={'logout'} onClick={logoutUser}>
                {ensName ?? getShortenedAddress(account, 6, 4)}
              </HeaderLabelText>
            )}
          </RightWrapper>
        )}
      </HeaderWrapper>
    </>
  )
}

const CenterWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
  justify-content: flex-end;
  `}
`

const LemmaHeaderText = styled.div`
  font-family: 'extended-regular';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  text-align: center;

  /* White */

  color: black;
`

export { Header }
