import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerHistoryOffers() {
  const [offers, setOffers] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/customer/${userId}/historyOffers`)
      .then((response) => setOffers(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [userId]); 

  

  return (
    // <div className="container mt-5">
    //   <div className="row">
    //     <div className="col-12 mb-3">
    //       <button className="btn btn-primary" onClick={navigator}>
    //         Add New Offer
    //       </button>
    //     </div>
    //     {offers.length > 0 ? (
    //       offers.map((offer) => (
    //         <div key={offer.id} className="col-md-4 mb-4">
    //           <div className="card">
    //             <img
    //               src={offer.property.imgUrl}
    //               className="card-img-top"
    //               alt={offer.property.location}
    //             />
    //             <div className="card-body">
    //               <h5 className="card-title">{offer.property.location}</h5>
    //               <p className="card-text">Price: ${offer.price}</p>
    //               {/* Rest of your card content */}
    //             </div>
    //           </div>
    //         </div>
    //       ))
    //     ) : (
    //       <div className="col-12">
    //         <p>You have no Offers yet</p>
    //       </div>
    //     )}
    //   </div>
    // </div>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default CustomerHistoryOffers;
