import { Link } from 'react-router-dom'

export const NoTrack = () => {
  return (
    <div className="wrapper">
      <h1 data-testid="not-found">Can&apos;t find that track</h1>
      <p>
        <Link to="/">Try again please</Link>
      </p>
    </div>
  )
}
