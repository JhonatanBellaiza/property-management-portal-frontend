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
import AdmninDashboard from "./pages/AdminDashboard"
import ManageRequest from "./pages/ManageRequestPage";
import OwnerDashboard from "./pages/OwnerDashboard";


axios.interceptors.request.use(function (config) {
  // get the request url
  const url = config.url
  if (config.url.endsWith('/auth') || config.url.endsWith('/users')) {
    return config
  }
  const token = sessionStorage.getItem('access_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (err) {
    console.log(err)
    if (err.resposne.status === 401 || err.response.status === 403) {
      console.log('Unauthorized')
      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('refresh_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

function App() {
  return (
    <div>
        <BrowserRouter>
          <NavBarComponent />
          <div>
            <Routes>
              {/*  <Route exect path="/" element={<Home />}></Route>
              <Route path="/home" element={<Properties />}></Route>  */}
              <Route path="/add-property" element={<AddProperty />}></Route>
              <Route path="/signup" element={<RegisterPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/admin-dashboard" element={<AdmninDashboard />}></Route>
              <Route path="/manage-requests" element={<ManageRequest />}></Route>
              <Route path="/owner-dashboard" element={<OwnerDashboard />}></Route>
            </Routes>
          </div>
          <FooterComponent />
        </BrowserRouter>
    </div>
  )
}

export default App;