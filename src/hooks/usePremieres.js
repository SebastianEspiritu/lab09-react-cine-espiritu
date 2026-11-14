import { useEffect, useState } from 'react'
import adaptMovie from '../lib/adaptMovie.js'
import { failRequestedInUrl, fetchPremieres } from '../lib/api.js'

// Loads the premieres and exposes the three states of a request:
// 'loading', 'ready' and 'error', plus reload() to try again.
function usePremieres() {
  const [request, setRequest] = useState(() => ({ id: 0, shouldFail: failRequestedInUrl() }))
  const [result, setResult] = useState({ status: 'loading', premieres: [], error: null })

  useEffect(() => {
    let isCurrent = true

    fetchPremieres({ shouldFail: request.shouldFail })
      .then((rawPremieres) => {
        if (isCurrent) setResult({ status: 'ready', premieres: rawPremieres.map(adaptMovie), error: null })
      })
      .catch((error) => {
        if (isCurrent) setResult({ status: 'error', premieres: [], error })
      })

    // If the request changes or the component unmounts, ignore the old answer.
    return () => {
      isCurrent = false
    }
  }, [request])

  function reload({ shouldFail = false } = {}) {
    setResult({ status: 'loading', premieres: [], error: null })
    setRequest((current) => ({ id: current.id + 1, shouldFail }))
  }

  return { ...result, reload }
}

export default usePremieres
