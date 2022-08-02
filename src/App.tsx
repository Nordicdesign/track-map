import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/styles/App.scss'

import { store } from './app/store'
import * as ROUTES from './constants/routes'

import { Header } from './comps/header/Header'
import { Homepage } from './fullpages/Homepage/Homepage'
import { ForgotPassword } from './fullpages/ForgotPassword/ForgotPassword'
import { LoginPage } from './fullpages/Login/LoginPage'
import { SignUpPage } from './fullpages/Signup/Signup'
import { Track } from './fullpages/Track/Track'

const App = () => {
  return (
    <div>
      <Router>
        <Provider store={store}>
          <Header />
          <div className="App">
            <Route exact path={ROUTES.LANDING} component={Homepage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPassword} />
            <Route path={ROUTES.SIGN_IN} component={LoginPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path="/tracks/:trackName" component={Track} />
          </div>
        </Provider>
      </Router>
    </div>
  )
}

export default App
