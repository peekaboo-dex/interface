import { useEffect } from 'react'
import dayjs from 'dayjs'
import type { State } from 'zustand'
import { createStore } from './factory'

import { $fetch } from 'ohmyfetch'
import { BigNumberish } from 'ethers'

interface Bid {
  bidder: string
  auctionId: string
  sealedBid: string
  ethSent: string
}

export interface AuctionState extends State {
  // auction info
  activeAuctionId: number | undefined
  auctioneer: string | undefined
  publicKey: string | undefined // bignumber converted to string
  puzzle: string | undefined
  tokenAddress: string | undefined
  tokenId: number | undefined
  // bids
  bids: Array<Bid> | undefined
  // auction puzzle
  p: string | undefined
  q: string | undefined
  d: string | undefined
  // bid reveal
  revealedBidder: string | undefined
  revealedBid: string | undefined
  obfuscation: string | undefined
  isCurrentHighestBid: boolean | undefined
  isValidBid: boolean | undefined
  // finalization
  winner: string | undefined
  winningBid: string | undefined

  resetAuction: () => void
  handleAuctionCreatedEvent: (
    auctionId: BigNumberish,
    auctioneer: string,
    publicKey: BigNumberish,
    puzzle: string,
    tokenAddress: string,
    tokenId: BigNumberish,
  ) => void
  handleBidComittedEvent: (
    auctionId: BigNumberish,
    bidder: string,
    sealedBid: BigNumberish,
    ethSent: BigNumberish,
  ) => void
  handleAuctionPuzzleSolved: (
    auctionId: BigNumberish,
    p: BigNumberish,
    q: BigNumberish,
    d: BigNumberish,
  ) => void
  handleBidRevealed: (
    auctionId: BigNumberish,
    bidder: string,
    bid: BigNumberish,
    obfusation: BigNumberish,
    isCurrentHighestBid: boolean,
    isValidBid: boolean,
  ) => void
  handleAuctionFinalized: (
    auctionId: BigNumberish,
    winner: string,
    winningBid: BigNumberish,
  ) => void
}

const useAuctionStateStore = createStore<AuctionState>((set, _get) => ({
  activeAuctionId:  undefined,
  auctioneer: undefined,
  publicKey: undefined, // bignumber converted to string
  puzzle: undefined,
  tokenAddress: undefined,
  tokenId: undefined,
  // bids
  bids: undefined,
  // auction puzzle
  p: undefined,
  q: undefined,
  d: undefined,
  // bid reveal
  revealedBidder: undefined,
  revealedBid: undefined,
  obfuscation: undefined,
  isCurrentHighestBid: undefined,
  isValidBid: undefined,
  // finalization
  winner: undefined,
  winningBid: undefined,

  resetAuction() {
    set((draft) => {
      draft.activeAuctionId = undefined
      draft.auctioneer = undefined
      draft.publicKey = undefined
      draft.puzzle = undefined;
      draft.tokenAddress = undefined
      draft.tokenId = undefined
      draft.bids = undefined
      draft.p = undefined
      draft.q = undefined
      draft.d = undefined
      draft.revealedBidder = undefined
      draft.revealedBid = undefined
      draft.obfuscation = undefined
      draft.isCurrentHighestBid = undefined
      draft.isValidBid = undefined
      draft.winner = undefined
      draft.winningBid = undefined
    })
  },

  handleAuctionCreatedEvent(auctionId, auctioneer, publicKey, puzzle, tokenAddress, tokenId) {
    set((draft) => {
      draft.activeAuctionId = parseInt(auctionId.toString())
      draft.auctioneer = auctioneer
      draft.publicKey = publicKey.toString()
      draft.puzzle = puzzle;
      draft.tokenAddress = tokenAddress
      draft.tokenId = parseInt(tokenId.toString())
    })
  },
  handleBidComittedEvent(auctionId, bidder, sealedBid, ethSent) {
    set((draft) => {
      const bid: Bid = {
        auctionId: auctionId.toString(),
        bidder,
        sealedBid: sealedBid.toString(),
        ethSent: sealedBid.toString(),
      }
      if (draft.bids) {
        draft.bids.push(bid)
      } else {
        draft.bids = [bid]
      }
    })
  },
  handleAuctionPuzzleSolved(auctionId, p, q, d) {
    set((draft) => {
      draft.p = p.toString()
      draft.q = q.toString()
      draft.d = d.toString()
    })
  },
  handleBidRevealed(auctionId, revealedBidder, revealedBid, obfusation, isCurrentHighestBid, isValidBid) {
    set((draft) => {
      draft.revealedBidder = revealedBidder
      draft.revealedBid = revealedBid.toString()
      draft.obfuscation = obfusation.toString()
      draft.isCurrentHighestBid = isCurrentHighestBid
      draft.isValidBid = isValidBid
    })
  },
  handleAuctionFinalized(auctionId, winner, winningBid) {
    set((draft) => {
      draft.winner = winner
      draft.winningBid = winningBid.toString()
    })
  },
}))


// const AppStateEffect: React.FC<{}> = () => {
//   const acceptVaultTerms = useAppStateStore((s) => s.acceptVaultTerms)
//   const acceptMintTerms = useAppStateStore((s) => s.acceptMintTerms)

//   const vaultTermsAcceptedUnixTimestamp = useAppStateStore((s) => s.vaultTermsAcceptedUnixTimestamp)
//   const mintTermsAcceptedUnixTimestamp = useAppStateStore((s) => s.mintTermsAcceptedUnixTimestamp)

//   const setGeoblocked = useAppStateStore((s) => s.setGeoblocked)

//   // Bootstrap initial storage on load
//   useEffect(() => {
//     let existingTimestamp = parseNumberValueFromLocalStorage(
//       TERMS_ACCEPTED_VAULT_UNIX_TIMESTAMP_LOCAL_STORAGE_KEY,
//     )
//     if (!existingTimestamp) {
//       return
//     }
//     acceptVaultTerms(existingTimestamp)
//   }, [acceptVaultTerms])

//   useEffect(() => {
//     let existingTimestamp = parseNumberValueFromLocalStorage(
//       TERMS_ACCEPTED_MINT_UNIX_TIMESTAMP_LOCAL_STORAGE_KEY,
//     )
//     if (!existingTimestamp) {
//       return
//     }
//     acceptMintTerms(existingTimestamp)
//   }, [acceptMintTerms])

//   // Persist value declaratively to local storage
//   useEffect(() => {
//     if (!vaultTermsAcceptedUnixTimestamp) {
//       return
//     }
//     localStorage.setItem(
//       TERMS_ACCEPTED_VAULT_UNIX_TIMESTAMP_LOCAL_STORAGE_KEY,
//       JSON.stringify(vaultTermsAcceptedUnixTimestamp),
//     )
//   }, [vaultTermsAcceptedUnixTimestamp])
//   useEffect(() => {
//     if (!mintTermsAcceptedUnixTimestamp) {
//       return
//     }
//     localStorage.setItem(
//       TERMS_ACCEPTED_MINT_UNIX_TIMESTAMP_LOCAL_STORAGE_KEY,
//       JSON.stringify(mintTermsAcceptedUnixTimestamp),
//     )
//   }, [mintTermsAcceptedUnixTimestamp])

//   return null
// }

export { useAuctionStateStore }
