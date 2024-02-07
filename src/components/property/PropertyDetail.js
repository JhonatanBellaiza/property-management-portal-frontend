// PropertyDetail.js
import React from 'react'

const PropertyDetail = ({ property }) => {
  return (
    <div>
      <h2>Property Detail</h2>
      <p>Location: {property.location}</p>
      <p>Number of Rooms: {property.numberOfRooms}</p>
      <p>Property Type: {property.propertyHomeType}</p>
      <p>Sale Type: {property.propertySaleType}</p>
      <p>Status: {property.propertyStatus}</p>
      {/* Add more details as needed */}
    </div>
  )
}

export default PropertyDetail
