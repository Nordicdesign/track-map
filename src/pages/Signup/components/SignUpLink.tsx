import { Link } from "react-router-dom";

import { Routes } from "../../../constants/routes";

export const SignUpLink = () => (
  <p className="login-link">
    Don&apos;t have an account? <Link to={Routes.SIGN_UP}>Sign up</Link>
  </p>
);
