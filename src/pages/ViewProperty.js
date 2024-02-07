import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import homePic from "../homepic.jpg";

import "./viewProperty.css";
function ViewProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/property/${id}`)
      .then((res) => {
        setProperty(res.data);
      });
  }, []);

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
              </div>
            </div>

            <br></br>
            <div>
              <div class="text-center">
                {" "}
                <strong>Photos:</strong>
              </div>
              <div class="text-center"> {homePic}</div>
            </div>
            <div className="text-center mt-5">
              <Link
                to={"/"}
                type="button"
                class="btn btn-outline-secondary"
              >
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ViewProperty;
