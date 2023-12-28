import { useEffect } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
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

export const Header = () => {
  const userEmail = useSelector((state: RootState) => state.user.userEmail)
  const dispatch = useDispatch()
  const history = useHistory()

  const match = useRouteMatch('/tracks/:track')
  console.log(match)
  const isTrackPage = match?.isExact

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
      <div>
        <h1 data-testid="header-name">
          <Link to={ROUTES.LANDING}>TrackMap</Link>
        </h1>
        {isTrackPage ? (
          <p>
            <Link to={ROUTES.LANDING}>&lt; Back to track list</Link>
          </p>
        ) : null}
      </div>

      <p className="header-userInfo">
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
