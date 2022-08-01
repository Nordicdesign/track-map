import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

// import { firebaseConfig } from '../../constants/firebase'
import { SignUpLink } from '../Signup/components/SignUpLink'
import { Login } from './components/Login'

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig)
// }

const LoginPage = () => {
  return (
    <div className="signup-form">
      <h1>Log in</h1>
      <Login />
      <hr />
      <SignUpLink />
    </div>
  )
}

export default withRouter(LoginPage)
