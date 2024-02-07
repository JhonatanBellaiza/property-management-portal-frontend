import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

const Login = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const loginData = {
      email,
      password,
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/login',
        loginData
      )
      if (response.status === 200) {
        const token = response.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('userId', response.data.user.id)
        localStorage.setItem('userType', response.data.user.userType)
        localStorage.setItem('userName', response.data.user.lastName)
        console.log(token)
        console.log('SUCCESSFUL LOGIN')
        console.log(response.data.user.userType)

        switch (response.data.user.userType) {
          case 'Owner':
            navigate('/owner-dashboard')
            break
          case 'Admin':
            navigate('/admin-dashboard')
            break
          default:
            navigate('/home')
            break
        }
        
      } else {
        console.error('Login failed')
        setError('Invalid email or password. Please try again.')
      }
    } catch (error) {
      console.error('An error occurred during login:', error)
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="login-container">
      <div className="p-6 space-y-4">
        <h1 className="login-header">Sign in to your account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              className="login-input"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              placeholder="••••••••"
              className="login-input"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="login-button">
            Sign in
          </button>
          <p className="text-sm font-light">
            Create an Account:{' '}
            <Link to="/signup" className="login-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
