import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' // Import Link from React Router
import PropertyService from './PropertyService'

const PropertyList = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    PropertyService.getAllProperties().then((data) => {
      setProperties(data)
    })
  }, [])

  return (
    <div className="row">
      {properties.map((property) => (
        <div key={property.id} className="col-md-4 mb-3">
          <div className="card p-3">
            <Link to={`/property/${property.id}`}>
              <img
                src={property.imgUrl}
                className="card-img-top"
                alt={property.location}
                style={{ height: '200px', objectFit: 'cover' }} // Set fixed dimensions here
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{property.location}</h5>
              <p className="card-text">
                <strong>Home Type:</strong> {property.propertyHomeType}
                <br />
                <strong>Sale Type:</strong> {property.propertySaleType}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PropertyList
