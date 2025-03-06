import React, { useEffect, useState } from 'react';
import type { SoilData } from '../types';
import { fetchWeatherForecast } from '../services/weatherService'; // Import your weather API function

interface SoilDataFormProps {
  onSubmit: (data: SoilData) => void;
  lat: number;
  lng: number;
}

const DEFAULT_SOIL_DATA: SoilData = {
  nitrogen: 0,
  phosphorus: 0,
  potassium: 0,
  ph: 10,
  rainfall: 0,
  temperature: 15,
  humidity: 50,
};

export default function SoilDataForm({ onSubmit, lat, lng }: SoilDataFormProps) {
  const [formData, setFormData] = useState<SoilData>(DEFAULT_SOIL_DATA);

  // Fetch weather data on component mount
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchWeatherData = async () => {
      try {
        const weatherData = await fetchWeatherForecast(lat, lng);
        if (weatherData && weatherData[0]) {
          const { temperature, rainfall, humidity } = weatherData[0]; // Assuming first day's data
          setFormData((prevData) => ({
            ...prevData,
            temperature: temperature.avg, // Set avg temperature
            rainfall, // Set rainfall
            humidity, // Set humidity
          }));
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Initial fetch
    fetchWeatherData();

    // Set up polling every 10 seconds
    intervalId = setInterval(fetchWeatherData, 100); // Poll every 10 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [lat, lng]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: parseFloat(e.target.value),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Soil Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nitrogen (mg/kg)
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phosphorus (mg/kg)
            <input
              type="number"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Potassium (mg/kg)
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            pH Level
            <input
              type="number"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              min="0"
              max="14"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperature (°C)
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rainfall (mm)
            <input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Humidity (%)
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Analyze Soil Data
      </button>
    </form>
  );
}
