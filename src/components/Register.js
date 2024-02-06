import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import the CSS file

const API_URL = "http://localhost:8080/api/register";

const InputField = ({ label, type, name, placeholder, required, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className={`input-field ${error ? "border-red-500" : ""}`}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
    {error && <span className="text-red-500">{error}</span>}
  </div>
);

const Register = () => {
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = "This field is required";
      }
    });

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const { email, password, firstName, lastName } = formData;

        const roleId = userType === "owner" ? 2 : 3;

        const response = await axios.post(API_URL, {
          email,
          password,
          firstname: firstName,
          lastname: lastName,
          status: 0,
          isSend: false,
          role: { id: roleId },
        });

        if (response.status === 200) {
          console.log('SUCCESSFUL REGISTERED')
          navigate('/');
        }
      } catch (error) {
        console.error("Registration failed. Please try again.", error);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="register-title">Create an account</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <InputField
            label="First Name"
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            error={formErrors.firstName}
          />

          <InputField
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            error={formErrors.lastName}
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="name@company.com"
            required
            value={formData.email}
            onChange={handleInputChange}
            error={formErrors.email}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={handleInputChange}
            error={formErrors.password}
          />

          <div className="mb-4">
            <label htmlFor="userType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              className="input-field"
              onChange={(e) => setUserType(e.target.value)}
              value={userType}
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </select>
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