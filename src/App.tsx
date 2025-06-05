import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components/header/Header";
import { Homepage } from "./pages/Homepage/Homepage";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignUpPage } from "./pages/Signup/Signup";
import { Track } from "./pages/Track/Track";
import { ScreenRoutes } from "./constants/routes";
import "./assets/styles/App.scss";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={ScreenRoutes.LANDING} element={<Homepage />} />
          <Route
            path={ScreenRoutes.PASSWORD_FORGET}
            element={<ForgotPassword />}
          />
          <Route path={ScreenRoutes.SIGN_IN} element={<LoginPage />} />
          <Route path={ScreenRoutes.SIGN_UP} element={<SignUpPage />} />
          <Route path="/tracks/:trackName" element={<Track />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
