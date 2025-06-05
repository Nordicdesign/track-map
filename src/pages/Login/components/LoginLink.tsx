import { Link } from "react-router-dom";

import { ScreenRoutes } from "../../../constants/routes";

export const LoginLink = () => (
  <p className="login-link">
    Already a user? <Link to={ScreenRoutes.SIGN_IN}>Log in</Link>
  </p>
);
