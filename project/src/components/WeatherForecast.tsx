import { Cloud, Droplets, Thermometer } from 'lucide-react';
import type { WeatherForecast } from '../types';

interface WeatherForecastProps {
  forecast: WeatherForecast[];
}

export default function WeatherForecast({ forecast }: WeatherForecastProps) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">14-Day Weather Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 w-full max-w-[220px] p-4 rounded-xl shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 flex flex-col items-center space-y-4"
          >
            {/* Date */}
            <p className="font-semibold text-lg text-gray-800 mb-2">
              {new Date(day.date).toLocaleDateString()}
            </p>

            {/* Temperature section */}
            <div className="flex flex-col items-center gap-2 text-gray-700">
              <Thermometer className="w-8 h-8 text-red-500" />
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg text-red-500">Min:</span>
                  <span className="text-sm text-gray-800">{day.temperature.min}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg text-yellow-500">Max:</span>
                  <span className="text-sm text-gray-800">{day.temperature.max}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg text-blue-500">Avg:</span>
                  <span className="text-sm text-gray-800">{day.temperature.avg}°C</span>
                </div>
              </div>
            </div>

            {/* Humidity section */}
            <div className="flex items-center gap-2 text-gray-700">
              <Droplets className="w-7 h-7 text-blue-500" />
              <span className="text-sm font-medium">{day.humidity}%</span>
            </div>

            {/* Rainfall section */}
            <div className="flex items-center gap-2 text-gray-700">
              <Cloud className="w-7 h-7 text-gray-500" />
              <span className="text-sm font-medium">{day.rainfall}mm</span>
            </div>

            {/* Description section */}
            <p className="text-sm text-center text-gray-600 italic mt-2">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
