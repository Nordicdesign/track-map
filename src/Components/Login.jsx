import React, {Component} from 'react'
// import { Link } from 'react-router-dom'
import * as firebase from "firebase/app"
import "firebase/auth"
import * as ROUTES from '../constants/routes'

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

class Login extends Component {
  // componentDidMount() {
  //   // const ui = new firebaseui.auth.AuthUI(firebase.auth());
  //   // ui.start('#firebaseui-auth-container', uiConfig);
  // }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(authUser => {
        // this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
    .catch(error => {
      this.setState({ error });
    });
  };

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    // const isInvalid =
    //   password === '' ||
    //   email === '';

    return (
      <div>
        <h1>Log in</h1>
        <form>
          <label>
            Email address
            <input
              name="email"
              value={email}
              onChange={this.handleChange}
              type="text"
              placeholder="Email Address"
            />
          </label>

          <label>
            Password
            <input
              name="password"
              value={password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </label>
        <button type="submit" onClick={this.onSubmit}>Log In</button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const LoginLink = (props) => (
  <div className="login-link">
  <p>
    Already a user? <a onClick={props.toggle}>Log in</a>
  </p>
  </div>
);

export default Login;
export {LoginLink};
