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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "Customer",
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
      const { email, password, firstName, lastName, userType } = formData;

      try {
        const response = await axios.post(API_URL, {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          active: true,
          userType: userType,
        });

        // Display success message and redirect to login after a short delay
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigate('/login');
        }, 3000); // Adjust the delay time as needed
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errorMessage) {
          // Display the specific error message from the backend
          setShowErrorMessage(error.response.data.errorMessage);
        } else {
          console.error("Registration failed. Please try again.", error);
        }
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
              onChange={handleInputChange}
              value={formData.userType}
            >
              <option value="Customer" >Customer</option>
              <option value="Owner">Owner</option>
            </select>
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>
          {showSuccessMessage && (
            <div className="success-message">
              Registration successful! Redirecting to login page...
            </div>
          )}
          {showErrorMessage && (
            <div className="error-message">
              {showErrorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;