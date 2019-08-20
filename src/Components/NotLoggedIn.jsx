import React from 'react'
import Login from './Login'

export const NotLoggedIn = () => {
  return (
    <div className="not-loggged-in">
      <div>
        <h1>Create an account</h1>
      </div>
      <div>
        <h1>Log in</h1>
        <Login />
      </div>

    </div>
  )
}
