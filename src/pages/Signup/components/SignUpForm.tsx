import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import { firebaseConfig } from '../../../constants/firebase'
import { FirebaseError } from '../../../types/firebase'
import { Routes } from '../../../constants/routes'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const SignUpForm = () => {
  const history = useHistory()
  const refEmail = useRef<HTMLInputElement | null>(null)
  const refPassword = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState<string | undefined>(undefined)

  const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const email = refEmail.current?.value
    const password = refPassword.current?.value
    if (email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          history.push(Routes.LANDING)
        })
        .catch((error: FirebaseError) => {
          setError(error.message)
        })
    }
  }

  return (
    <>
      <form>
        <label>
          Email address
          <input name="email" ref={refEmail} type="text" />
        </label>

        <label>
          Choose a password
          <input name="passwordOne" ref={refPassword} type="password" />
        </label>
        <button onClick={onSubmit} type="submit">
          Sign Up
        </button>

        {error && <p className="error-handling">{error}</p>}
      </form>
      <p>
        This tool is highly experimental and provided as-is. Don&apos;t be
        surprised if there are errors or data loss!
      </p>
    </>
  )
}
