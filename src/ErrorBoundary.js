// mostly code from reactjs.org/docs/error-boundaries.html
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>There was an error loading the page.</h2>
          <p>
            <Link to="/">Click here</Link> to back to the home page.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
