// import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app'
import "firebase/auth"
import {firebaseConfig} from '../constants/firebase'


if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// var firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: "https://trackmap-f1119.firebaseio.com",
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID
// };

class Firebase {
  // constructor() {
  //     firebase.initializeApp(firebaseConfig);
  //     this.auth = firebase.auth();
  // }

  // *** Auth API ***

  // doCreateUserWithEmailAndPassword = (email, password) =>
  //   this.auth.createUserWithEmailAndPassword(email, password);
  //
  // doSignInWithEmailAndPassword = (email, password) =>
  //   this.auth.signInWithEmailAndPassword(email, password);
  //
  // doSignOut = () => this.auth.signOut();
  //
  // doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  //
  // doPasswordUpdate = password =>
  //   this.auth.currentUser.updatePassword(password);
}



export default Firebase;
