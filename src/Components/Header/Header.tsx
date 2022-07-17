import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import firebase from 'firebase/app'
import { User } from './components/User'
import { UserContext } from '../../providers/UserProvider'

export const Header: React.FC = () => {
  const user = useContext(UserContext)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    if (user.user != null) {
      setEmail(user.user.userEmail)
    }
  }, [user])

  const logout = () => {
    sessionStorage.clear()
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logged out!')
        setEmail(null)
        user.setUser!({ userID: null, userEmail: null })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <header>
      <p data-testid="header-name">
        <Link to={ROUTES.LANDING}>TrackMap</Link>
      </p>
      <p>
        {!user ? (
          ''
        ) : email ? (
          <User userEmail={email} logout={logout} />
        ) : (
          <Link data-testid="login" to={ROUTES.SIGN_IN}>
            Log in
          </Link>
        )}
      </p>
    </header>
  )
}
