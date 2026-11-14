import { useEffect, useState } from 'react'

// Short-lived notification. showToast() replaces the current message and
// restarts the timer; the message hides itself after `duration` ms.
function useToast(duration = 3000) {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return undefined
    const timerId = setTimeout(() => setToast(null), duration)
    return () => clearTimeout(timerId)
  }, [toast, duration])

  function showToast(message, tone = 'info') {
    setToast({ id: Date.now(), message, tone })
  }

  function hideToast() {
    setToast(null)
  }

  return { toast, showToast, hideToast }
}

export default useToast
