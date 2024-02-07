import React, { useState } from 'react'

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
    const data = {
      location: formData.location,
      imgUrl: formData.imgUrl,
      numberOfRooms: formData.numberOfRooms,
      propertyHomeType: formData.propertyHomeType,
      propertySaleType: formData.propertySaleType,
      propertyStatus: formData.propertyStatus,
    }
    onSubmit(data)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group py-2">
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>
        <div className="form-group py-2">
          <input
            type="text"
            className="form-control"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>
        <div className="form-group py-2">
          <input
            type="number"
            className="form-control"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleChange}
            placeholder="Number of Rooms"
          />
        </div>
        <div className="form-group py-2">
          <input
            type="text"
            className="form-control"
            name="propertyHomeType"
            value={formData.propertyHomeType}
            onChange={handleChange}
            placeholder="Home Type"
          />
        </div>
        <div className="form-group py-2">
          <input
            type="text"
            className="form-control"
            name="propertySaleType"
            value={formData.propertySaleType}
            onChange={handleChange}
            placeholder="Sale Type"
          />
        </div>
        <div className="form-group py-2">
          <input
            type="text"
            className="form-control"
            name="propertyStatus"
            value={formData.propertyStatus}
            onChange={handleChange}
            placeholder="Status"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default PropertyForm
