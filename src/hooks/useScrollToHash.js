import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router does not scroll to "/#section" by itself. Once the page content
// is ready, move to the element named in the hash.
function useScrollToHash(isReady) {
  const { hash } = useLocation()

  useEffect(() => {
    if (!isReady || !hash) return
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    target?.scrollIntoView({ block: 'start' })
  }, [hash, isReady])
}

export default useScrollToHash
