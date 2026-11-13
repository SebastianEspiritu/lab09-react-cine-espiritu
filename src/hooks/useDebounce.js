import { useEffect, useState } from 'react'

// Returns the value only after it has stopped changing for `delay` milliseconds.
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timerId)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
