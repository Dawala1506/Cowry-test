
import axios from 'axios';

const API_KEY = 'WIiQghUGmqZ5La7VLcxvR-LPefyS-lkYG1xhXKSFBPc'; 
const BASE_URL = 'https://api.unsplash.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Client-ID ${API_KEY}` },
});

export const fetchPhotos = async (query = '') => {
  try {
    const response = await apiClient.get('/search/photos', {
      params: {
        query: query || 'nature', 
        per_page: 20, 
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error; 
  }
};

