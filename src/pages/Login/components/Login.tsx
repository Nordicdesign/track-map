import { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import * as ROUTES from '../../../constants/routes'
import { useDispatch } from 'react-redux'
import { signIn } from '../../../app/users/usersSlice'
import { checkCredentials } from '../../../app/utils/users'

export const Login: React.FC = () => {
  // clear any garbage
  Cookies.remove('uid')
  Cookies.remove('email')

  const dispatch = useDispatch()
  const history = useHistory()
  const [error, setError] = useState<string | undefined>(undefined)
  const refEmail = useRef<HTMLInputElement | null>(null)
  const refPassword = useRef<HTMLInputElement | null>(null)

  const onSubmit = async (e: any) => {
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
          history.push(ROUTES.LANDING)
        })
        .catch((error: any) => {
          setError(error?.message)
        })
      // try {
      //   const response = await checkCredentials(email, password)
      //   if (!response) {
      //     return
      //   }
      //   const payload = {
      //     userID: response?.user?.uid,
      //     userEmail: response?.user?.email,
      //   }
      //   dispatch(signIn(payload))
      //   history.push(ROUTES.LANDING)
      // } catch ((error as any)) {
      //   if (error?.message) {
      //     setError(error?.message)
      //   }

      // }
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
