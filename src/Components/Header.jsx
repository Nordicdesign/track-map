import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import * as firebase from 'firebase/app';
import "firebase/auth";

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  error: null,
  authUser: null,
};

function User(props) {
  return (
    <span>{props.userEmail} - <button className="button-link" onClick={props.logout}>log out</button></span>
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
        <p><Link to={ROUTES.LANDING}>TrackMap</Link></p>
        <p>
        { this.state.authUser
          ?
            <User
              userEmail={this.state.userEmail}
              logout={this.logout}
            />
          :
            <Link to={ROUTES.SIGN_IN}>Log in</Link>
        }
      </p>
      </header>
    )
  }
}

export default Header;
