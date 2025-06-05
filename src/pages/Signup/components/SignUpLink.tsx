import { Link } from "react-router-dom";

import { ScreenRoutes } from "../../../constants/routes";

export const SignUpLink = () => (
  <p className="login-link">
    Don&apos;t have an account? <Link to={ScreenRoutes.SIGN_UP}>Sign up</Link>
  </p>
);
