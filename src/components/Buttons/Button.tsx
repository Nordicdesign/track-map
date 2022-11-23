import clsx from 'clsx'
import { Link } from 'react-router-dom'

enum ButtonTypeEnum {
  primary = 'primary',
  secondary = 'secondary',
}
type Props = {
  route: string
  label: string
  type?: keyof typeof ButtonTypeEnum
}
export const Button = (props: Props) => {
  const { route, label, type = 'primary' } = props
  return (
    <button
      className={clsx(
        'btn',
        type === 'primary' && 'primary',
        type === 'secondary' && 'btn__secondary',
      )}
    >
      <Link to={route}>{label}</Link>
    </button>
  )
}
