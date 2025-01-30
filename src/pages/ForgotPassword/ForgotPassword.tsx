import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import 'firebase/auth'
import { Routes } from '../../constants/routes'

export const ForgotPassword = () => {
  const refEmail = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState<boolean>(false)

  const onSubmit = (event: any) => {
    event.preventDefault()
    setError(null)
    const email = refEmail.current?.value
    if (!email) {
      setError('Please enter a valid email address')
      return
    }

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true)
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <div className="wrapper">
      <h1>Get a new password</h1>
      {!emailSent ? (
        <form>
          <label>
            Email address
            <input
              name="email"
              ref={refEmail}
              type="email"
              placeholder="Email Address"
            />
          </label>
          <button type="submit" onClick={onSubmit}>
            Get a new password
          </button>
          {error && <p className="error-handling">{error}</p>}
        </form>
      ) : (
        <>
          <p>Done.</p>
          <p>
            If the email matches one in our database we&apos;ll send you an
            email containing a link to reset it.
          </p>
          <p>
            <Link to={Routes.LANDING}>Back to the homepage</Link>
          </p>
        </>
      )}
    </div>
  )
}
