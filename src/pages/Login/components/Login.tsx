import { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'

import * as ROUTES from '../../../constants/routes'
import { useDispatch } from 'react-redux'
import { signIn } from '../../../app/users/usersSlice'

export const Login: React.FC = () => {
  // clear any garbage
  sessionStorage.clear()

  const dispatch = useDispatch()
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
        .then((userCredential) => {
          const payload = {
            userID: userCredential.user?.uid,
            userEmail: userCredential.user?.email,
          }
          dispatch(signIn(payload))
          history.push(ROUTES.LANDING)
        })
        .catch((error: any) => {
          setError(error.message)
        })
    }
  }

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
