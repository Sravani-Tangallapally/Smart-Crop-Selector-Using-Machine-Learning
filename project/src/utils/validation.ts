import type { SoilData } from '../types';

export function validateSoilData(data: SoilData): string | null {
  if (data.ph < 0 || data.ph > 14) {
    return 'pH must be between 0 and 14';
  }
  if (data.nitrogen < 0) return 'Nitrogen cannot be negative';
  if (data.phosphorus < 0) return 'Phosphorus cannot be negative';
  if (data.potassium < 0) return 'Potassium cannot be negative';
  return null;
}

export function validateEnvironmentVariables(): string | null {
  if (!import.meta.env.VITE_OPENWEATHER_API_KEY) {
    return 'OpenWeather API key is not configured. Please add it to your .env file.';
  }
  return null;
}