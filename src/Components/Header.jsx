import React, { Component } from 'react'
import * as ROUTES from '../constants/routes'
// import Firebase from './Firebase'
import * as firebase from 'firebase/app';
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyD2-YAZ1Spbo1dltQItBTcUqcq_ues930k",
    authDomain: "trackmap-f1119.firebaseapp.com",
    databaseURL: "https://trackmap-f1119.firebaseio.com",
    projectId: "trackmap-f1119",
    storageBucket: "trackmap-f1119.appspot.com",
    messagingSenderId: "488157650119",
    appId: "1:488157650119:web:c4d401fdd7dcdc87"
  };

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  error: null,
  authUser: null,
};

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, passwordOne } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, passwordOne)
      // .then(authUser => {
      //   this.setState({ ...INITIAL_STATE });
      //   // this.props.history.push(ROUTES.SPA);
      // })
      .catch(error => {
        this.setState({ error });
      });
  }

  logout = () => {
    firebase.auth().signOut().then(function() {
      console.log("logged out!");
    })
    .then(authUser => {
      this.setState({
        authUser: null,
        userEmail: null,
        error: null
      })
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var userEmail = user.email;
        var uid = user.uid;

        console.log(uid);
        console.log(userEmail);
        // ...
        that.setState({
          authUser: uid,
          userEmail: userEmail
        })
      } else {
        // User is signed out.
        console.log("user signed out");
      }
    });
  }

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
      <header>
        <p><a href={ROUTES.LANDING}>TrackMap</a></p>

        {!this.state.authUser ?
          <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">Sign In</button>

          {error && <p>{error.message}</p>}
        </form>

        : <p>{this.state.userEmail}. <button onClick={this.logout}>Sign out</button></p> }
      </header>
    )
  }
}

export default Header;
