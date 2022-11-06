import { Contract } from 'ethers'
import { QueryObserverResult, useQuery, UseQueryOptions } from 'react-query'
import { Unpacked } from './unpacked'
import type { ContractMethodArgs, ContractMethodName, StaticContractReturnType } from './types'
import { JsonRpcProvider } from '@ethersproject/providers'
import { defaultAbiCoder } from 'ethers/lib/utils'

export interface UseSmartContractReadCallOptions<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
  TReturnType extends Unpacked<StaticContractReturnType<TContract, TMethodName>>,
  TSelect = TReturnType,
> {
  callArgs?: ContractMethodArgs<TContract, TMethodName>
  enabled?: boolean
  staleTime?: number

  keepPreviousData?: boolean
  select?: (data: TReturnType) => TSelect
}

const IDENTITY_FN = (v: unknown) => v

export function useSmartContractEthCall<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
  TContractData extends Unpacked<StaticContractReturnType<TContract, TMethodName>>,
  TData = TContractData,
>(
  contract: TContract | undefined,
  methodName: TMethodName,
  options?: UseSmartContractReadCallOptions<TContract, TMethodName, TContractData, TData>,
  overrideArgs?: { [key: string]: { code: string } },
): QueryObserverResult<TData> {
  const queryOptions = makeSmartContractReadCallUseQueryOptions(
    contract,
    methodName,
    options,
    overrideArgs ?? {},
  )

  const queryResult = useQuery(queryOptions)

  return queryResult
}

export function makeSmartContractReadCallUseQueryOptions<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
  TContractData extends Unpacked<StaticContractReturnType<TContract, TMethodName>>,
  TData = TContractData,
>(
  contract: TContract | undefined,
  methodName: TMethodName,
  options?: UseSmartContractReadCallOptions<TContract, TMethodName, TContractData, TData>,
  overrideArgs?: Record<string, { code: string }>,
): UseQueryOptions<TContractData, unknown, TData> {
  const { enabled = true, callArgs, staleTime, select, keepPreviousData } = options || {}

  const queryKey = makeSmartContractReadCallQueryKey<TContract, TMethodName>(
    contract?.address,
    methodName,
    callArgs,
    overrideArgs,
  )

  const queryFn = async (): Promise<TContractData> => {
    const provider = contract?.provider as JsonRpcProvider | undefined

    const finalArgs = callArgs || []
    // Read calls are by definition static, so we make sure to call the static method explicitly
    try {
      const populatedTx = contract?.populateTransaction[methodName as string](...finalArgs)
      const rawResult = await provider?.send('eth_call', [
        await populatedTx,
        'pending',
        overrideArgs,
      ])
      // const forwarder = LemmaSwapForwarder__factory.connect(FORWARDER_ADDRESS, provider)
      // const rawResult = await provider.send(
      //     'eth_call',
      //     [
      //         await forwarder.populateTransaction.getAmountsOut(WHALE_WALLET, lemmaSwapAddress, fromAmount, path),
      //         'pending',
      //         {

      //             [forwarder.address]: { code: LemmaSwapForwarder__factory.bytecode },
      //             [WHALE_WALLET]: { code: UnlockWallet__factory.bytecode }
      //         },
      //     ],
      // );
      // console.log("rawResult", rawResult);
      const amountsOut = defaultAbiCoder.decode(['uint256[]'], rawResult)[0]

      return amountsOut

      // const result = await contract?.callStatic?.[methodName as string](...finalArgs)
      // return result
    } catch (e) {
      console.log('queryFn:err', e)
      throw e
    }
  }

  const queryOptions: UseQueryOptions<TContractData, unknown, TData> = {
    queryKey,
    queryFn,
    onError: (e) => {
      console.error(
        `Error calling ${methodName as string} on ${contract?.address} with arguments:`,
        callArgs,
        e,
      )
    },
    select: select || (IDENTITY_FN as (v: TContractData) => TData),
    keepPreviousData,
    staleTime,
    enabled: !!contract && enabled,
  }

  return queryOptions
}

export function makeSmartContractReadCallQueryKey<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
>(
  contractAddress: string | undefined,
  methodName: TMethodName,
  callArgs: Parameters<TContract['functions'][TMethodName]> | undefined,
  overrideArgs?: { [key: string]: { code: string } },
): [
  string,
  TMethodName,
  string | undefined,
  {
    callArgs: Parameters<TContract['functions'][TMethodName]> | undefined
  },
  {
    overrideArgs?: { [key: string]: { code: string } }
  },
] {
  return ['contractCall', methodName, contractAddress, { callArgs }, { overrideArgs }]
}
