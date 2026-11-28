import { useCallback, useEffect, useState } from 'react'

// Runs `load({ signal })` (a service function) when the component mounts and
// whenever `load` changes, and exposes the three states of the request:
// 'loading', 'ready' (data) and 'error'.
//  - reload(): show the loading state again and repeat the request.
//  - refresh(): repeat the request but keep the current data on screen.
// `load` must be stable: a service function or one wrapped in useCallback.
function useResource(load) {
  const [requestId, setRequestId] = useState(0)
  const [result, setResult] = useState({ source: null, status: 'loading', data: null, error: null, isRefreshing: false })

  useEffect(() => {
    const controller = new AbortController()

    load({ signal: controller.signal })
      .then((data) => setResult({ source: load, status: 'ready', data, error: null, isRefreshing: false }))
      .catch((error) => {
        // An aborted request belongs to a screen (or a filter) that is gone.
        if (controller.signal.aborted) return
        setResult({ source: load, status: 'error', data: null, error, isRefreshing: false })
      })

    return () => controller.abort()
  }, [load, requestId])

  const reload = useCallback(() => {
    setResult((current) => ({ ...current, source: null }))
    setRequestId((id) => id + 1)
  }, [])

  const refresh = useCallback(() => {
    setResult((current) => ({ ...current, isRefreshing: true }))
    setRequestId((id) => id + 1)
  }, [])

  // A result that belongs to an older `load` (for example, another category)
  // is not shown: the screen is loading the new one.
  const isCurrent = result.source === load
  return {
    status: isCurrent ? result.status : 'loading',
    data: isCurrent ? result.data : null,
    error: isCurrent ? result.error : null,
    isRefreshing: isCurrent && result.isRefreshing,
    reload,
    refresh,
  }
}

export default useResource
