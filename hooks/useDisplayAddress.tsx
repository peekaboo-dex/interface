import { useAccount, useEnsName } from 'wagmi'
import { getShortenedAddress } from '../utils/web3'

const useDisplayAddress = () => {
  const { address } = useAccount()
  const userEnsName = useEnsName({
    address,
  })
  // always prefer ens
  if (userEnsName.data) {
    return userEnsName.data
  }
  return getShortenedAddress(address ?? '', 6, 4)
}

export { useDisplayAddress }
