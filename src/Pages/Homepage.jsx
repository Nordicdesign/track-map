import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export const Homepage = () => {
  return (
    <div>
      <div className="wrapper">
        <h1>TrackMap</h1>
        <ul className="listCircuits">
          <li><Link to={ROUTES.SPA}>Spa Franchorchamps</Link></li>
          <li><Link to={ROUTES.LEMANS}>Le Mans - Circuit de la Sarthe</Link></li>
          <li><Link to={ROUTES.SHANGHAI}>Shanghai</Link></li>
          <li><Link to={ROUTES.WATKINS}>Watkins Glen</Link></li>
        </ul>
        <h2>About this tool</h2>
        <p>Blah</p>
      </div>
    </div>
  )
}
