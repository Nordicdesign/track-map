import { Button } from '../../../components/Buttons/Button'
import { InlineLink } from '../../../components/Buttons/InlineLink'
import * as ROUTES from '../../../constants/routes'

export const Guest: React.FC = () => {
  return (
    <div className="guest">
      <h2>Sign up free</h2>
      <p>
        Start taking notes and improve your driving everytime you get on track.
      </p>
      <p>
        <Button label="Sign up" route={ROUTES.SIGN_UP} />
      </p>
      <p>
        Already a user? <InlineLink label="Log in" route={ROUTES.SIGN_IN} />.
      </p>
    </div>
  )
}
