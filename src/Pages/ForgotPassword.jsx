import React, {Component} from 'react'
// import { Link } from 'react-router-dom'
import * as firebase from "firebase/app"
import "firebase/auth"
import * as ROUTES from '../constants/routes'
import firebaseConfig from '../constants/firebase.js'

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      sent: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    firebase.auth().sendPasswordResetEmail(this.state.email)
      .then(authUser => {
        this.setState({ sent: true });
      })
    .catch(error => {
      this.setState({ error });
    });
  };



  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid =
      email === '';

    console.log(this.state.sent);

    return (
      <div className="wrapper">
        <h1>Get a new password</h1>
        {!this.state.sent
          ?
          <form>
            <label>
              Email address
              <input
                name="email"
                value={email}
                onChange={this.handleChange}
                type="email"
                placeholder="Email Address"
              />
            </label>
            <button disabled={isInvalid} type="submit" onClick={this.onSubmit}>Get a new password</button>
            {error && <p className="error-handling">{error.message}</p>}
          </form>
          :
          <>
          <p>Done.</p>
          <p>If the email matches one in our database we'll send you an email containing a link to reset it.</p>
          </>
        }

      </div>
    );
  }
}

export default ForgotPassword;
