import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

export const SignUpLink = () => (
  <p className="login-link">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
  </p>
)
