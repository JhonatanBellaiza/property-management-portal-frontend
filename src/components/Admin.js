import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Admin.css";

const Admin = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      // Fetch users from the backend using the provided endpoint
      axios.get('http://localhost:8080/api/admin')
        .then(response => {
          setUsers(response.data); // Assuming the response is an array of users
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }, []);
  
    return (
      <div className="container">
        <div className="user-list">
        <h2>Admin Dashboard</h2>
        </div>
        <div className="user-list">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.userType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="manage-requests-button">
          <button onClick={() => window.location.href = '/manage-requests'}>
            Manage Requests
          </button>
        </div>
      </div>
    );
  };

export default Admin;