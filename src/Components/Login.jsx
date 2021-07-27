import React, { useState, useEffect } from 'react'
import * as firebase from "firebase/app"
import "firebase/auth"
import * as ROUTES from '../constants/routes'
// import * as ROLES from '../constants/roles';
import { withRouter, Link, useHistory } from 'react-router-dom'
import {firebaseConfig} from '../constants/firebase'
import { SignUpLink } from './Signup'

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LoginPage = () => {
  return (
    <div className="signup-form">
      <h1>Log in</h1>
      <Login />
      <hr />
      <SignUpLink />
    </div>
  )
}

const Login = () => {
  // clear any garbage
  sessionStorage.clear()

  let history = useHistory();
  // let database = firebase.database();

  const initialFieldValues = {
    email: '',
    password: '',
    error: null
  }
  let [values, setValues] = useState(initialFieldValues)

  const onSubmit = event => {
    event.preventDefault();
    // const roles = {}
    // roles[ROLES.ADMIN] = ROLES.ADMIN;
    // console.log(roles);
    const { email, password } = values
    firebase.auth().signInWithEmailAndPassword(email,password)
      // .then(authUser => {
      //   // console.log(authUser.user.uid);
      //   database
      //     .ref('/users/' + authUser.user.uid + '/roles/').set(
      //       roles,
      //       err => {
      //         if (err) console.log(err);
      //       }
      //     )
      // })
      .then(() => {
        history.push(ROUTES.LANDING);
      })
    .catch(error => {
      setValues({ error });
    });
  };

  const handleChange = e => {
      var { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
  }

  useEffect(() => {
    let email = document.querySelector('#email');
    let pss = document.querySelector('#password');
    setValues({ ...values,
      email: email.value,
      password: pss.value
    });
    // setValues(initialFieldValues)
  }, [values.error])

    // const isInvalid =
    //   password === '' ||
    //   email === '';

    return (
        <form autoComplete="off">
          <label>
            Email address
            <input
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              type="text"
              placeholder="Email Address"
            />
          </label>

          <label>
            Password
            <input
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
          </label>
        <button onClick={onSubmit}>Log In</button>

          {values.error && <p className="error-handling">{values.error.message}</p>}
          <p>Forgot your password? <Link to={ROUTES.PASSWORD_FORGET}>Get a new one</Link></p>
        </form>
    )
  }

const LoginLink = (props) => (
  <p className="login-link">
    Already a user? <Link to={ROUTES.SIGN_IN}>Log in</Link>
  </p>
);

export default withRouter(LoginPage);
export {LoginLink};
