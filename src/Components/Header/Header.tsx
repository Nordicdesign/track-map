import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/app'

import * as ROUTES from '../../constants/routes'
import { User } from './components/User'
import { RootState } from '../../app/store'
import { logOut } from '../../app/users/usersSlice'

export const Header: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null)
  const userEmail = useSelector((state: RootState) => state.user.userEmail)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userEmail != null) {
      setEmail(userEmail)
    }
  }, [userEmail])

  const logout = () => {
    sessionStorage.clear()
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logged out!')
        setEmail(null)
        dispatch(logOut)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <header>
      <h1 data-testid="header-name">
        <Link to={ROUTES.LANDING}>TrackMap</Link>
      </h1>
      <p>
        {email ? (
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
