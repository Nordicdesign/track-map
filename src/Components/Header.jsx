import React, { Component } from 'react'
import * as ROUTES from '../constants/routes'
// import Firebase from './Firebase'
import * as firebase from 'firebase/app';
import "firebase/auth";
import * as renderIf from 'render-if';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  error: null,
  authUser: null,
};

function User(props) {
  return (
    <span>{props.userEmail} - <a onClick={props.logout}>log out</a></span>
  )
}

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, ...INITIAL_STATE }
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
    return (
      <header>
        <p><a href={ROUTES.LANDING}>TrackMap</a></p>
        <p>
        { this.state.authUser ?
          <User
            userEmail={this.state.userEmail}
            logout={this.logout}
          /> : `` }
      </p>
      </header>
    )
  }
}

export default Header;
