/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface IExchangeInterface extends utils.Interface {
  functions: {
    "claimRefund(uint256)": FunctionFragment;
    "closeAuction(uint256,uint256,uint256,uint256)": FunctionFragment;
    "commitBid(uint256,uint256)": FunctionFragment;
    "createAuction(address,uint256,bytes,bytes)": FunctionFragment;
    "finalizeAuction(uint256)": FunctionFragment;
    "revealBid(uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "claimRefund"
      | "closeAuction"
      | "commitBid"
      | "createAuction"
      | "finalizeAuction"
      | "revealBid"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "claimRefund",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "closeAuction",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "commitBid",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "createAuction",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "finalizeAuction",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "revealBid",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "claimRefund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "closeAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "commitBid", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "finalizeAuction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revealBid", data: BytesLike): Result;

  events: {
    "AuctionCreated(uint256,address,address,uint256,bytes,bytes)": EventFragment;
    "AuctionFinalized(uint256,address,uint256)": EventFragment;
    "AuctionPuzzleSolved(uint256,uint256,uint256,uint256)": EventFragment;
    "BidCommitted(uint256,address,uint256,uint256)": EventFragment;
    "BidRevealed(uint256,address,uint256,uint256,bool,bool)": EventFragment;
    "Refund(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AuctionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionFinalized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AuctionPuzzleSolved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidCommitted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BidRevealed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Refund"): EventFragment;
}

export interface AuctionCreatedEventObject {
  auctionId: BigNumber;
  auctioneer: string;
  tokenAddress: string;
  tokenId: BigNumber;
  publicKey: string;
  puzzle: string;
}
export type AuctionCreatedEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, string, string],
  AuctionCreatedEventObject
>;

export type AuctionCreatedEventFilter = TypedEventFilter<AuctionCreatedEvent>;

export interface AuctionFinalizedEventObject {
  auctionId: BigNumber;
  winner: string;
  winningBid: BigNumber;
}
export type AuctionFinalizedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  AuctionFinalizedEventObject
>;

export type AuctionFinalizedEventFilter =
  TypedEventFilter<AuctionFinalizedEvent>;

export interface AuctionPuzzleSolvedEventObject {
  auctionId: BigNumber;
  p: BigNumber;
  q: BigNumber;
  d: BigNumber;
}
export type AuctionPuzzleSolvedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber],
  AuctionPuzzleSolvedEventObject
>;

export type AuctionPuzzleSolvedEventFilter =
  TypedEventFilter<AuctionPuzzleSolvedEvent>;

export interface BidCommittedEventObject {
  auctionId: BigNumber;
  bidder: string;
  sealedBid: BigNumber;
  ethSent: BigNumber;
}
export type BidCommittedEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber],
  BidCommittedEventObject
>;

export type BidCommittedEventFilter = TypedEventFilter<BidCommittedEvent>;

export interface BidRevealedEventObject {
  auctionId: BigNumber;
  bidder: string;
  bid: BigNumber;
  obfuscation: BigNumber;
  isCurrentHighestBid: boolean;
  isValidBid: boolean;
}
export type BidRevealedEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber, boolean, boolean],
  BidRevealedEventObject
>;

export type BidRevealedEventFilter = TypedEventFilter<BidRevealedEvent>;

export interface RefundEventObject {
  auctionId: BigNumber;
  amount: BigNumber;
}
export type RefundEvent = TypedEvent<[BigNumber, BigNumber], RefundEventObject>;

export type RefundEventFilter = TypedEventFilter<RefundEvent>;

export interface IExchange extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IExchangeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    claimRefund(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    closeAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      p: PromiseOrValue<BigNumberish>,
      q: PromiseOrValue<BigNumberish>,
      d: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    commitBid(
      auctionId: PromiseOrValue<BigNumberish>,
      sealedBid: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createAuction(
      tokenAddress: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      publicKey: PromiseOrValue<BytesLike>,
      puzzle: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    finalizeAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revealBid(
      auctionId: PromiseOrValue<BigNumberish>,
      bidder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  claimRefund(
    auctionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  closeAuction(
    auctionId: PromiseOrValue<BigNumberish>,
    p: PromiseOrValue<BigNumberish>,
    q: PromiseOrValue<BigNumberish>,
    d: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  commitBid(
    auctionId: PromiseOrValue<BigNumberish>,
    sealedBid: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createAuction(
    tokenAddress: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    publicKey: PromiseOrValue<BytesLike>,
    puzzle: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  finalizeAuction(
    auctionId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revealBid(
    auctionId: PromiseOrValue<BigNumberish>,
    bidder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claimRefund(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    closeAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      p: PromiseOrValue<BigNumberish>,
      q: PromiseOrValue<BigNumberish>,
      d: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    commitBid(
      auctionId: PromiseOrValue<BigNumberish>,
      sealedBid: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createAuction(
      tokenAddress: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      publicKey: PromiseOrValue<BytesLike>,
      puzzle: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    finalizeAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    revealBid(
      auctionId: PromiseOrValue<BigNumberish>,
      bidder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "AuctionCreated(uint256,address,address,uint256,bytes,bytes)"(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      auctioneer?: PromiseOrValue<string> | null,
      tokenAddress?: null,
      tokenId?: null,
      publicKey?: null,
      puzzle?: null
    ): AuctionCreatedEventFilter;
    AuctionCreated(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      auctioneer?: PromiseOrValue<string> | null,
      tokenAddress?: null,
      tokenId?: null,
      publicKey?: null,
      puzzle?: null
    ): AuctionCreatedEventFilter;

    "AuctionFinalized(uint256,address,uint256)"(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      winner?: null,
      winningBid?: null
    ): AuctionFinalizedEventFilter;
    AuctionFinalized(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      winner?: null,
      winningBid?: null
    ): AuctionFinalizedEventFilter;

    "AuctionPuzzleSolved(uint256,uint256,uint256,uint256)"(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      p?: null,
      q?: null,
      d?: null
    ): AuctionPuzzleSolvedEventFilter;
    AuctionPuzzleSolved(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      p?: null,
      q?: null,
      d?: null
    ): AuctionPuzzleSolvedEventFilter;

    "BidCommitted(uint256,address,uint256,uint256)"(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      bidder?: PromiseOrValue<string> | null,
      sealedBid?: null,
      ethSent?: null
    ): BidCommittedEventFilter;
    BidCommitted(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      bidder?: PromiseOrValue<string> | null,
      sealedBid?: null,
      ethSent?: null
    ): BidCommittedEventFilter;

    "BidRevealed(uint256,address,uint256,uint256,bool,bool)"(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      bidder?: PromiseOrValue<string> | null,
      bid?: null,
      obfuscation?: null,
      isCurrentHighestBid?: null,
      isValidBid?: null
    ): BidRevealedEventFilter;
    BidRevealed(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      bidder?: PromiseOrValue<string> | null,
      bid?: null,
      obfuscation?: null,
      isCurrentHighestBid?: null,
      isValidBid?: null
    ): BidRevealedEventFilter;

    "Refund(uint256,uint256)"(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      amount?: null
    ): RefundEventFilter;
    Refund(
      auctionId?: PromiseOrValue<BigNumberish> | null,
      amount?: null
    ): RefundEventFilter;
  };

  estimateGas: {
    claimRefund(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    closeAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      p: PromiseOrValue<BigNumberish>,
      q: PromiseOrValue<BigNumberish>,
      d: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    commitBid(
      auctionId: PromiseOrValue<BigNumberish>,
      sealedBid: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createAuction(
      tokenAddress: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      publicKey: PromiseOrValue<BytesLike>,
      puzzle: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    finalizeAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revealBid(
      auctionId: PromiseOrValue<BigNumberish>,
      bidder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimRefund(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    closeAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      p: PromiseOrValue<BigNumberish>,
      q: PromiseOrValue<BigNumberish>,
      d: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    commitBid(
      auctionId: PromiseOrValue<BigNumberish>,
      sealedBid: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createAuction(
      tokenAddress: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      publicKey: PromiseOrValue<BytesLike>,
      puzzle: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    finalizeAuction(
      auctionId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revealBid(
      auctionId: PromiseOrValue<BigNumberish>,
      bidder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
