import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function LiveOfferPage() {
  const [offers, setOffers] = useState([])
  const [refresh, setRefresh] = useState(1)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/owner/${userId}/liveOffers`)
      .then((response) => setOffers(response.data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [refresh])

  const handleOfferStatusChange = (offerId, newStatus) => {
    axios
      .get(
        `http://localhost:8080/api/owner/${userId}/offer/${offerId}?changeOfferStatus=${newStatus}`
      )
      .then((response) => {
        // Assuming successful status change, you might want to update the UI accordingly
        console.log(`Offer ${offerId} status changed to ${newStatus}`)
        setRefresh((prev) => prev + 1)
      })
      .catch((error) => {
        console.error('Error changing offer status:', error)
        setRefresh((prev) => prev + 1)
      })
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {offers.map((offer) => (
          <div key={offer.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={offer.property.imgUrl}
                className="card-img-top"
                alt={offer.property.location}
              />
              <div className="card-body">
                <h5 className="card-title">{offer.property.location}</h5>
                <p className="card-text">Price: ${offer.price}</p>
                <p className="card-text">
                  Home Type: {offer.property.propertyHomeType}
                </p>
                <p className="card-text">
                  Sale Type: {offer.property.propertySaleType}
                </p>
                <p className="card-text">
                  Status: {offer.property.propertyStatus}
                </p>
                <p className="card-text">Offer Type: {offer.offerType}</p>
                <p className="card-text">
                  Offer From: {offer.offerFrom.firstName}{' '}
                  {offer.offerFrom.lastName}
                </p>
                <p className="card-text">
                  Offer To: {offer.offerTo.firstName} {offer.offerTo.lastName}
                </p>
                <p className="card-text">
                  Offer Status: From {offer.offerStatusFrom} to{' '}
                  {offer.offerStatusTo}
                </p>
                <p className="card-text">
                  Date: {new Date(offer.localDateTime).toLocaleDateString()}
                </p>
                <button
                  className="btn btn-success mr-2"
                  onClick={() => handleOfferStatusChange(offer.id, 'Accepted')}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleOfferStatusChange(offer.id, 'Rejected')}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveOfferPage
