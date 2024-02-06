import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import the CSS file

const API_URL = "http://localhost:8080/api/register";

const InputField = ({ label, type, name, placeholder, required }) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className="input-field"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const Register = () => {
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password, firstName, lastName } = event.target.elements;

      const roleId = isOwner ? 2 : 3;

      const response = await axios.post(API_URL, {
        email: email.value,
        password: password.value,
        firstname: firstName.value,
        lastname: lastName.value,
        status: 0,
        isSend: false,
        role: { id: roleId },
      });

      if (response.status === 200) {
        //alert.success("Registered successfully");
        console.log('SUCCESSFUL REGISTERED')
        navigate('/');
      }
    } catch (error) {
      //alert.error("Registration failed. Please try again.");
    }
  };

  const handleCheckboxChange = (event) => {
    setIsOwner(event.target.checked);
  };

  return (
    <div className="register-container">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="register-title">Create an account</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <InputField label="First Name" type="text" name="firstName" placeholder="Enter your first name" required />
          <InputField label="Last Name" type="text" name="lastName" placeholder="Enter your last name" required />
          <InputField label="Email" type="email" name="email" placeholder="name@company.com" required />
          <InputField label="Password" type="password" name="password" placeholder="••••••••" required />

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="register-checkbox"
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                  Sign up as {isOwner ? "Owner" : "User"}
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;