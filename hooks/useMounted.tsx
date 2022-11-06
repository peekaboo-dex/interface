import { useEffect, useState } from 'react'

const useMounted = () => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

export { useMounted }
