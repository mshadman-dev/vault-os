/**
 * CanvasErrorBoundary — catches WebGL context loss or R3F render errors.
 *
 * Renders a transparent fallback so the rest of the landing page remains
 * functional even if the WebGL context is unavailable (headless browsers,
 * privacy extensions that block canvas, etc.).
 */
import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    // Non-critical — log without surfacing to users.
    if (import.meta.env.DEV) {
      console.warn('[LandingCanvas] WebGL error caught:', error, info)
    }
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}
