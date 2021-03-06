import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export const HomepageSignedIn = () => {
  return (
      <div className="homepage">
        <main>
          <h1>Select a track</h1>
          <h2>North America</h2>
          <ul className="listCircuits">
            <li><Link to={ROUTES.MOSPORT}>Canadian Tire Motorsport Park - Mosport</Link></li>
            <li><Link to={ROUTES.DAYTONA}>Daytona - Road course</Link></li>
            <li><Link to={ROUTES.LAGUNA}>Laguna Seca</Link></li>
            <li><Link to={ROUTES.ROADAMERICA}>Road America</Link></li>
            <li><Link to={ROUTES.ROADATLANTA}>Road Atlanta</Link></li>
            <li><Link to={ROUTES.SEBRING}>Sebring</Link></li>
            <li><Link to={ROUTES.WATKINS}>Watkins Glen</Link></li>
          </ul>
          <h2>Europe</h2>
          <ul className="listCircuits">
            <li><Link to={ROUTES.BARCELONA}>Circuit de Catalunya (Barcelona)</Link></li>
            <li><Link to={ROUTES.LEMANS}>Le Mans - Circuit de la Sarthe</Link></li>
            <li><Link to={ROUTES.MAGIONE}>Magione</Link></li>
            <li><Link to={ROUTES.MUGELLO}>Mugello</Link></li>
            <li><Link to={ROUTES.NURBURGRING}>Nurburgring</Link></li>
            <li><Link to={ROUTES.SILVERSTONE}>Silverstone</Link></li>
            <li><Link to={ROUTES.SPA}>Spa-Franchorchamps</Link></li>
            <li><Link to={ROUTES.VALLELUNGA}>Vallelunga</Link></li>
            <li><Link to={ROUTES.ZANDVOORT}>Zandvoort</Link></li>
            <li><Link to={ROUTES.ZOLDER}>Zolder</Link></li>
          </ul>
          <h2>Asia</h2>
          <ul className="listCircuits">
            <li><Link to={ROUTES.SHANGHAI}>Shanghai</Link></li>
            <li><Link to={ROUTES.SUZUKA}>Suzuka</Link></li>
          </ul>
          <h2>Australia</h2>
          <ul className="listCircuits">
            <li><Link to={ROUTES.BATHURST}>Mount Panorama - Bathurst</Link></li>
          </ul>
        </main>
        <aside>
          <h2>About this tool</h2>
          <p>Trackmap helps you capture track notes in a digital way, so you can improve your driving faster.</p>

          <p>For each turn you can say whether you had oversteer or understeer, and write some thoughts on best way to approach it, braking points, etc.</p>
          <p>The project is at early beta so expect bare minimum functionality and things to not work at all! Use at your own risk.</p>
          <p>Any suggestions please drop me a line to <a href="mailto:alex.lillo@gmail.com">alex.lillo@gmail.com</a>.</p>
        </aside>
      </div>
    )
}
