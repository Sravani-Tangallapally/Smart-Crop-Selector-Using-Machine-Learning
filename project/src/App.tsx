import React from "react";
import Header from "./components/Header";
import LocationPicker from "./components/LocationPicker";
import WeatherForecast from "./components/WeatherForecast";
import SoilDataForm from "./components/SoilDataForm";
import { fetchWeatherForecast } from "./services/weatherService";
import { predictCrop } from "./services/predictionService";
import type { SoilData, WeatherForecast as WeatherForecastType, CropPrediction } from "./types";
import PredictionResults from "./components/PredictionResults";

function App() {
  const [, setLocation] = React.useState<{ lat: number; lng: number } | null>(null);
  const [weatherForecast, setWeatherForecast] = React.useState<WeatherForecastType[]>([]);
  const [predictions, setPredictions] = React.useState<CropPrediction[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null); // Error state added

  async function handleLocationSelect(lat: number, lng: number) {
    setLocation({ lat, lng });
    setError(null);
    setWeatherForecast([]);
    try {
      const forecast = await fetchWeatherForecast(lat, lng);
      setWeatherForecast(forecast);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch weather forecast";
      setError(message);
      console.error("Weather forecast error:", err);
    }
  }

  const handleSoilDataSubmit = async (data: SoilData) => {
    setLoading(true);
    setError(null);
    setPredictions([]);
    try {
      const results = await predictCrop(data);
      setPredictions(results);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate predictions";
      setError(message);
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Select Location</h2>
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </div>
          <div>
            <SoilDataForm onSubmit={handleSoilDataSubmit} />
          </div>
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Analyzing data...</p>
          </div>
        )}

        {weatherForecast.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Weather Forecast</h2>
            <WeatherForecast forecast={weatherForecast} />
          </div>
        )}
         {predictions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Crop Predictions</h2>
            <PredictionResults predictions={predictions} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
