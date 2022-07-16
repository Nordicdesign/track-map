import React, { useState, useRef } from 'react'
import { withRouter, Link, useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import * as ROUTES from '../constants/routes'

import { firebaseConfig } from '../constants/firebase'
import { SignUpLink } from './Signup'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

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

const Login = () => {
  // clear any garbage
  sessionStorage.clear()

  const history = useHistory()
  const [error, setError] = useState<string | undefined>(undefined)
  const refEmail = useRef<HTMLInputElement | null>(null)
  const refPassword = useRef<HTMLInputElement | null>(null)

  const onSubmit = (e: any) => {
    e.preventDefault()
    const email = refEmail.current?.value
    const password = refPassword.current?.value
    if (email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push(ROUTES.LANDING)
        })
        .catch((error: any) => {
          console.error(error)
          setError(error.message)
        })
    }
  }

  // useEffect(() => {
  //   setValues({ ...values,
  //     email: refEmail.current?.value,
  //     password: refPassword.current?.value
  //   });
  //   // setValues(initialFieldValues)
  // }, [values.error]);

  return (
    <form autoComplete="off">
      <label>
        Email address
        <input
          name="email"
          id="email"
          ref={refEmail}
          // value={values.email}
          type="text"
          placeholder="Email Address"
        />
      </label>

      <label>
        Password
        <input
          name="password"
          id="password"
          ref={refPassword}
          // value={values.password}
          type="password"
          placeholder="Password"
        />
      </label>
      <button onClick={onSubmit}>Log In</button>

      {error && <p className="error-handling">{error}</p>}
      <p>
        Forgot your password?{' '}
        <Link to={ROUTES.PASSWORD_FORGET}>Get a new one</Link>
      </p>
    </form>
  )
}

const LoginLink = () => (
  <p className="login-link">
    Already a user? <Link to={ROUTES.SIGN_IN}>Log in</Link>
  </p>
)

export default withRouter(LoginPage)
export { LoginLink }
