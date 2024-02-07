// PropertyForm.js
import React, { useState } from 'react'
import PropertyService from './PropertyService'

const PropertyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    location: '',
    imgUrl: '',
    numberOfRooms: '',
    propertyHomeType: '',
    propertySaleType: '',
    propertyStatus: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Construct data object using formData state
    const data = {
      location: formData.location,
      imgUrl: formData.imgUrl,
      numberOfRooms: formData.numberOfRooms,
      propertyHomeType: formData.propertyHomeType,
      propertySaleType: formData.propertySaleType,
      propertyStatus: formData.propertyStatus,
    }
    // Call onSubmit function with the data object
    onSubmit(data)
  }

  return (
    <div>
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="text"
          name="imgUrl"
          value={formData.imgUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <input
          type="number"
          name="numberOfRooms"
          value={formData.numberOfRooms}
          onChange={handleChange}
          placeholder="Number of Rooms"
        />
        <input
          type="text"
          name="propertyHomeType"
          value={formData.propertyHomeType}
          onChange={handleChange}
          placeholder="Home Type"
        />
        <input
          type="text"
          name="propertySaleType"
          value={formData.propertySaleType}
          onChange={handleChange}
          placeholder="Sale Type"
        />
        <input
          type="text"
          name="propertyStatus"
          value={formData.propertyStatus}
          onChange={handleChange}
          placeholder="Status"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default PropertyForm
