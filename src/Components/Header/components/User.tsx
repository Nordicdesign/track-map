export const User = (props: {
  userEmail:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
  logout: React.MouseEventHandler<HTMLButtonElement> | undefined
}) => {
  return (
    <span data-testid="email">
      {props.userEmail} -{' '}
      <button
        className="button-link"
        onClick={props.logout}
        data-testid="logout"
      >
        log out
      </button>
    </span>
  )
}
