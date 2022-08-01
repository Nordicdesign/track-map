import React, { useEffect, useState } from 'react'
import { Landing } from './components/Landing'
import { HomepageSignedIn } from './components/HomepageSignedIn'
import { RootState } from '../../app/store'
import { useSelector } from 'react-redux'

export const Homepage = () => {
  const userEmail = useSelector((state: RootState) => state.user.userEmail)
  const [loggedInUser, setLoggedInUser] = useState<boolean>(false)

  useEffect(() => {
    if (userEmail !== null) {
      setLoggedInUser(true)
    } else {
      setLoggedInUser(false)
    }
  }, [userEmail])

  return <>{loggedInUser ? <HomepageSignedIn /> : <Landing />}</>
}
