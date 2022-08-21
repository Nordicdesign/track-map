import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/app'

import * as ROUTES from '../../constants/routes'
import { User } from './components/User'
import { RootState } from '../../app/store'
import { logOut, signIn } from '../../app/users/usersSlice'
import { firebaseConfig } from '../../constants/firebase'
import Cookies from 'js-cookie'

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
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const uid = Cookies.get('uid')
    const email = Cookies.get('email')

    if (uid !== undefined && email !== undefined) {
      const payload = {
        userID: uid,
        userEmail: email,
      }
      dispatch(signIn(payload))
    }
  }, [])

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
