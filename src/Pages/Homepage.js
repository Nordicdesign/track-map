import React, { useContext } from 'react'
import { Landing } from '../Components/Landing'
import { HomepageSignedIn } from '../Components/HomepageSignedIn'
import { UserContext } from "../providers/UserProvider";

export const Homepage = () => {
  const user = useContext(UserContext);

  return (
    <div className="wrapper">
      {!user ? <Loading/> :
         (user === 'guest') ? <Landing /> : <HomepageSignedIn />
      }
    </div>
  )
}

const Loading = () => {
  return (
    <p>loading...</p>
  )
}
