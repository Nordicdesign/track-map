import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export const Homepage = () => {
  return (
    <div>
      <div className="wrapper homepage">
        <h1>TrackMap</h1>
        <ul className="listCircuits">
          <li><Link to={ROUTES.LEMANS}>Le Mans - Circuit de la Sarthe</Link></li>
          <li><Link to={ROUTES.SEBRING}>Sebring</Link></li>
          <li><Link to={ROUTES.SHANGHAI}>Shanghai</Link></li>
          <li><Link to={ROUTES.SPA}>Spa Franchorchamps</Link></li>
          <li><Link to={ROUTES.WATKINS}>Watkins Glen</Link></li>
          <li><Link to={ROUTES.BATHURST}>Mount Panorama</Link></li>
        </ul>
        <h2>About this tool</h2>
        <p>Trackmap is a digital way to capture notes to help you learn a circuit. For each turn you can say whether you had oversteer or understeer, and write some thoughts on best way to approach it, braking points, etc.</p>
        <p>This is just an MVP so expect bare minimum functionality and things to not work at all! Use at your own risk.</p>
        <p>Any suggestions please drop me a line to <a href="mailto:alex.lillo@gmail.com">alex.lillo@gmail.com</a>.</p>
      </div>
    </div>
  )
}
