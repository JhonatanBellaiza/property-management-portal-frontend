import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropertyForm from '../components/property/PropertyForm'
import PropertyService from '../components/property/PropertyService' // Assuming you have a service for handling property data

const AddProperty = () => {
  const navigate = useNavigate()
  const handleSubmit = async (data) => {
    // Assuming PropertyService has a method to add property data
    try {
      await PropertyService.addProperty(data)
      navigate('/owner-dashboard')
    } catch (error) {
      console.error('Error adding property:', error)
      // Optionally, handle error state or display error message
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Add Property Page</h1>
          <PropertyForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default AddProperty
