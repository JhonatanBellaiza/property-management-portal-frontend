import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import AlertTemplate from "react-alert-template-basic";
import { transitions, positions, Provider as AlertProvider } from "react-alert";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    transition: transitions.SCALE,
  };
  useEffect(() => {
    let mount = true;
    const token = localStorage.getItem("token");
    if (token) {
      if (mount) {
        setIsLoggedIn(true);
      }
    } else {
      if (mount) {
        setIsLoggedIn(false);
      }
    }
    return () => {
      mount = false;
    };
  }, []);

  return (
    <AlertProvider template=  {AlertTemplate} {...options} >
      <div>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          accessToken,
          setAccessToken,
          refreshToken,
          setRefreshToken,
        }}
      >
        <BrowserRouter>
          <NavBarComponent />
          <div>
            <Routes>
             {/*  <Route exect path="/" element={<Home />}></Route>
              <Route path="/home" element={<Properties />}></Route>  */} 
               <Route path="/add-property" element={<AddProperty />}></Route>
              <Route path="/signup" element={<RegisterPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
          </div>
          <FooterComponent />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
    </AlertProvider>
  );
}

export default App;
