import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropertyService from '../components/property/PropertyService'
import PropertyEditForm from '../components/property/PropertyEditForm' // Assuming you have a PropertyEditForm component

const PropertyPage = () => {
  const { id } = useParams() // Get the id parameter from the URL
  const [property, setProperty] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    PropertyService.getPropertyById(id).then((data) => {
      setProperty(data)
    })
  }, [id])

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleCancelEdit = () => {
    setEditMode(false)
  }

  const handleSave = (updatedProperty) => {
    PropertyService.updateProperty(id, updatedProperty)
      .then(() => {
        setProperty(updatedProperty)
        setEditMode(false)
      })
      .catch((error) => {
        console.error('Error updating property:', error)
      })
  }

  const handleDelete = () => {
    // Call your service to delete the property
    PropertyService.deleteProperty(id)
      .then(() => {
        navigate('/owner-dashboard')
      })
      .catch((error) => {
        console.error('Error deleting property:', error)
      })
  }

  if (!property) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={property.imgUrl}
            alt={property.location}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <h1>{property.location}</h1>
          <p>
            <strong>Home Type:</strong> {property.propertyHomeType}
          </p>
          <p>
            <strong>Sale Type:</strong> {property.propertySaleType}
          </p>
          <p>
            <strong>Number of Rooms:</strong> {property.numberOfRooms}
          </p>
          <p>
            <strong>Status:</strong> {property.propertyStatus}
          </p>
          {editMode ? (
            <PropertyEditForm
              property={property}
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />
          ) : (
            <>
              <button className="btn btn-primary" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyPage
