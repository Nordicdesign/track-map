import React, {Component} from 'react'
import Login, {LoginLink} from './Login'
import SignUpForm, {SignUpLink} from './Signup'

class NotLoggedIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      SignUpOn: 'signup',
    }
  }

  toggle = event => {
    event.preventDefault();
    (this.state.SignUpOn === 'signup') ? this.setState({SignUpOn: 'login'}) : this.setState({SignUpOn: 'signup'})
  }

  render() {
    return (
      <div className="not-loggged-in">
      {(this.state.SignUpOn === 'signup') ?
        <>
        <SignUpForm />
        <LoginLink toggle={this.toggle} />
        </>
      :
        <>
        <Login />
        <SignUpLink toggle={this.toggle} />
        </>
     }
      </div>
    )
  }
}

export default NotLoggedIn;
