import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import * as ROUTES from '../constants/routes'

var firebaseConfig = {
  apiKey: 'AIzaSyD2-YAZ1Spbo1dltQItBTcUqcq_ues930k',
  authDomain: 'trackmap-f1119.firebaseapp.com',
  databaseURL: 'https://trackmap-f1119.firebaseio.com',
  projectId: 'trackmap-f1119',
  storageBucket: 'trackmap-f1119.appspot.com',
  messagingSenderId: '488157650119',
  appId: '1:488157650119:web:c4d401fdd7dcdc87',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      error: '',
      sent: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then((authUser) => {
        this.setState({ sent: true })
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  render() {
    const { email, error } = this.state

    const isInvalid = email === ''

    console.log(this.state.sent)

    return (
      <div className="wrapper">
        <h1>Get a new password</h1>
        {!this.state.sent ? (
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
            <button disabled={isInvalid} type="submit" onClick={this.onSubmit}>
              Get a new password
            </button>
            {error && <p className="error-handling">{error.message}</p>}
          </form>
        ) : (
          <>
            <p>Done.</p>
            <p>
              If the email matches one in our database we'll send you an email
              containing a link to reset it.
            </p>
            <p>
              <Link to={ROUTES.LANDING}>Back to the homepage</Link>
            </p>
          </>
        )}
      </div>
    )
  }
}

export default ForgotPassword
