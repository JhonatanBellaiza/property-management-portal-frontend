import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  //const alert = useAlert();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/login", loginData);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("role_id", response.data.user.userType);
        console.log(token)
        //alert.success("Logged in")
        console.log('SUCCESSFUL LOGIN')
        navigate("/home");
      } else {
        console.error("Login failed");
       // alert.error("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      //alert.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="p-6 space-y-4">
        <h1 className="login-header">Sign in to your account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
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
            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
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
          <button
            type="submit"
            className="login-button"
            onClick={handleSubmit}
          >
            Sign in
          </button >
          <p className="text-sm font-light">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="login-link"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;