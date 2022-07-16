import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import firebase from 'firebase/app';
// import "firebase/auth";
import { UserContext } from "../providers/UserProvider";



function User(props) {
  return (
    <span data-testid="email">{props.userEmail} - <button className="button-link" onClick={props.logout} data-testid="logout">log out</button></span>
  )
}

const Header = () => {
  const user = useContext(UserContext);
  let [email, setEmail] = useState(null)

  useEffect(() => {
    if (user.user != null) {
      setEmail(user.user.userEmail)
    }
  }, [user])

  const logout = () => {
    sessionStorage.clear()
    firebase.auth().signOut().then(function() {
      console.log("logged out!");
    })
    .then(() => {
      setEmail(null)
      user.setUser({userID: null, userEmail: null})
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  return (
    <header>
      <p data-testid="header-name"><Link to={ROUTES.LANDING}>TrackMap</Link></p>
      <p>
      { !user ? "" :
        email
          ?
            <User
              userEmail={email}
              logout={logout}
            />
          :
            <Link data-testid="login" to={ROUTES.SIGN_IN}>Log in</Link>
      }
    </p>
    </header>
  )
}

export default Header;
