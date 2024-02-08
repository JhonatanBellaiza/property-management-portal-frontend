import "./App.css";
import NavBarComponent from "./components/navbar/NavBarComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FooterComponent from "./components/footer/FooterComponent";
import LoginPage from "./pages/LoginPage"
import axios from "axios";
import { React, useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import AddProperty from "./pages/AddProperty";
import AdmninDashboard from "./pages/AdminDashboard"
import ManageRequest from "./pages/ManageRequestPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import PropertyPage from "./pages/PropertyPage";
import OfferPage from "./pages/OfferHistoryPage";
import LiveOfferPage from "./pages/LiveOfferPage";
import OfferHistoryPage from "./pages/OfferHistoryPage";
import AddOffer from "./pages/AddOffer";
import Home from "./pages/Home";
import ViewProperty from "./pages/ViewProperty";
import Favorite from "./pages/favorite";
import CustomerHistoryOffers from "./pages/CustomerHistoryOffers";
import CustomerLiveOffers from "./pages/CustomerLiveOffers";


axios.interceptors.request.use(function (config) {
  // get the request url
  // const url = config.url
  // if (config.url.endsWith('/auth') || config.url.endsWith('/users')) {
  //   return config
  // }
  const token = localStorage.getItem('token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403 )) {
      console.log('Unauthorized');
      window.location.href = '/login';
    }

    if(err.response.status == 400) {
      alert(err.response.data.errorMessage)
    }
    return Promise.reject(err)
  }
)

function App() {
  const userType = localStorage.getItem('userType');
  return (
    <div>
      <BrowserRouter>
        <NavBarComponent />
        <div>
          <Routes>
            {/* Public Routes */}
            <Route exect path="" element={<Home />}></Route>
            <Route path="/signup" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/propertyHome/:id" element={<ViewProperty />}></Route>


            {/* Private Routes */}
            {userType === 'Admin' && (
              <>
                <Route path="/admin-dashboard" element={<AdmninDashboard />}></Route>
                <Route path="/manage-requests" element={<ManageRequest />}></Route>
              </>
            )}
            {userType === 'Owner' && (
              <>
                <Route path="/add-property" element={<AddProperty />} />
                <Route path="/add-offer" element={<AddOffer />} />
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/owner-offer-history" element={<OfferHistoryPage />}></Route>
                <Route path="/owner-live-offers" element={<LiveOfferPage />}></Route>
                <Route path="/property/:id" element={<PropertyPage />}></Route>
              </>
            )}
            {userType === 'Customer' && (
              <>
              <Route path="/customer-offer-history" element={<CustomerHistoryOffers />}></Route>
              <Route path="/customer-offer-live" element={<CustomerLiveOffers />}></Route>
              <Route path="/favorite" element={<Favorite />}></Route>
              </>
            )}
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  )
}

export default App;