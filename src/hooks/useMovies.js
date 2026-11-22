import { useCallback, useEffect, useState } from 'react'
import { listMovies } from '../lib/moviesApi.js'

// GET /movies/ when the component mounts, with the three states of a request:
// 'loading', 'ready' (data) and 'error'.
//  - reload(): back to the loading state and ask again (used by "Try again").
//  - refresh(): ask again but keep the current table on screen (after a delete).
function useMovies() {
  const [requestId, setRequestId] = useState(0)
  const [result, setResult] = useState({ status: 'loading', movies: [], error: null, isRefreshing: false })

  useEffect(() => {
    const controller = new AbortController()

    listMovies({ signal: controller.signal })
      .then((movies) => setResult({ status: 'ready', movies, error: null, isRefreshing: false }))
      .catch((error) => {
        // An aborted request belongs to a screen that is gone: ignore it.
        if (controller.signal.aborted) return
        setResult({ status: 'error', movies: [], error, isRefreshing: false })
      })

    return () => controller.abort()
  }, [requestId])

  const reload = useCallback(() => {
    setResult({ status: 'loading', movies: [], error: null, isRefreshing: false })
    setRequestId((id) => id + 1)
  }, [])

  const refresh = useCallback(() => {
    setResult((current) => ({ ...current, isRefreshing: true }))
    setRequestId((id) => id + 1)
  }, [])

  return { ...result, reload, refresh }
}

export default useMovies
