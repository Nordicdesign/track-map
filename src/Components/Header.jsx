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
    console.log(this.state);
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, passwordOne } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, passwordOne)
      // .then(authUser => {
      //   this.setState({ ...INITIAL_STATE });
      //   // this.props.history.push(ROUTES.SPA);
      // })
      .then(something => {
        console.log('yeah!');
        // this.setState

      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    console.log(this.state);
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var userEmail = user.email;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;

        console.log(isAnonymous);
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
    // var user = firebase.auth().currentUser;
    // var name, email, photoUrl, uid, emailVerified;
    // if (user != null) {
    //   name = user.displayName;
    //   email = user.email;
    //   photoUrl = user.photoURL;
    //   emailVerified = user.emailVerified;
    //   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    //                    // this value to authenticate with your backend server, if
    //                    // you have one. Use User.getToken() instead.
    // }
    // console.log(user);

  }

  componentDidUpdate() {
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     var useremail = user.email;
    //     var isAnonymous = user.isAnonymous;
    //     var uid = user.uid;
    //
    //     console.log(isAnonymous);
    //     console.log(uid);
    //     console.log(useremail);
    //     // ...
    //   } else {
    //     // User is signed out.
    //     console.log("user signed out");
    //   }
    // });

  }



  render() {

    const {
      email,
      passwordOne,
      error,
    } = this.state;

    const isInvalid =
      // passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

      console.log(this.state);

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

        : <p>{this.state.userEmail}. <a>Sign out</a></p> }
      </header>
    )
  }
}

export default Header;

// export {SignIn};
