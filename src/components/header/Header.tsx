import { useEffect } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/compat/app";
import Cookies from "js-cookie";

import { User } from "./components/User";
import { RootState } from "../../app/store";
import { logOut, signIn } from "../../app/users/usersSlice";
import { ScreenRoutes } from "../../constants/routes";

export const Header = () => {
  const userEmail = useSelector((state: RootState) => state.user.userEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = firebase.auth();

  const match = useMatch("/tracks/:track");
  const isTrackPage = match ? true : false;

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logOut());
        navigate(ScreenRoutes.LANDING);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
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
          <Link to={ScreenRoutes.LANDING}>TrackMap</Link>
        </h1>
        {isTrackPage ? (
          <p className="back-track-list">
            <Link to={ScreenRoutes.LANDING}>&lt; Back to track list</Link>
          </p>
        ) : null}
      </div>

      <p className="header-userInfo">
        {userEmail ? (
          <User userEmail={userEmail} logout={logout} />
        ) : (
          <Link data-testid="header-login" to={ScreenRoutes.SIGN_IN}>
            Log in
          </Link>
        )}
      </p>
    </header>
  );
};
