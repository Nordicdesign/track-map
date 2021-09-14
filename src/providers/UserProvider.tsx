import React, { createContext, useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";

interface UserContextInterface {
  user: UserType | null;
  setUser: (UserType: UserType) => void;
}

export type UserType = {
    userID:string | null,
    userEmail: string | null
}

const initialValues: UserType = {
  userID: null,
  userEmail: null
}

export const UserContext = createContext<Partial<UserContextInterface>>({});

const UserProvider = (props:any) => {
  const [user, setUser] = useState(initialValues)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        setUser({
          userID: userAuth.uid,
          userEmail: userAuth.email
        });
        console.log("just set",user);
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
