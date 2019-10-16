import React, { Component } from 'react';
import * as firebase from "firebase/app"
import "firebase/auth"
import * as ROUTES from '../constants/routes'
import {firebaseConfig} from '../constants/firebase'

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SignUpPage = () => (
  <div>
    <h1>Create an account</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  error: '',
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  };

  onSubmit = event => {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.passwordOne)
      .then(authUser => {
        console.log("user created");
        // this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      email,
      passwordOne,
      error,
    } = this.state;

    const isInvalid =
      passwordOne === '' ||
      email === '';

    return (
      <form>
        <label>
          Email address
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </label>

        <label>
          Choose a password
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </label>
        <button disabled={isInvalid} onClick={this.onSubmit} type="submit">Sign Up</button>

        {error && <p className="error-handling">{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = (props) => (
  <p className="login-link">
    Don't have an account? <button className="button-link" onClick={props.toggle}>Sign up</button>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
