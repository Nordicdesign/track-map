import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.scss'
import * as ROUTES from './constants/routes';

import Header from './Components/Header'
import {Homepage} from './Pages/Homepage'
import ForgotPassword from './Pages/ForgotPassword'
import NotLoggedIn from './Components/NotLoggedIn'
import Spa from './Pages/Spa'
import LaSarthe from './Pages/LaSarthe'
import Sebring from './Pages/Sebring'
import Shanghai from './Pages/Shanghai'
import Watkins from './Pages/Watkins-glen'
import Bathurst from './Pages/Mount-panorama'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <>
          <Header />
          <div className="App">
             <Route exact path={ROUTES.LANDING} component={Homepage}/>
             <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPassword}/>
             <Route path={ROUTES.SIGN_IN} component={NotLoggedIn}/>
             <Route path={ROUTES.SPA} component={Spa}/>
             <Route path={ROUTES.LEMANS} component={LaSarthe}/>
             <Route path={ROUTES.SHANGHAI} component={Shanghai}/>
             <Route path={ROUTES.WATKINS} component={Watkins}/>
             <Route path={ROUTES.SEBRING} component={Sebring}/>
             <Route path={ROUTES.BATHURST} component={Bathurst}/>
          </div>
          </>
      </Router>
    </div>
    );
  }
}

export default App;
