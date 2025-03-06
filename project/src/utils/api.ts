import axios from 'axios';

// Define the API base URL directly in this file
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1'; // Directly define the base URL

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY; // Ensure this is correct

// Create axios instance with default configuration
export const weatherApi = axios.create({
  baseURL: WEATHER_API_BASE_URL, // Ensure correct base URL for WeatherAPI.com
  params: {
    key: API_KEY, // 'key' instead of 'appid' for WeatherAPI.com
  },
  timeout: 10000, // 10-second timeout
});
