import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import * as firebase from 'firebase/app';
import "firebase/auth";
import { UserContext } from "../providers/UserProvider";



function User(props) {
  return (
    <span>{props.userEmail} - <button className="button-link" onClick={props.logout}>log out</button></span>
  )
}

const Header = () => {
  const user = useContext(UserContext);
  let [email, setEmail] = useState(null)

  useEffect(() => {
    if (user) {
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
      user.setUser(null)
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  return (
    <header>
      <p><Link to={ROUTES.LANDING}>TrackMap</Link></p>
      <p>
      { !user ? "" :
        email
          ?
            <User
              userEmail={email}
              logout={logout}
            />
          :
            <Link to={ROUTES.SIGN_IN}>Log in</Link>
      }
    </p>
    </header>
  )
}

export default Header;
