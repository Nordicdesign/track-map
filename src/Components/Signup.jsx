import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import * as firebase from "firebase/app"
import "firebase/auth"
import * as ROUTES from '../constants/routes'
import {firebaseConfig} from '../constants/firebase'
import {LoginLink} from './Login'

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SignUpPage = () => (
  <div className="signup-form">
    <h1>Create an account</h1>
    <SignUpForm />
    <hr/>
    <LoginLink />
  </div>
);

const SignUpForm = () => {

  let history = useHistory();

  const initialFieldValues = {
    email: '',
    passwordOne: '',
    error: ''
  }
  let [values, setValues] = useState(initialFieldValues)


  const onSubmit = event => {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(values.email, values.passwordOne)
      .then(authUser => {
        console.log("user created");
        history.push(ROUTES.LANDING);
      })
      .catch(error => {
        setValues({ error });
      })
  }

  const handleChange = e => {
      var { name, value } = e.target
      setValues({
        ...values,
        [name]: value
      })
  }

  const isInvalid =
    values.passwordOne === '' ||
    values.email === '';

    return (
        <form>
          <label>
            Email address
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              type="text"
              placeholder="Email Address"
            />
          </label>

          <label>
            Choose a password
            <input
              name="passwordOne"
              value={values.passwordOne}
              onChange={handleChange}
              type="password"
              placeholder="Password"
            />
          </label>
          <button disabled={isInvalid} onClick={onSubmit} type="submit">Sign Up</button>

          {values.error && <p className="error-handling">{values.error.message}</p>}
        </form>
    );
}

const SignUpLink = (props) => (
  <p className="login-link">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
