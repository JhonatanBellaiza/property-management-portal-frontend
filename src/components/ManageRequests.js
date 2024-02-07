import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ManageRequests.css";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/changeStatusRequests", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []); // Run once when the component mounts

  const handleStatusChange = async (userId) => {
    try {
      await axios.get(`http://localhost:8080/api/admin/${userId}/changeStatus`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setRequests((prevRequests) => prevRequests.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error changing user status:", error);
    }
  };

  return (
    <div className="manage-requests-container">
      <h1 className="manage-requests-title">Manage Requests</h1>
      {requests.length > 0 ? (
        <table className="user-requests-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((user) => (
              <tr key={user.id} className="user-request-item">
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => handleStatusChange(user.id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You don't have pending requests...</p>
      )}
      <Link to="/dashboard">Go Back to Dashboard</Link>
    </div>
  );
};

export default ManageRequests;
