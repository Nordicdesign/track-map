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
  const initial_state = {
    email: null
  }

  let [values, setValues] = useState(initial_state)

  useEffect(() => {
    if (user) {
      setValues({email:user.userEmail})
    }
  }, [user])

  const logout = () => {
    sessionStorage.clear()
    firebase.auth().signOut().then(function() {
      console.log("logged out!");
    })
    .then(() => {
      setValues({email: null})
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  return (
    <header>
      <p><Link to={ROUTES.LANDING}>TrackMap</Link></p>
      <p>
      { values.email
        ?
          <User
            userEmail={values.email}
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
