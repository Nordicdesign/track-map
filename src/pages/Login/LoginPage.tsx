import { SignUpLink } from "../Signup/components/SignUpLink";
import { Login } from "./components/Login";

export const LoginPage = () => {
  return (
    <div className="signup-form">
      <h1>Welcome back</h1>
      <Login />
      <hr />
      <SignUpLink />
    </div>
  );
};
