// React class-based error boundary — catches rendering errors in any child component tree.
// Displays a friendly fallback UI instead of a blank white screen crash.
// Must be a class component — React's error boundary API only works with getDerivedStateFromError.
import { Component } from 'react'
import styles from './ErrorBoundary.module.css'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Logged for debugging; silent in production
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.fallback}>
          <div className={styles.icon}>✦</div>
          <h2 className={styles.title}>Something went wrong</h2>
          <p className={styles.message}>
            The companion encountered an unexpected error.
            Refresh the page to continue your journey.
          </p>
          <button
            className={styles.reload}
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
