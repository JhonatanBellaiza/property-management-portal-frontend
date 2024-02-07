import React, { useState, useEffect } from 'react'
import PropertyList from '../components/property/PropertyList'
import PropertyService from '../components/property/PropertyService'

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([])
  const userName = localStorage.getItem('userName')

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = () => {
    PropertyService.getAllProperties()
      .then((data) => {
        setProperties(data)
      })
      .catch((error) => {
        console.error('Error loading properties:', error)
      })
  }

  const handleAddProperty = async (formData) => {
    try {
      const newProperty = await PropertyService.addProperty(formData)
      console.log(newProperty)
      setProperties([...properties, newProperty])
    } catch (error) {
      console.error('Error adding property:', error)
    }
  }

  return (
    <div className="container mt-5">
      <h1>Welcome, {userName}!</h1>
      <div className="property-section mt-4">
        <h2 className="mb-4"> My Properties</h2>
        <PropertyList properties={properties} />
      </div>
    </div>
  )
}

export default OwnerDashboard
