import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/styles/App.scss'

import { store } from './app/store'
import * as ROUTES from './constants/routes'

// import { UserProvider } from './providers/UserProvider'
import { Header } from './components/Header/Header'
import { Homepage } from './pages/Homepage/Homepage'
import ForgotPassword from './pages/ForgotPassword'
import LoginPage from './pages/Login/LoginPage'
import { SignUpPage } from './pages/Signup/Signup'
import { Track } from './pages/Track/Track'

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
