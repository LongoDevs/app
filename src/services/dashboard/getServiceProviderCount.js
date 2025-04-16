// src/services/dashboard/getServiceProviderCount.js
import axios from 'axios';

export const getServiceProviderCount = async () => {
  try {
    const response = await axios.get('/api/dashboard/service-providers');
    return response.data.count;
  } catch (error) {
    console.error("Error fetching service provider count:", error);
    return 0;
  }
};
