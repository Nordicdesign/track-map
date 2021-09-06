import React, { createContext, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";

const initialValues = { userID:null, userEmail: null}

export const UserContext = createContext(initialValues);

const UserProvider = (props) => {
  const [user, setUser] = useState(initialValues)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        setUser({
          userID: userAuth.uid,
          userEmail: userAuth.email
        });
      }
      else {
        setUser(initialValues)
      }
    });
  },[])

  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider
