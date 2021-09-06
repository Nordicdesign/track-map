import React, { useContext } from 'react'
import { Landing } from '../Components/Landing'
import { HomepageSignedIn } from '../Components/HomepageSignedIn'
import { UserContext } from "../providers/UserProvider";

export const Homepage = () => {
  const user = useContext(UserContext);

  return (
    <>
      {!user ? <Loading/> :
         (user === null) ? <Landing /> : <HomepageSignedIn />
      }
    </>
  )
}

const Loading = () => {
  return (
    <p>loading...</p>
  )
}
