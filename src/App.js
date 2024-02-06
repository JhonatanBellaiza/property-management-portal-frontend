import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register"  />
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
  );
}

export default App;
