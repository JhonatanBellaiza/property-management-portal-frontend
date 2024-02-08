import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import homePic from "../homepic.jpg";

import "./viewProperty.css";
function ViewProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const [addOfferSelected, setAddOfferSelected] = useState(false);
  
  const [offerSubmit , setOfferSubmit ] = useState({
    userId : localStorage.getItem("userId"),
    propertyId: id,
    price: '',
    offerType: "Rent"
  })

  const handlePriceChange = (e) => {
    setOfferSubmit({...offerSubmit, price: e.target.value});
  }

  const handleTypeChange = (e) => {
    setOfferSubmit({...offerSubmit, offerType: e.target.value});
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    axios
    .get(`http://localhost:8080/api/customer/${localStorage.getItem("userId")}/property/${id}/addFavorite`)
    .then((res) => {
    //   setProperty(res.data);
    }).catch(error => {
        console.error('Error:', error);
    });
  };

  const handleAddOffer = () => {
    setAddOfferSelected(!addOfferSelected);
  }

  const handleAddOfferSubmit = () => {
    console.log(offerSubmit);
    axios
    .post(`http://localhost:8080/api/customer/submitOffer` , offerSubmit)
    .then((res) => {
      setAddOfferSelected(!addOfferSelected);
    }).catch(error => {
        console.error('Error:', error);
    });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/property/${id}`)
      .then((res) => {
        setProperty(res.data);
      }).catch(error => {
        console.error('Error:', error);
    });
  }, []);
  const cardStyle = {
    position: 'relative',
  };
  const styleForImg = {
    maxWidth: '500px',
  }

  const favoriteIconStyle = {
    position: 'absolute',
    bottom: '10px', // Adjust this value as needed to fit your design
    right: '10px', // Adjust this value as needed to fit your design
    cursor: 'pointer', // Changes the cursor to indicate the icon is clickable
    fontSize: '24px', // Adjust the size of the heart icon
  };

  return (
    <div className="property--card">
      {property ? (
        <div class="card shadow-sm shadow-lg  ">
          <div className="mt-5 mb-5">
            <div class="text-center fs-2 ">{property.location}</div>
            <br />
            <div class="row">
              
              <div class="col">
                <div>
                  <strong>Rent Amount: </strong> $1000
                </div>

                <div>
                  <strong>Square Feet: </strong>
                   400
                </div>

                <div>
                  <strong>Number Of Rooms: </strong>
                  {property.numberOfRooms}
                </div>

                <div>
                  <strong>Rented Date: </strong>
                  {property.rentedDate}
                </div>

                <div>
                  <strong>Property Type: </strong>
                  {property.propertyHomeType}
                </div>
                <div>
                  <strong>Owner Name: </strong>
                  {property.user.firstName + " " + property.user.lastName}
                </div>
              </div>
            </div>

            <br></br>
            <div>
              <div class="text-center">
                {" "}
                <strong>Photos:</strong>
              </div>
              <div class="text-center"> 
                <img src={property.imgUrl} style={styleForImg}></img>
              </div>
            </div>
            <div className="text-center mt-5">
              <Link
                to={"/"}
                type="button"
                class="btn btn-secondary"
              >
  
                Back To Home
              </Link>
              <button className="btn btn-primary" onClick={handleAddOffer}>
             Add New Offer
           </button>
           <button onClick={toggleFavorite} className="btn btn-danger" >
              add To Favorite
            </button>
            </div>
            {addOfferSelected ? (                <div className="relative bg-white rounded-lg shadow max-h-500">
                    <div className="flex items-start justify-center p-4 border-b rounded-t">
                        <h2 className="text-xl font-semibold text-gray-900">Create New Offer</h2>

                    </div>
                    <div className="p-6 space-y-4">
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">Price</label>
                            <input
                                className="w-full h-8 border border-gray-300 rounded-md px-3"
                                type="number"
                                name="name"
                                value={offerSubmit.price}
                                onChange={(e) => handlePriceChange(e)} 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">


                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">Sale Type</label>
                            <select
                                className="w-full h-8 border border-gray-300 rounded-md px-3"
                                name="saleType"
                                value={offerSubmit.offerType}
                                onChange={(e) => handleTypeChange(e)} 
                            >
                                <option value="Buy">Buy</option>
                                <option value="Rent">Rent</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
                        <button type="button" class="btn btn-primary btn-lg" onClick={handleAddOfferSubmit}>Add Offer</button>
                    </div>
                </div>) : ""}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ViewProperty;
