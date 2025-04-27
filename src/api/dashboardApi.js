import axios from 'axios';

// Fetch Revenue Graph
export const getRevenueGraph = async () => {
  try {
    const response = await axios.get('/api/dashboard/revenue-graph');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch revenue graph:', error);
    return [];
  }
};

// Fetch Requested Services
export const getRequestedServices = async () => {
  try {
    const response = await axios.get('/api/dashboard/requested-services');
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch requested services:', error);
    return [];
  }
};
