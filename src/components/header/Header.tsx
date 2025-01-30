import { useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";

import { User } from "./components/User";
import { RootState } from "../../app/store";
import { logOut, signIn } from "../../app/users/usersSlice";
import { firebaseConfig } from "../../constants/firebase";
import Cookies from "js-cookie";
import { Routes } from "../../constants/routes";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const Header = () => {
  const userEmail = useSelector((state: RootState) => state.user.userEmail);
  const dispatch = useDispatch();
  const history = useHistory();

  const match = useRouteMatch("/tracks/:track");
  const isTrackPage = match?.isExact;

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // console.log('logged out!')
        dispatch(logOut());
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const uid = Cookies.get("uid");
    const email = Cookies.get("email");

    if (uid !== undefined && email !== undefined) {
      const payload = {
        userID: uid,
        userEmail: email,
      };
      dispatch(signIn(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header>
      <div>
        <h1 data-testid="header-name">
          <Link to={Routes.LANDING}>TrackMap</Link>
        </h1>
        {isTrackPage ? (
          <p className="back-track-list">
            <Link to={Routes.LANDING}>&lt; Back to track list</Link>
          </p>
        ) : null}
      </div>

      <p className="header-userInfo">
        {userEmail ? (
          <User userEmail={userEmail} logout={logout} />
        ) : (
          <Link data-testid="header-login" to={Routes.SIGN_IN}>
            Log in
          </Link>
        )}
      </p>
    </header>
  );
};
