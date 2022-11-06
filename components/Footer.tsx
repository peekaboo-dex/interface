import { useSeparator, SeparatorProps } from '@react-aria/separator'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useNetwork, useProvider } from 'wagmi'
import { useSwitchNetwork } from 'wagmi'

import { CHAIN_IDS, getChainLabel, DEFAULT_CHAIN_ID } from '../utils/chain'
import { ExternalLink } from './Link'
import { DOCS_URL } from '../config'

function Separator(props: SeparatorProps) {
  let { separatorProps } = useSeparator(props)
  return (
    <div
      {...separatorProps}
      style={{
        background: '#494D5B',
        width: props.orientation === 'vertical' ? '1px' : '100%',
        height: props.orientation === 'vertical' ? '100%' : '1px',
        margin: props.orientation === 'vertical' ? '0 5px' : '0px 0 20px 0',
      }}
    />
  )
}

const FooterWrapper = styled.div`
  max-width: 1320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto 0 auto;
  padding-bottom: 20px;
  position: 'relative',
  z-index: 2;
`

const FooterInnerWrapper = styled.footer`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  margin: 0 16px;
`

const HR = styled.div``

const Footer: React.FC<{}> = () => {
  const { chain } = useNetwork()
  const chainId = chain?.id
  const provider = useProvider()

  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  return (
    <>
      <FooterWrapper>
        <Separator />
        <FooterInnerWrapper>
          <div></div>
        </FooterInnerWrapper>
      </FooterWrapper>
    </>
  )
}

export { Footer }
