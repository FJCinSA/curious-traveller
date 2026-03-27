// Silently manages PWA service worker updates. Renders nothing — runs in the background.
//
// Behaviour:
//   • Polls for a new SW version whenever the tab becomes visible, and every 60 seconds.
//   • Sets the OS app icon badge when an update is waiting.
//   • Clears the badge immediately when the app is opened.
//   • Silently reloads 200 ms after detecting an update — no user action required.
import { useEffect, useRef } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdateManager() {
  // Holds cleanup functions for the SW polling listeners so they can be
  // removed if this component ever unmounts (correct practice even though
  // UpdateManager lives for the app's full lifetime)
  const cleanupRef = useRef(null)

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (!registration) return

      // Ask the SW to check for updates whenever the tab becomes visible
      const check = () => {
        if (document.visibilityState === 'visible') {
          registration.update().catch(() => {})
        }
      }

      document.addEventListener('visibilitychange', check)
      const interval = setInterval(check, 60_000)

      // Store cleanup functions so they run on unmount
      cleanupRef.current = () => {
        document.removeEventListener('visibilitychange', check)
        clearInterval(interval)
      }
    },
  })

  // Remove SW polling listeners when the component unmounts
  useEffect(() => {
    return () => cleanupRef.current?.()
  }, [])

  // Clear the OS app icon badge whenever the app is opened
  useEffect(() => {
    if ('clearAppBadge' in navigator) navigator.clearAppBadge()
  }, [])

  // When a new SW version is waiting: set the badge dot, then silently reload
  useEffect(() => {
    if (!needRefresh) return
    if ('setAppBadge' in navigator) navigator.setAppBadge(1)
    const t = setTimeout(() => updateServiceWorker(true), 200)
    return () => clearTimeout(t)
  }, [needRefresh, updateServiceWorker])

  return null
}
