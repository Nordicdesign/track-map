import React, { createContext, Component } from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";


export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(userAuth => {
      this.setState({
        user: {
          userID: userAuth.uid,
          userEmail: userAuth.email
        }

      });
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider
