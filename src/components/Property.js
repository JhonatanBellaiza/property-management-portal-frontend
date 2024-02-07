import React from "react";
import { Link } from "react-router-dom";
import homePic from "../homepic.jpg";

const Property = ({ property }) => {
  const imageStyle = {
    objectFit: 'cover', // Ensures the image covers the area, might crop it
    height: '200px', // Adjust this value based on your layout needs
    borderRadius: '0.5rem 0.5rem 0 0', // Applies rounded corners to the top
  };
  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full sm:w-1/2 md:w-1/3 px-2 my-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to={`/property/${property.id}`}>
            <img className="rounded-t-lg" style={imageStyle} src={homePic} alt="Property" />
          </Link>
          <div className="p-5">
            <Link to={`/property/${property.id}`}>
              <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Location: {property.location}
              </h3>
            </Link>
            <p className="text-xl tracking-tight text-gray-900 dark:text-white">
              Home Type: {property.propertyHomeType}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              Number of rooms: {property.numberOfRooms}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              For: {property.propertySaleType}
            </p>
            <Link
              to={`/property/${property.id}`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 inline-block"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
