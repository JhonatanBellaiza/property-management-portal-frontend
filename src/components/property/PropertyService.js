// PropertyService.js
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api'; // Replace "{{URL}}/property" with your actual API URL

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

export default {
  getAllProperties,
  addProperty,
};
