import { Link } from 'react-router-dom'
import { Routes } from '../../../constants/routes'

export const Guest: React.FC = () => {
  return (
    <div className="guest">
      <h2>Sign up free</h2>
      <p>
        Start taking notes and improve your driving everytime you get on track.{' '}
      </p>
      <p>
        <button>
          <Link to={Routes.SIGN_UP}>Sign up</Link>
        </button>
      </p>
      <p>
        Already a user? <Link to="/login">Log in</Link>.
      </p>
    </div>
  )
}
