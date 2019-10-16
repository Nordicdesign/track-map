import React, { Component } from 'react';
import * as firebase from 'firebase/app'
import "firebase/database"

class SessionCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      sent: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.createNewSession = this.createNewSession.bind(this);
  }

  handleChange(event) {
    this.setState({inputText: event.target.value});
  }

  createNewSession(event) {
    // alert('A name was submitted: ' + this.state.inputText);
    const trackID = this.props.trackID;
    const authUser = this.props.authUser;
    const inputText = this.state.inputText
    const sessionData = {
        name: inputText
    }

    console.log("let's create a new session!", sessionData);
    event.preventDefault();

    // add them to a new session
    let newSession = firebase.database().ref('/users/' + authUser + '/tracks/' + trackID + '/sessions/').push();
    newSession.set(sessionData)

    // console.log('session created ✅');
  }



  render() {
    let sent = this.state.sent;
    const isEnabled = this.state.inputText.length > 0;

    return (

      <div className="session-creator">
        {!sent ?
          <form onSubmit={this.createNewSession}>
            <label>New session</label>
            <input
              type="text"
              value={this.state.inputText}
              onChange={this.handleChange}
            />
            <input type="submit" disabled={!isEnabled} value="Create" />
          </form> :
          <p>Session Created</p>
        }

      </div>
    )
  }
}

export default SessionCreator;
