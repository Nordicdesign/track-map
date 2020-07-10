import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.scss'
import * as ROUTES from './constants/routes';

import UserProvider from './providers/UserProvider'
import Header from './Components/Header'
import {Homepage} from './Pages/Homepage'
import ForgotPassword from './Pages/ForgotPassword'
// import NotLoggedIn from './Components/NotLoggedIn'
import LoginPage from './Components/Login'
import SignUpForm from './Components/Signup';

// import tracks
import Spa from './Pages/Spa'
import LaSarthe from './Pages/LaSarthe'
import Sebring from './Pages/Sebring'
import Shanghai from './Pages/Shanghai'
import Watkins from './Pages/Watkins-glen'
import Bathurst from './Pages/Mount-panorama'
import Zolder from './Pages/Zolder'
import Daytona from './Pages/Daytona'
import Barcelona from './Pages/Barcelona'
import RoadAmerica from './Pages/RoadAmerica'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <UserProvider>
            <Header />
            <div className="App">
               <Route exact path={ROUTES.LANDING} component={Homepage}/>
               <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPassword}/>
               <Route path={ROUTES.SIGN_IN} component={LoginPage}/>
               <Route path={ROUTES.SIGN_UP} component={SignUpForm}/>
               <Route path={ROUTES.SPA} component={Spa}/>
               <Route path={ROUTES.LEMANS} component={LaSarthe}/>
               <Route path={ROUTES.SHANGHAI} component={Shanghai}/>
               <Route path={ROUTES.WATKINS} component={Watkins}/>
               <Route path={ROUTES.SEBRING} component={Sebring}/>
               <Route path={ROUTES.BATHURST} component={Bathurst}/>
               <Route path={ROUTES.ZOLDER} component={Zolder}/>
               <Route path={ROUTES.DAYTONA} component={Daytona}/>
               <Route path={ROUTES.BARCELONA} component={Barcelona}/>
               <Route path={ROUTES.ROADAMERICA} component={RoadAmerica}/>
            </div>
        </UserProvider>
      </Router>
    </div>
    );
  }
}

export default App;
