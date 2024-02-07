// PropertyService.js
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api';

const userId = localStorage.getItem('userId');

const getAllProperties = () => {
  return axios.get(`${baseUrl}/owner/${userId}/property`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching properties:', error);
      throw new Error('Failed to fetch properties');
    });
};

const getPropertyById = (id) => {
  return axios.get(`${baseUrl}/property/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching property:', error);
      throw new Error('Failed to fetch properties');
    });
};

const deleteProperty = (id) => {
  return axios.delete(`${baseUrl}/property/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error deleting property:', error);
    });
};

const addProperty = (property) => {
  return axios.post(`${baseUrl}/owner/${userId}/property`, property, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error adding property:', error);

    });
};

const updateProperty = (id, updatedProperty) => {
  return axios.put(`${baseUrl}/property/${id}`, updatedProperty, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error updating property:', error);

    });
};

export default {
  getAllProperties,
  addProperty,
  getPropertyById,
  deleteProperty,
  updateProperty
};
