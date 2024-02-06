<<<<<<< HEAD
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
=======
import "./App.css";
import NavBarComponent from "./components/navbar/NavBarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FooterComponent from "./components/footer/FooterComponent";
import LoginPage from "./pages/LoginPage"
import axios from "axios";
import AuthContext from "./AuthContext";
import { React, useState } from "react";
import AddPropertyModal from "./AddPropertyModal";
import RegisterPage from "./pages/RegisterPage";
import AddProperty from "./pages/AddProperty";


axios.interceptors.request.use(function (config) {
  // get the request url
  const url = config.url;
  if (config.url.endsWith("/auth") || config.url.endsWith("/users")) {
    return config;
  }
  const token = sessionStorage.getItem("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    console.log(err);
    if (err.resposne.status === 401 || err.response.status === 403) {
      console.log("Unauthorized");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  return (
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
>>>>>>> a5776a64ea353fa98dcf2886b79726978fc8191a
  );
}

export default App;
