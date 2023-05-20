import { LoginLink } from '../Login/components/LoginLink'
import { SignUpForm } from './components/SignUpForm'

export const SignUpPage = () => (
  <div className="signup-form">
    <h1>Create an account</h1>
    <SignUpForm />
    <hr />
    <LoginLink />
  </div>
)
