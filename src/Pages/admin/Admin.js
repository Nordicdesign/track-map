import React, { useContext } from 'react'
// import { useHistory, withRouter } from 'react-router-dom'
import { UserContext } from "../../providers/UserProvider";
import UserList from './Components/UserList'

export const Admin = () => {

  // for the context API
  // static contextType = UserContext;
  const user = useContext(UserContext);
  return (

    <div className="wrapper">
      {!user ? <Loading/> :
        (user === 'guest') ? <Guest /> :
          (user.ADMIN === 'ADMIN') ? <LeAdmin /> : <Guest />
      }
    </div>
  )
}

const LeAdmin = () => {
  return (
    <>
      <h1>Hi admin</h1>
      <UserList/>
    </>
  )
}

const Guest = () => {
  return (
    <div className="guest">
      <h2>Nothing to see here</h2>
      <p>Start taking notes and improve your driving everytime you get on track. </p>
    </div>
  )
}

const Loading = () => {
  return (
    <p>loading...</p>
  )
}
