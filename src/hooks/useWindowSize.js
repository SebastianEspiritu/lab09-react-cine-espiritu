import { useEffect, useState } from 'react'
import useDebounce from './useDebounce.js'

function readSize() {
  return { width: window.innerWidth, height: window.innerHeight }
}

// Current window size. Resize events are debounced so components only
// re-render once the user stops resizing.
function useWindowSize(delay = 150) {
  const [size, setSize] = useState(readSize)

  useEffect(() => {
    function handleResize() {
      setSize(readSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return useDebounce(size, delay)
}

export default useWindowSize
