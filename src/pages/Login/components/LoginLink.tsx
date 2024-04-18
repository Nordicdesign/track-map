import { Link } from 'react-router-dom'
import { Routes } from '../../../constants/routes'

export const LoginLink = () => (
  <p className="login-link">
    Already a user? <Link to={Routes.SIGN_IN}>Log in</Link>
  </p>
)
