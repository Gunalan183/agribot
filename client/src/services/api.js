import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response.data;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error.response?.data || error.message);
  }
);

/**
 * Get crop recommendations based on farm conditions
 * @param {Object} data - Farm condition data
 * @param {string} data.soilType - Type of soil (clay, loamy, sandy, etc.)
 * @param {string} data.season - Growing season (kharif, rabi, year-round)
 * @param {number} data.temperature - Temperature in Celsius
 * @param {number} data.rainfall - Rainfall in mm
 * @returns {Promise<Object>} Crop recommendations
 */
export const getCropRecommendation = async (data) => {
  try {
    const response = await api.post('/crop-recommendation', data);
    return response;
  } catch (error) {
    throw new Error(error.message || 'Failed to get crop recommendations');
  }
};

/**
 * Predict plant disease from uploaded image
 * @param {File} imageFile - Image file of affected plant part
 * @returns {Promise<Object>} Disease prediction results
 */
export const predictDisease = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await api.post('/disease-prediction', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response;
  } catch (error) {
    throw new Error(error.message || 'Failed to analyze image');
  }
};

/**
 * Get chatbot response for user message
 * @param {string} message - User's message/query
 * @returns {Promise<Object>} Chatbot response
 */
export const getChatResponse = async (message) => {
  try {
    const response = await api.post('/chat', { message });
    return response;
  } catch (error) {
    throw new Error(error.message || 'Failed to get chat response');
  }
};

/**
 * Health check endpoint
 * @returns {Promise<Object>} API health status
 */
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response;
  } catch (error) {
    throw new Error(error.message || 'API health check failed');
  }
};

// Export the api instance for direct usage if needed
export default api;