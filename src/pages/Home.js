import Properties from '../components/Properties';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Property from "../components/Property";

const Home = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem("token");
  
      const fetchProperties = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/property");
          if(response.status === 200) {
            setProperties(response.data);
          }
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };
  
      fetchProperties();
    }, []);
  return (
    <Layout>
      <div className="ml-2">
        <h1 className="text-2xl font-bold mb-2">Last Added</h1>
      </div>
      <div className="flex flex-wrap justify-start">
        {properties.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;