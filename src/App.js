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
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        {isLoggedIn ? (
          <>
            <Route
              path="/home"
              element={
                <>
                  {/* <Header />
                  <Home />
                  <Footer /> */}
                </>
              }
            />
            <Route
              path="/property"
              element={
                <>
                  {/* <Header />
                  <Property />
                  <Footer /> */}
                </>
              }
            />
            <Route
              path="/property/:id" // Define dynamic route for property ID
              element={
                <>
                  {/* <Header />
                  <Property />
                  <Footer /> */}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {/* <Header />
                  <Profile />
                  <Footer /> */}
                </>
              }
            />
          </>
        ) : null}
      </Routes>
    </Router>
    </AlertProvider>
  );
}

export default App;
