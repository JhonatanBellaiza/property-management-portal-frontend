import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import AuthContext from '../../AuthContext'
import { useContext } from 'react'

const NavBarComponent = () => {
  const auth = useContext(AuthContext)

  localStorage.getItem("role_id")
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    window.location.href = '/login'
  }

  const isLoggedIn = () => {
    // Check if the token exists in local storage
    if (localStorage.getItem('token')) {
      return true // Return true if token exists
    } else {
      return false // Return false if token doesn't exist
    }
  }

  const populateLogOut = () => {
    if (isLoggedIn()) {
      return (
        <Link onClick={logout} type="button" class="btn btn-outline-light me-2">
          Logout
        </Link>
      )
    }
  }

  const populateLogIn = () => {
    if (!isLoggedIn()) {
      return (
        <Link to={'/login'} type="button" class="btn btn-outline-light me-2">
          Login
        </Link>
      )
    }
  }

  const populateSignUp = () => {
    if (!isLoggedIn()) {
      return (
        <Link to={'/signup'} type="button" class="btn btn-warning">
          Sign-up
        </Link>
      )
    }
  }

  const isOwner = () => {
    const userType = localStorage.getItem('userType')
    console.log(userType)
    return userType == 'Owner' ? true : false
  }

  const hasRoleOwner = () => {
    try {
      if (auth.user.realm_access.roles.includes('Owner')) {
        return true
      }
    } catch (error) {
      return false
    }
  }
  const hasRoleAdmin = () => {
    try {
      if (auth.user.realm_access.roles.includes('Admin')) {
        return true
      }
    } catch (error) {
      return false
    }
  }
  const hasRoleCustomer = () => {
    try {
      if (localStorage.getItem("userType"
      ) == "Customer") {
        return true
      } else { 
        return false
      }
    } catch (error) {
      return false
    }
  }

  const populateAddProperty = () => {
    console.log(isOwner())
    if (isOwner()) {
      return (
        <>
          <Link to={'/add-property'} className="nav-link px-2 text-white">
            Add Property
          </Link>
          <Link to={'/owner-offer-history'} className="nav-link px-2 text-white">
            Offer History
          </Link>
          <Link to={'/owner-live-offers'} className="nav-link px-2 text-white">
            Live Offers
          </Link>
        </>
      )
    }
  }

  const populatUserManagement = () => {
    let userManagement = ''
    if (hasRoleAdmin()) {
      userManagement = (
        <li>
          <Link to={'/users'} class="nav-link px-2 text-white">
            User Management
          </Link>
        </li>
      )
    }
    return userManagement
  }
  const populateFavorite = () => {
    let favorite = ''
    if (hasRoleCustomer()) {
      favorite = (
        <li>
          <Link to={'/favorite'} class="nav-link px-2 text-white">
            My favorites
          </Link>
        </li>
      )
    }
    return favorite
  }

  return (
    <header class="text-bg-primary p-3">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to={'/home'}
            class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-houses-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.5 2.5 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354z" />
              <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708z" />
            </svg>
          </Link>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to={'/home'} class="nav-link px-2 text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to={'/Chart'} class="nav-link px-2 text-white">
                About
              </Link>
            </li>
            {populateFavorite()}
            {populatUserManagement()}
            {populateAddProperty()}
          </ul>

          <div class="text-end">
            {populateLogIn()}
            {populateLogOut()}
            {populateSignUp()}
          </div>
        </div>
      </div>
    </header>
  )
}
export default NavBarComponent
