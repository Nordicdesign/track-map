import { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useDispatch } from 'react-redux'
import { signIn } from '../../../app/users/usersSlice'
import { checkCredentials } from '../../../app/utils/users'
import { FirebaseError } from '../../../types/firebase'
import { Routes } from '../../../constants/routes'

export const Login = () => {
  // clear any garbage
  Cookies.remove('uid')
  Cookies.remove('email')

  const dispatch = useDispatch()
  const history = useHistory()
  const [error, setError] = useState<string | undefined>(undefined)
  const refEmail = useRef<HTMLInputElement | null>(null)
  const refPassword = useRef<HTMLInputElement | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const email = refEmail.current?.value
    const password = refPassword.current?.value

    if (email && password) {
      checkCredentials(email, password)
        .then((response) => {
          const uid = response?.user?.uid
          const email = response?.user?.email
          const payload = {
            userID: uid,
            userEmail: email,
          }
          uid && Cookies.set('uid', uid, { expires: 7 })
          email && Cookies.set('email', email, { expires: 7 })
          dispatch(signIn(payload))
          history.push(Routes.LANDING)
        })
        .catch((error: FirebaseError) => {
          setError(error?.message)
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
        />
      </label>

      <label>
        Password
        <input
          name="password"
          id="password"
          ref={refPassword}
          type="password"
        />
      </label>
      <button onClick={onSubmit}>Log In</button>

      {error && <p className="error-handling">{error}</p>}
      <p>
        Forgot your password?{' '}
        <Link to={Routes.PASSWORD_FORGET}>Get a new one</Link>
      </p>
    </form>
  )
}
