import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./viewProperty.css";
const Favorite = () => {
  const [favoriteList, setFavoriteList] = useState([]);

  function loadFavorite() {
    axios.get(`http://localhost:8080/api/customer/${localStorage.getItem("userId")}/favoriteList`).then((res) => {
      if(res.data.propertyList != null)
        setFavoriteList(res.data.propertyList);
      else
        setFavoriteList([])
    });
  }

  useEffect(() => {
    loadFavorite();
  }, []);

  function DeleteFavorite(id) {
    axios.get(`http://localhost:8080/api/customer/${localStorage.getItem("userId")}/property/${id}/removeFavorite`).then(() => {
      // const updatedFavorite = favoriteList.filter((f) => f.id !== id);
      // setFavoriteList(updatedFavorite);
      loadFavorite();
    });
  }

  const imageStyle = {
    objectFit: 'cover',
    height: '200px',
    borderRadius: '0.5rem 0.5rem 0 0',
  };

  return (
    <div className="list_cart">
      <div class="container album py-5 bg-light list_card">
        <h2 className="text-center fw-lighter">My favorite list</h2>
        <br />
        <div class="row row-cols-3 row-cols-sm-2 row-cols-md-3 g-3 ">
          {favoriteList.map((data, index) => {
            return (
              <div class="col">
                <div class="card shadow-sm">
                  <title>{data.location}</title>
                  <h3>{data.propertyHomeType}</h3>
                  <rect width="100%" height="100%" fill="#55595c"></rect>

                  {/* <img
                    src={data.images.length ? data.images[0].imgUrl : ""}
                    alt="..."
                    class="img-thumbnail"
                  /> */}

                  <div class="card-body">
                    <div class="fs-4">
                      <strong> {data.location}</strong>
                      <img  style={imageStyle} src={data.imgUrl}/>
                    </div>
                    <div>
                      {data.numberOfRooms} Bedrooms
                    </div>
                    <p class="card-text">
                    {data.propertySaleType + ", " + data.propertyStatus}
                    </p>

                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <Link
                          to={`/propertyHome/${data.id}`}
                          type="button"
                          class="btn btn-sm btn-secondary"
                        >
                          View
                        </Link>

                        <Link
                          onClick={() => DeleteFavorite(data.id)}
                          type="button"
                          class="btn btn-sm btn-danger"
                        >
                          Remove favorite
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Favorite;
