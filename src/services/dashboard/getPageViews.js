// src/services/dashboard/getPageViews.js
import axios from 'axios';

export const getPageViews = async () => {
  try {
    const response = await axios.get('/api/dashboard/page-views');
    return response.data.views;
  } catch (error) {
    console.error("Error fetching page views:", error);
    return 0;
  }
};
