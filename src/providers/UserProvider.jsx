import React, { createContext, Component } from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  }

  componentDidMount = () => {
    let that = this
    this.listener = firebase.auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        firebase.database()
          .ref(`/users/${userAuth.uid}/roles/`)
          .on('value', function(snapshot) {
            const dbUser = snapshot.val();
            // default empty roles
            // if (!dbUser.roles) {
            //   dbUser.roles = {};
            // }
            let user = {
              userID: userAuth.uid,
              userEmail: userAuth.email,
              ...dbUser
            }
            that.setState({ user });
          });
      }
      else {
        this.setState({
          user: 'guest'
        })
      }
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
