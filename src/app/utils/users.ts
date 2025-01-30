import firebase from "firebase/compat/app";
import "firebase/compat/auth";

interface CheckCredentials {
  (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential | void>;
}

export const checkCredentials: CheckCredentials = async (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
  // .then((userCredential) => {
  // const payload = {
  //   userID: userCredential.user?.uid,
  //   userEmail: userCredential.user?.email,
  // }

  // return
  // })
};
