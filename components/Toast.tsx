import React, { useMemo } from 'react'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { ExternalLink } from './Link'
import { ExternalLinkIcon, XIcon } from '@heroicons/react/solid'
import { getEtherscanLinkFromTxHash } from '../utils/web3'

const TOAST_MIN_WIDTH = 360

const TOAST_DURATIONS = {
  FAILURE: 12 * 1000,
  SUCCESS: 15 * 1000,
  WAITING: 60 * 1000 * 60,
}

const ToastWrapper = styled.div`
  position: relative;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 2px;
`

const ToastTitleRow = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`

const ToastTxViewRow = styled.div`
  display: flex;
  align-items: center;
`

const ToastDescription = styled.div`
  font-family: 'favorit-regular';
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 14px;
    line-height: 16px;
  `}
  color: ${({ theme }) => theme.lightGray};
  cursor: pointer;
  transition: color 0.15s ease;
  margin-bottom: 4px;
`

const ToastCloseButtonWrapper = styled.div`
  position: absolute;
  top: -8px;
  height: 16px;
  width: 16px;
  right: -8px;
  z-index: 1000000;

  color: ${({ theme }) => theme.lightGray};
  cursor: pointer;
  transition: color 0.15s ease;
  transition: transform 0.15s ease, color 0.15s ease;
  transform: translate3d(0, 0, 0);

  & svg {
    color: ${({ theme }) => theme.lightGray};
    transition: color 0.15s ease;
  }

  &:hover svg {
    color: #ffffff;
    fill: #ffffff;
  }
  :active {
    transform: scale(0.985);
    color: #ffffff;
  }
`

export interface ToastCloseButtonProps extends React.HTMLProps<HTMLDivElement> {}

const ToastCloseButton: React.FC<ToastCloseButtonProps> = ({ children, ref, as, ...rest }) => {
  return (
    <ToastCloseButtonWrapper {...rest}>
      <XIcon />
    </ToastCloseButtonWrapper>
  )
}

export interface TxLinkProps {
  txHash: string
  chainId: number
}

const TxLink: React.FC<TxLinkProps> = (props) => {
  const etherscanLink = useMemo(() => {
    return getEtherscanLinkFromTxHash(props.txHash, props.chainId)
  }, [props.chainId, props.txHash])
  return (
    <ExternalLink
      showUnderline={true}
      style={{ display: 'inline-flex', alignItems: 'center' }}
      href={etherscanLink ?? '#'}
    >
      <span style={{ display: 'inline-block', marginRight: 2, fontSize: 14 }}>
        {props.children ?? 'View Transaction'}
      </span>
      <ExternalLinkIcon height={14} width={14} />
    </ExternalLink>
  )
}

export interface ToastAllInOneProps {
  titleText: React.ReactNode | string
  toastId: string
  chainId: number
  descriptionText?: React.ReactNode | string
  txHash?: string
  transactionRowText?: React.ReactNode | string
}

const ToastAllInOne: React.FC<ToastAllInOneProps> = (props) => {
  return (
    <ToastWrapper>
      <ToastCloseButton onClick={() => toast.dismiss(props.toastId)} />
      <ToastTitleRow>{props.titleText ?? 'Transaction Pending'}</ToastTitleRow>
      {props.descriptionText && <ToastDescription>{props.descriptionText}</ToastDescription>}
      {props.txHash && (
        <ToastTxViewRow>
          <TxLink txHash={props.txHash} chainId={props.chainId}>
            {props.transactionRowText}
          </TxLink>
        </ToastTxViewRow>
      )}
    </ToastWrapper>
  )
}

// <ToastWrapper>
//   <ToastCloseButton onClick={() => toast.dismiss(toastId)}/>
//   <ToastTitleRow>Transaction Pending</ToastTitleRow>
//   <ToastTxViewRow>
//     <TxLink
//       txHash={'0x19666547f4bde9948aa7596af82e68cee5fedeb61ab1a83cc793af77cf52dc25'}
//       chainId={CHAIN_IDS.GOERLI}
//     />
//   </ToastTxViewRow>
// </ToastWrapper>

export {
  TOAST_MIN_WIDTH,
  TOAST_DURATIONS,
  ToastWrapper,
  ToastTitleRow,
  ToastTxViewRow,
  ToastCloseButton,
  TxLink,
  ToastAllInOne,
  ToastDescription,
}
