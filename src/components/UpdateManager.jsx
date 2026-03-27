import { useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdateManager() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (!registration) return
      const check = () => {
        if (document.visibilityState === 'visible') {
          registration.update().catch(() => {})
        }
      }
      document.addEventListener('visibilitychange', check)
      setInterval(check, 60_000)
    },
  })

  // Clear badge when app opens
  useEffect(() => {
    if ('clearAppBadge' in navigator) navigator.clearAppBadge()
  }, [])

  // Set badge and silently reload when new SW is waiting
  useEffect(() => {
    if (!needRefresh) return
    if ('setAppBadge' in navigator) navigator.setAppBadge(1)
    const t = setTimeout(() => updateServiceWorker(true), 200)
    return () => clearTimeout(t)
  }, [needRefresh, updateServiceWorker])

  return null
}
