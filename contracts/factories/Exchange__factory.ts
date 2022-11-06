/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Exchange, ExchangeInterface } from "../Exchange";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_finalityDelay",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "auctioneer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "publicKey",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "puzzle",
        type: "bytes",
      },
    ],
    name: "AuctionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winningBid",
        type: "uint256",
      },
    ],
    name: "AuctionFinalized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "p",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "q",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
    ],
    name: "AuctionPuzzleSolved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sealedBid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethSent",
        type: "uint256",
      },
    ],
    name: "BidCommitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "bidder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "obfuscation",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isCurrentHighestBid",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isValidBid",
        type: "bool",
      },
    ],
    name: "BidRevealed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Refund",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "auctions",
    outputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "auctioneer",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "publicKey",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "input",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "p",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "q",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "d",
            type: "uint256",
          },
        ],
        internalType: "struct IExchange.Puzzle",
        name: "puzzle",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "puzzleSolvedTimestamp",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "currentHighestBidder",
        type: "address",
      },
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        internalType: "enum IExchange.AuctionState",
        name: "state",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "claimRefund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "p",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "q",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
    ],
    name: "closeAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sealedBid",
        type: "uint256",
      },
    ],
    name: "commitBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "publicKey",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "puzzle",
        type: "bytes",
      },
    ],
    name: "createAuction",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentAuctionId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "p",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "q",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "c",
        type: "uint256",
      },
    ],
    name: "decrypt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "finalityDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
    ],
    name: "finalizeAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "auctionId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "bidder",
        type: "address",
      },
    ],
    name: "revealBid",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "sealedBids",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "ethSent",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "settled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "test",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "test2",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "unsealedBids",
    outputs: [
      {
        internalType: "uint256",
        name: "bid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "obfuscation",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051611b36380380611b3683398101604081905261002f91610037565b608052610050565b60006020828403121561004957600080fd5b5051919050565b608051611ac46100726000396000818161027301526110550152611ac46000f3fe6080604052600436106100e85760003560e01c80635b7baf641161008a578063a65c6b2a11610059578063a65c6b2a14610307578063e44d774d14610352578063e808386314610365578063f8a8fd6d1461038557600080fd5b80635b7baf641461023f5780635ea4d95f1461026157806366e41cb71461029557806377386a07146102aa57600080fd5b80634464b14a116100c65780634464b14a1461018a57806356433a68146101c9578063571a26a0146101e9578063572ea8d61461021f57600080fd5b806303700a5e146100ed5780630c0b86ca146101465780632b7e92a81461016a575b600080fd5b3480156100f957600080fd5b5061012c6101083660046116f6565b60026020908152600092835260408084209091529082529020805460019091015482565b604080519283526020830191909152015b60405180910390f35b34801561015257600080fd5b5061015c60005481565b60405190815260200161013d565b34801561017657600080fd5b5061015c610185366004611722565b61039a565b34801561019657600080fd5b5061012c6101a53660046116f6565b60036020908152600092835260408084209091529082529020805460019091015482565b3480156101d557600080fd5b5061015c6101e4366004611754565b6103ec565b3480156101f557600080fd5b506102096102043660046117e8565b610699565b60405161013d9a99989796959493929190611839565b34801561022b57600080fd5b5061015c61023a3660046116f6565b6107c4565b34801561024b57600080fd5b5061025f61025a3660046117e8565b610bb9565b005b34801561026d57600080fd5b5061015c7f000000000000000000000000000000000000000000000000000000000000000081565b3480156102a157600080fd5b5061025f610d8b565b3480156102b657600080fd5b5061025f6102c5366004611722565b600093845260016020526040909320600681019290925560078201556008810191909155600b8101805460ff60a01b1916600160a01b17905542600990910155565b34801561031357600080fd5b506103426103223660046116f6565b600460209081526000928352604080842090915290825290205460ff1681565b604051901515815260200161013d565b61025f61036036600461192b565b610ebb565b34801561037157600080fd5b5061025f6103803660046117e8565b61103d565b34801561039157600080fd5b5061025f6113eb565b6000806103bb6103ab600188611963565b6103b6600188611963565b61152a565b90506103cb846201000183611551565b60006103e184866103dc898b61197a565b6115a6565b979650505050505050565b604051632142170760e11b8152336004820152306024820152604481018590526000906001600160a01b038716906342842e0e90606401600060405180830381600087803b15801561043d57600080fd5b505af1158015610451573d6000803e3d6000fd5b50505050600060016000808282546104699190611999565b9250508190559050604051806101400160405280828152602001336001600160a01b03168152602001886001600160a01b03168152602001878152602001868152602001604051806080016040528087878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509385525050506020808301829052604080840183905260609384018390529385528401819052918301829052820181905260809091015260008054815260016020818152604092839020845181558482015192810180546001600160a01b039485166001600160a01b0319918216179091559385015160028201805491909416941693909317909155606083015160038301556080830151600483015560a083015180518051919260058501926105a49284920190611641565b5060208201516001820155604082015160028083019190915560609092015160039091015560c0830151600983015560e0830151600a830180546001600160a01b03199081166001600160a01b0393841617909155610100850151600b85018054928316919093169081178355610120860151936001600160a81b03199092161790600160a01b90849081111561063d5761063d611801565b0217905550905050336001600160a01b0316817fadf8bebed1a3b6a4f3f8eadc55315cafafb4513ca781522baa692e671c07603c89898989896040516106879594939291906119b1565b60405180910390a39695505050505050565b60016020819052600091825260409182902080549181015460028201546003830154600484015486516080810190975260058501805496976001600160a01b0395861697949095169592949193829082906106f3906119fd565b80601f016020809104026020016040519081016040528092919081815260200182805461071f906119fd565b801561076c5780601f106107415761010080835404028352916020019161076c565b820191906000526020600020905b81548152906001019060200180831161074f57829003601f168201915b505050918352505060018201546020820152600282015460408201526003909101546060909101526009820154600a830154600b90930154919290916001600160a01b0391821691811690600160a01b900460ff168a565b600060016000848152600160205260409020600b0154600160a01b900460ff1660028111156107f5576107f5611801565b1461086d5760405162461bcd60e51b815260206004820152603d60248201527f426964732063616e206f6e6c792062652072657665616c6564207768656e207460448201527f68652061756374696f6e20697320696e20434c4f53454420737461746500000060648201526084015b60405180910390fd5b600083815260016020526040808220815160808101909252600501805482908290610897906119fd565b80601f01602080910402602001604051908101604052809291908181526020018280546108c3906119fd565b80156109105780601f106108e557610100808354040283529160200191610910565b820191906000526020600020905b8154815290600101906020018083116108f357829003601f168201915b5050505050815260200160018201548152602001600282015481526020016003820154815250509050610942816115e6565b6109a35760405162461bcd60e51b815260206004820152602c60248201527f43616e6e6f742072657665616c207365616c6564206269642e2050757a7a6c6560448201526b103737ba1039b7b63b32b21760a11b6064820152608401610864565b60008481526002602090815260408083206001600160a01b03871684528252918290208251808401909352805480845260019091015491830191909152158015906109f15750602081015115155b610a3d5760405162461bcd60e51b815260206004820152601e60248201527f4e6f207365616c6564206269642065786973747320666f7220757365722e00006044820152606401610864565b6000610a5b836020015184604001518560600151856000015161039a565b6020830151909150811115600081610a74576000610a84565b828460200151610a849190611963565b604080518082018252858152602080820184815260008d8152600383528481206001600160a01b038e1682529092529281209151825591516001909101559091508215610b56576000898152600160205260409020600a01546001600160a01b031680610af45760019150610b23565b60008a81526003602090815260408083206001600160a01b0385168452909152902054851115610b2357600191505b8115610b545760008a8152600160205260409020600a0180546001600160a01b0319166001600160a01b038b161790555b505b604080518581526020810184905282151581830152841515606082015290516001600160a01b038a16918b917f523f60a8016d8cd6e87a0454a2f3ca91a87a296ecbd3ac7ec900162228fb01259181900360800190a35091979650505050505050565b60026000828152600160205260409020600b0154600160a01b900460ff166002811115610be857610be8611801565b14610c4f5760405162461bcd60e51b815260206004820152603160248201527f41756374696f6e202c7573742062652066696e616c697a6564206265666f72656044820152701031b630b4b6b4b733903932b33ab7321760791b6064820152608401610864565b600081815260046020908152604080832033845290915290205460ff1615610cb95760405162461bcd60e51b815260206004820181905260248201527f54686973206163636f756e742068617320616c726561647920736574746c65646044820152606401610864565b60008181526002602090815260408083203380855290835281842060019081015486865260048552838620838752909452828520805460ff19169091179055905191929183908381818185875af1925050503d8060008114610d37576040519150601f19603f3d011682016040523d82523d6000602084013e610d3c565b606091505b5050905080610d865760405162461bcd60e51b815260206004820152601660248201527511985a5b1959081d1bc818db185a5b481c99599d5b9960521b6044820152606401610864565b505050565b60405163056fd25560e31b81526ff1d8820818846893356fc7b1bf30aab7600482018190526fbbb509a5f48fdba8bc6842d3775ed183602483018190527f06aea752cf6cbdec517f51f196c18c761d0b0ecbac7e4f211da4f4f7b797f87d604484018190527fade5780aa292081cd710752a874300af10d449dfb16b81bfdca46734699509786064850181905292939192916000903090632b7e92a890608401602060405180830381865afa158015610e48573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e6c9190611a37565b90508069010062a2ead63ef22db514610eb45760405162461bcd60e51b815260206004820152600a60248201526957726f6e67206d73672160b01b6044820152606401610864565b5050505050565b600080838152600160205260409020600b0154600160a01b900460ff166002811115610ee957610ee9611801565b14610f2c5760405162461bcd60e51b815260206004820152601360248201527220bab1ba34b7b71034b9903737ba1037b832b760691b6044820152606401610864565b80600003610f7c5760405162461bcd60e51b815260206004820152601b60248201527f5365616c656420626964206d757374206265206e6f6e2d7a65726f00000000006044820152606401610864565b34600003610fbc5760405162461bcd60e51b815260206004820152600d60248201526c09aeae6e840e6cadcc8408aa89609b1b6044820152606401610864565b60408051808201825282815234602080830182815260008781526002835285812033808352935285902093518455516001909301929092559151909184917fd01dab2f3b4b97d6761668bf43ff193fc6f4a45dc005415b1f65048f9bc6f87e9161103191869190918252602082015260400190565b60405180910390a35050565b60008181526001602052604090206009015461107a907f000000000000000000000000000000000000000000000000000000000000000090611999565b42116110c85760405162461bcd60e51b815260206004820181905260248201527f41756374696f6e2063616e6e6f742062652066696e616c697a6564207965742e6044820152606401610864565b60016000828152600160205260409020600b0154600160a01b900460ff1660028111156110f7576110f7611801565b146111585760405162461bcd60e51b815260206004820152602b60248201527f41756374696f6e206973206e6f742079657420636c6f7365642e2043616e6e6f60448201526a3a103334b730b634bd329760a91b6064820152608401610864565b6000818152600160208181526040808420600b81018054600160a11b60ff60a01b1982161790915590840154600384528286206001600160a01b03928316808852945291909420805493015493169290919082611259576000858152600160205260409081902060028101546003909101549151632142170760e11b81523060048201526001600160a01b03878116602483015260448201939093529116906342842e0e90606401600060405180830381600087803b15801561121a57600080fd5b505af115801561122e573d6000803e3d6000fd5b5050506000868152600160205260409020600b01805460ff60a01b1916600160a11b179055506113a0565b6000858152600160205260409081902060028101546003909101549151632142170760e11b81523060048201526001600160a01b03868116602483015260448201939093529116906342842e0e90606401600060405180830381600087803b1580156112c457600080fd5b505af11580156112d8573d6000803e3d6000fd5b50505060008681526004602090815260408083206001600160a01b0388168085529252808320805460ff1916600117905551909250839181818185875af1925050503d8060008114611346576040519150601f19603f3d011682016040523d82523d6000602084013e61134b565b606091505b50506040516001600160a01b03861691508390600081818185875af1925050503d8060008114611397576040519150601f19603f3d011682016040523d82523d6000602084013e61139c565b606091505b5050505b604080516001600160a01b03851681526020810184905286917f4d9113a1377d665eaa1f9168a9c9080f2e488cb820b10149de3d6d2e0f2780c7910160405180910390a25050505050565b60405163056fd25560e31b81526fefaa4198779cfbb9ada8e6f4a3db2b73600482018190526fac8ed9a1e01aabb645cb3e982db678df602483018190527f43aad9e21a1f3b5cb26b631abf62693bdc63ad231ab56e1b92d77c8b6d932923604484018190527f7690f3f5f18934c72e035f50cd91f120dab38e13a0cf99deace283861650b25e6064850181905292939192916000903090632b7e92a890608401602060405180830381865afa1580156114a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114cc9190611a37565b9050807f0ada73fe6090d535b0686a1418ef90a98ae8cf2a25ea1bd9ac6807038e0cacba14610eb45760405162461bcd60e51b815260206004820152600a60248201526957726f6e67206d73672160b01b6044820152606401610864565b60006115368383611615565b6115409083611a66565b61154a908461197a565b9392505050565b808061155f5761155f611a50565b828409600114610d865760405162461bcd60e51b81526020600482015260126024820152714261642052534120536563726574204b657960701b6044820152606401610864565b600060405160208152602080820152602060408201528460608201528360808201528260a082015260208160c08360056107d05a03fa5051949350505050565b600081602001516000141580156116005750604082015115155b801561160f5750606082015115155b92915050565b60008282825b811561163757508061162d8184611a7a565b915080925061161b565b5090949350505050565b82805461164d906119fd565b90600052602060002090601f01602090048101928261166f57600085556116b5565b82601f1061168857805160ff19168380011785556116b5565b828001600101855582156116b5579182015b828111156116b557825182559160200191906001019061169a565b506116c19291506116c5565b5090565b5b808211156116c157600081556001016116c6565b80356001600160a01b03811681146116f157600080fd5b919050565b6000806040838503121561170957600080fd5b82359150611719602084016116da565b90509250929050565b6000806000806080858703121561173857600080fd5b5050823594602084013594506040840135936060013592509050565b60008060008060006080868803121561176c57600080fd5b611775866116da565b94506020860135935060408601359250606086013567ffffffffffffffff808211156117a057600080fd5b818801915088601f8301126117b457600080fd5b8135818111156117c357600080fd5b8960208285010111156117d557600080fd5b9699959850939650602001949392505050565b6000602082840312156117fa57600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b6003811061183557634e487b7160e01b600052602160045260246000fd5b9052565b60006101408c8352602060018060a01b03808e1682860152808d166040860152508a60608501528960808501528160a0850152885160808386015280519250826101c086015260005b8381101561189f578181018301518682016101e001528201611882565b838111156118b25760006101e085880101525b5050880151610160840152604088015161018084015260608801516101a084015260c08301879052601f01601f191682016101e00190506118fe60e08301866001600160a01b03169052565b6001600160a01b03841661010083015261191c610120830184611817565b9b9a5050505050505050505050565b6000806040838503121561193e57600080fd5b50508035926020909101359150565b634e487b7160e01b600052601160045260246000fd5b6000828210156119755761197561194d565b500390565b60008160001904831182151516156119945761199461194d565b500290565b600082198211156119ac576119ac61194d565b500190565b60018060a01b038616815284602082015283604082015260806060820152816080820152818360a0830137600081830160a090810191909152601f909201601f19160101949350505050565b600181811c90821680611a1157607f821691505b602082108103611a3157634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215611a4957600080fd5b5051919050565b634e487b7160e01b600052601260045260246000fd5b600082611a7557611a75611a50565b500490565b600082611a8957611a89611a50565b50069056fea26469706673582212209dd6051de5ef3696fe29e2752d59651e9eb41df49b28be031c9d3c34864febcd64736f6c634300080d0033";

type ExchangeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ExchangeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Exchange__factory extends ContractFactory {
  constructor(...args: ExchangeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _finalityDelay: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Exchange> {
    return super.deploy(_finalityDelay, overrides || {}) as Promise<Exchange>;
  }
  override getDeployTransaction(
    _finalityDelay: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_finalityDelay, overrides || {});
  }
  override attach(address: string): Exchange {
    return super.attach(address) as Exchange;
  }
  override connect(signer: Signer): Exchange__factory {
    return super.connect(signer) as Exchange__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ExchangeInterface {
    return new utils.Interface(_abi) as ExchangeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Exchange {
    return new Contract(address, _abi, signerOrProvider) as Exchange;
  }
}