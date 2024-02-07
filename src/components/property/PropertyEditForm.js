import React, { useState } from 'react'

const PropertyEditForm = ({ property, onSave, onCancel }) => {
  const [updatedProperty, setUpdatedProperty] = useState(property)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedProperty((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(updatedProperty)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Location:</label>
        <input
          type="text"
          className="form-control"
          name="location"
          value={updatedProperty.location}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Home Type:</label>
        <select
          className="form-control"
          name="propertyHomeType"
          value={updatedProperty.propertyHomeType}
          onChange={handleChange}
        >
          <option value="">Select Home Type</option>
          <option value="Congo">Congo</option>
          <option value="Duplex">Duplex</option>
          <option value="Apartment">Apartment</option>
          <option value="Ranch">Ranch</option>
          <option value="TownHouse">TownHouse</option>
        </select>
      </div>
      <div className="form-group">
        <label>Sale Type:</label>
        <select
          className="form-control"
          name="propertySaleType"
          value={updatedProperty.propertySaleType}
          onChange={handleChange}
        >
          <option value="">Select Sale Type</option>
          <option value="Rent">Rent</option>
          <option value="Sale">Sale</option>
        </select>
      </div>
      <div className="form-group">
        <label>Number of Rooms:</label>
        <input
          type="number"
          className="form-control"
          name="numberOfRooms"
          value={updatedProperty.numberOfRooms}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select
          className="form-control"
          name="propertyStatus"
          value={updatedProperty.propertyStatus}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Available">Available</option>
          <option value="Pending">Pending</option>
          <option value="Contingent">Contingent</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mr-2">
        Save
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

export default PropertyEditForm
