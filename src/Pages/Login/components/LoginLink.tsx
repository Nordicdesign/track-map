import { Link } from 'react-router-dom'

import * as ROUTES from '../../../constants/routes'

export const LoginLink = () => (
  <p className="login-link">
    Already a user? <Link to={ROUTES.SIGN_IN}>Log in</Link>
  </p>
)
