// src/services/dashboard/getUserCount.js
import axios from 'axios';

export const getUserCount = async () => {
  try {
    const response = await axios.get('/api/dashboard/users');
    return response.data.count;
  } catch (error) {
    console.error("Error fetching user count:", error);
    return 0;
  }
};
