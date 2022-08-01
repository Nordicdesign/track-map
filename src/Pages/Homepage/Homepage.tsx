import React from 'react'
import { Landing } from './components/Landing'
import { HomepageSignedIn } from './components/HomepageSignedIn'
import { RootState } from '../../app/store'
import { useSelector } from 'react-redux'
// import { UserContext } from '../../providers/UserProvider'

export const Homepage = () => {
  const userEmail = useSelector((state: RootState) => state.user.userEmail)

  return (
    <>
      {!userEmail ? (
        <Loading />
      ) : userEmail === null ? (
        <Landing />
      ) : (
        <HomepageSignedIn />
      )}
    </>
  )
}

const Loading = () => {
  return <p>loading...</p>
}
