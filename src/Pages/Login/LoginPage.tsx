import React from 'react'
import { withRouter } from 'react-router-dom'

import { SignUpLink } from '../Signup/components/SignUpLink'
import { Login } from './components/Login'

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
