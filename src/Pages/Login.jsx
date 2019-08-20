import React, { Component } from 'react'
// import * as firebase from "firebase/app";
// import Firebase from '../Components/Firebase'
// import * as firebaseui from 'firebaseui'
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"


// let uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     }
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: '/',
//   signInOptions: [
//     // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       requireDisplayName: false
//     }
//   ],
//   // Terms of service url.
//   tosUrl: '/terms-conditions',
//   // Privacy policy url.
//   privacyPolicyUrl: '/privacy-policy'
// };


class Login extends Component {

  componentDidMount() {
    // const ui = new firebaseui.auth.AuthUI(firebase.auth());
    // ui.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return (
      <div>
        <h1>Track Map</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default Login;
