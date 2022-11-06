import React, { useState, useEffect } from 'react'
import range from 'lodash/range'

const LoadingDots = React.memo(() => {
  const MAX_DOTS = 3
  const [dotCounter, setDotCounter] = useState(MAX_DOTS - 1) // always start off with full dots
  const numberOfDots = (dotCounter % MAX_DOTS) + 1
  useEffect(() => {
    const tick = setInterval(() => {
      setDotCounter((i) => i + 1)
    }, 300)
    return () => {
      clearInterval(tick)
    }
  }, [])
  return (
    <span style={{ display: 'inline-flex', width: 20, justifyContent: 'flex-start' }}>
      {range(numberOfDots)
        .map((_) => '.')
        .join('')}
    </span>
  )
})

LoadingDots.displayName = 'LoadingDots'

export { LoadingDots }
