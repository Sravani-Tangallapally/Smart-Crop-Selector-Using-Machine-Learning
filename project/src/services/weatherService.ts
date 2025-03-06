import axios from 'axios';
import { WeatherForecast } from "../types"; // Import shared type

// Hardcoded API key and base URL
const API_KEY = "2cbc268fd12646b181194620250701";  // Your WeatherAPI.com key
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1'; // Define the base URL directly in this file

export async function fetchWeatherForecast(lat: number, lng: number): Promise<WeatherForecast[]> {
  try {
    // Fetch 14-day forecast data from WeatherAPI.com
    const response = await axios.get(`${WEATHER_API_BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,  // API key used directly
        q: `${lat},${lng}`,  // Location in lat, lng format
        days: 20,  // Request 14-day forecast
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
    // Handle errors, especially Axios-specific ones
    if (axios.isAxiosError(error)) {
      const message = (error as any).response?.data?.error?.message || (error as any).message;
      throw new Error(`Weather API error: ${message}`);
    }
    throw new Error(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
  }
}
