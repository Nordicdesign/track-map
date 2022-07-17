// import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss'
import * as ROUTES from './constants/routes'

import { UserProvider } from './providers/UserProvider'
import { Header } from './Components/Header/Header'
import { Homepage } from './Pages/Homepage'
import ForgotPassword from './Pages/ForgotPassword'
import LoginPage from './Components/Login'
import { SignUpForm } from './Components/Signup'
import Track from './Pages/Track'

const App = () => {
  return (
    <div>
      <Router>
        <UserProvider>
          <Header />
          <div className="App">
            <Route exact path={ROUTES.LANDING} component={Homepage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPassword} />
            <Route path={ROUTES.SIGN_IN} component={LoginPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpForm} />
            <Route path="/tracks/:trackName" component={Track} />
          </div>
        </UserProvider>
      </Router>
    </div>
  )
}

export default App
