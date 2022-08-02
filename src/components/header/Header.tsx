import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/app'

import * as ROUTES from '../../constants/routes'
import { User } from './components/User'
import { RootState } from '../../app/store'
import { logOut } from '../../app/users/usersSlice'
import { firebaseConfig } from '../../constants/firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const Header: React.FC = () => {
  const userEmail = useSelector((state: RootState) => state.user.userEmail)
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logged out!')
        dispatch(logOut())
        history.push('/')
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
        {userEmail ? (
          <User userEmail={userEmail} logout={logout} />
        ) : (
          <Link data-testid="header-login" to={ROUTES.SIGN_IN}>
            Log in
          </Link>
        )}
      </p>
    </header>
  )
}
