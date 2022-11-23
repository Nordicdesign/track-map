import { Link } from 'react-router-dom'

type Props = {
  route: string
  label: string
}
export const InlineLink = (props: Props) => {
  const { route, label } = props
  return (
    <Link className="inline-link" to={route}>
      {label}
    </Link>
  )
}
