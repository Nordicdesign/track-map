import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'

import * as ROUTES from '../../../constants/routes'
import { firebaseConfig } from '../../../constants/firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const SignUpForm = () => {
  const history = useHistory()
  const refEmail = useRef<HTMLInputElement | null>(null)
  const refPassword = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState<string | undefined>(undefined)

  const onSubmit = (event: any) => {
    event.preventDefault()
    const email = refEmail.current?.value
    const password = refPassword.current?.value
    if (email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          console.log('user created')
          history.push(ROUTES.LANDING)
        })
        .catch((error: any) => {
          setError(error.message)
        })
    }
  }

  return (
    <>
      <form>
        <label>
          Email address
          <input
            name="email"
            ref={refEmail}
            // value={values.email}
            type="text"
            placeholder="Email Address"
          />
        </label>

        <label>
          Choose a password
          <input
            name="passwordOne"
            ref={refPassword}
            // value={values.passwordOne}
            type="password"
            placeholder="Password"
          />
        </label>
        <button onClick={onSubmit} type="submit">
          Sign Up
        </button>

        {error && <p className="error-handling">{error}</p>}
      </form>
      <p>
        This tool is highly experimental and provided as-is. Don't be surprised
        if there are errors or data loss!
      </p>
    </>
  )
}
