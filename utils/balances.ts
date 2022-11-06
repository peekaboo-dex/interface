import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract, Provider } from 'ethcall'
import { BigNumber } from 'ethers'
import { flatten } from 'lodash'
import erc20Abi from '../abis/ERC20.json'
import { RPC_URL } from '../config'

const getAllErc20BalancesMultiCall = async (
  walletAddress: string | undefined,
  tokenAddresses: string[] | undefined,
) => {
  if (!walletAddress) {
    return undefined
  }
  if (!tokenAddresses) {
    return undefined
  }
  const ethcallProvider = new Provider()

  ethcallProvider.provider = new JsonRpcProvider(RPC_URL)

  const contractsData = tokenAddresses.map((tokenAddress) => {
    const contract = new Contract(tokenAddress, erc20Abi)
    return {
      contract: new Contract(tokenAddress, erc20Abi),
      tokenAddress,
      balanceCall: contract.balanceOf(walletAddress),
    }
  })

  const balanceCalls = contractsData.map((contractData) => {
    return contractData.balanceCall
  })

  const arrayOfArrayOfBnBalancesPromises = await ethcallProvider.all(balanceCalls)

  const arrayOfArrayOfBnBalances = await Promise.all(arrayOfArrayOfBnBalancesPromises)

  const arrayOfBigNumberBalances = flatten(arrayOfArrayOfBnBalances)
  const erc20Balances: Array<{
    balance: string
    address: string
  }> = arrayOfBigNumberBalances.map((bnBalance, idx) => {
    const balance: BigNumber = bnBalance as any
    const erc20Address = tokenAddresses[idx]
    return {
      balance: balance.toString(),
      address: erc20Address.toString(),
    }
  })

  return erc20Balances
}

export { getAllErc20BalancesMultiCall }
