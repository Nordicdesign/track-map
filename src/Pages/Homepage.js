import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { Landing } from '../Components/Landing'
import * as firebase from "firebase/app"
import "firebase/auth"
// import {firebaseConfig} from '../constants/firebase'

// if(!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export const Homepage = () => {

//   const initialFieldValues = {
//     signedIn: false,
//   }
//
//   let [values, setValues] = useState(initialFieldValues)
//
//
//   firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//   } else {
//     // No user is signed in.
//   }
// });

  let user = firebase.auth().currentUser;

  return (
    <div className="wrapper">
      { user ? <SignedIn /> : <Landing /> }
    </div>
  )
}

const SignedIn = () => {
  return (
      <div className="homepage">
        <main>
          <h1>Select a track</h1>
          <ul className="listCircuits">
            <li><Link to={ROUTES.BARCELONA}>Circuit de Catalunya (Barcelona)</Link></li>
            <li><Link to={ROUTES.DAYTONA}>Daytona - Road course</Link></li>
            <li><Link to={ROUTES.LEMANS}>Le Mans - Circuit de la Sarthe</Link></li>
            <li><Link to={ROUTES.BATHURST}>Mount Panorama - Bathurst</Link></li>
            <li><Link to={ROUTES.SEBRING}>Sebring</Link></li>
            <li><Link to={ROUTES.SHANGHAI}>Shanghai</Link></li>
            <li><Link to={ROUTES.SPA}>Spa-Franchorchamps</Link></li>
            <li><Link to={ROUTES.WATKINS}>Watkins Glen</Link></li>
            <li><Link to={ROUTES.ZOLDER}>Zolder</Link></li>
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
