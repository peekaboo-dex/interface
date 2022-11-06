import { useRef, useEffect, useCallback } from 'react'
import { Fetcher, Key, SWRHook } from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

// This is a SWR middleware for keeping the data even if key changes.
function laggy(useSWRNext: SWRHook) {
  return (
    key: Key,
    fetcher: Key | Fetcher<any> | Partial<PublicConfiguration<any, any, Fetcher<any>>> | undefined,
    config: Key | Fetcher<any> | Partial<PublicConfiguration<any, any, Fetcher<any>>> | undefined,
  ) => {
    // Use a ref to store previous returned data.
    const laggyDataRef = useRef()

    // Actual SWR hook.
    const swr = useSWRNext(key as any, fetcher as any, config as any)

    useEffect(() => {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data
      }
    }, [swr.data])

    // Expose a method to clear the laggy data, if any.
    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined
    }, [])

    // Fallback to previous data if the current data is undefined.
    const dataOrLaggyData = swr.data === undefined ? laggyDataRef.current : swr.data

    // Is it showing previous data?
    const isLagging = swr.data === undefined && laggyDataRef.current !== undefined

    const isLoadingInitialData =
      swr.data === undefined && laggyDataRef.current == undefined && swr.isValidating

    // Also add a `isLagging` field to SWR.
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      isLoadingInitialData,
      resetLaggy,
    })
  }
}

export { laggy }
