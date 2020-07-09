import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export const Landing = () => {
  return (
    <div>
      <div className="wrapper homepage">
        <main>
          <h1>Track map</h1>
          <p>Trackmap helps you capture track notes in a digital way, so you can improve your driving faster.</p>

          <p>For each turn you can say whether you had oversteer or understeer, and write some thoughts on best way to approach it, braking points, etc.</p>
          <p>The project is at early beta so expect bare minimum functionality and things to not work at all! Use at your own risk.</p>
          <p>Any suggestions please drop me a line to <a href="mailto:alex.lillo@gmail.com">alex.lillo@gmail.com</a>.</p>
          <hr/>
          <p><Link to={ROUTES.SIGN_IN}>Log in to your account</Link></p>
          <p><Link to={ROUTES.SIGN_UP}>Create an account</Link></p>
        </main>
      </div>
    </div>
  )
}
