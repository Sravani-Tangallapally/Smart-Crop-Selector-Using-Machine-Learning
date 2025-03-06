import axios from "axios";
import { LatLngTuple } from 'leaflet';
import { WeatherForecast } from "../types"; // Import shared types

const API_KEY = "2cbc268fd12646b181194620250701"; // Your WeatherAPI.com key

// Define the API base URL directly in this file
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1'; // Directly defining the base URL
export const DEFAULT_MAP_CENTER: LatLngTuple = [51.505, -0.09]; // Properly typed
export const DEFAULT_MAP_ZOOM = 13;
export const SOIL_DEFAULTS = {
  nitrogen: 0,
  phosphorus: 0,
  potassium: 0,
  ph: 7,
  rainfall: 0,
  temperature: 25,
  humidity: 150,
};

export const DEFAULT_SOIL_DATA = SOIL_DEFAULTS;

export async function fetchWeatherForecast(lat: number, lng: number): Promise<WeatherForecast[]> {
  try {
    // Fetch 14-day forecast data from WeatherAPI.com
    const response = await axios.get(`${WEATHER_API_BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,  // Your API key
        q: `${lat},${lng}`,  // Location in lat, lng format
        days: 14,  // 14-day forecast
        aqi: "no",  // Optional: Exclude air quality data
        alerts: "no",  // Optional: Exclude alerts
      },
    });

    // Validate API response
    if (!response.data || !response.data.forecast?.forecastday) {
      throw new Error("Invalid API response: Missing forecast data.");
    }

    // Extract and map the relevant forecast data
    const mappedForecasts = response.data.forecast.forecastday.map((day: any) => ({
      date: day.date,
      temperature: {
        min: day.day.mintemp_c,
        max: day.day.maxtemp_c,
        avg: day.day.avgtemp_c,
      },
      humidity: day.day.avghumidity,
      rainfall: day.day.totalprecip_mm, // Rainfall in mm
      description: day.day.condition.text, // Weather condition text
      icon: day.day.condition.icon, // Weather icon URL
    }));

    console.log("Final mapped forecasts:", mappedForecasts);

    return mappedForecasts;
  } catch (error) {
    // Handle API errors
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error?.message || error.message;
      throw new Error(`Weather API error: ${message}`);
    }
    throw new Error(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
  }
  
}
