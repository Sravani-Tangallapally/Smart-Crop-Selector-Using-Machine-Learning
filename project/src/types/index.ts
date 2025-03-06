// src/types.ts
export interface Temperature {
  min: number;
  max: number;
  avg: number;
}
// Interface for Soil Data
export interface SoilData {
  nitrogen: number;   // Nitrogen content in the soil (in percentage or ppm)
  phosphorus: number; // Phosphorus content in the soil (in percentage or ppm)
  potassium: number;  // Potassium content in the soil (in percentage or ppm)
  ph: number;         // pH level of the soil (e.g., 6.5)
  rainfall: number;   // Average rainfall in the region (in mm)
  temperature: number; // Average temperature in Celsius (°C)
  humidity: number;   // Average humidity percentage
}

// Interface for Weather Forecast
export interface WeatherForecast {
  date: string;        // Date of the forecast
  temperature: Temperature;
  humidity: number;    // Humidity forecast for the day (%)
  rainfall: number;    // Rainfall forecast for the day (mm)
  description: string; // Weather condition description (e.g., "Sunny", "Cloudy")
}

// Interface for Crop Prediction
export interface CropPrediction {
  cropName: string;    // Name of the predicted crop (e.g., "Wheat", "Rice")
  confidence: number;  // Confidence score of the prediction (0-100%)
  waterRequirement: number; // Water requirement for the crop (liters per day)
  expectedYield: number;    // Expected yield of the crop (kg per hectare)
}



// export interface SoilData {
//   nitrogen: number;
//   phosphorus: number;
//   potassium: number;
//   ph: number;
//   rainfall: number;
//   temperature: number;
//   humidity: number;
// }

// export interface WeatherForecast {
//   date: string;
//   temperature: number;
//   humidity: number;
//   rainfall: number;
//   description: string;
// }

// export interface CropPrediction {
//   cropName: string;
//   confidence: number;
//   waterRequirement: number;
//   expectedYield: number;
// }
