import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Header } from './components/header/Header'
import { Homepage } from './pages/Homepage/Homepage'
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword'
import { LoginPage } from './pages/Login/LoginPage'
import { SignUpPage } from './pages/Signup/Signup'
import { Track } from './pages/Track/Track'
import { Routes } from './constants/routes'
import './assets/styles/App.scss'

const App = () => {
  return (
    <Router>
      <Header />
      <div className="App">
        <Route exact path={Routes.LANDING} component={Homepage} />
        <Route path={Routes.PASSWORD_FORGET} component={ForgotPassword} />
        <Route path={Routes.SIGN_IN} component={LoginPage} />
        <Route path={Routes.SIGN_UP} component={SignUpPage} />
        <Route path="/tracks/:trackName" component={Track} />
      </div>
    </Router>
  )
}

export default App
