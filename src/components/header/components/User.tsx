type Props = {
  userEmail: string;
  logout: () => void;
};

export const User = (props: Props) => {
  const { userEmail, logout } = props;
  return (
    <span data-testid="header-email">
      {userEmail} -{" "}
      <button className="button-link" onClick={logout} data-testid="logout">
        log out
      </button>
    </span>
  );
};
