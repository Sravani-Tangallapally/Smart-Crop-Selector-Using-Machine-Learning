// import { RandomForestClassifier as RF } from 'ml-random-forest';
// import Papa from 'papaparse'; // For parsing CSV files
// import type { SoilData, CropPrediction } from '../types';

// export async function predictCrop(soilData: SoilData): Promise<CropPrediction[]> {
//   try {
//     console.log('Fetching the CSV file...');
//     const response = await fetch('/recommendationsoil.csv');
//     if (!response.ok) {
//       throw new Error(`Failed to fetch CSV file. Status: ${response.status}`);
//     }
//     const csvData = await response.text();

//     // Parse CSV file
//     const { data: parsedData, errors } = Papa.parse(csvData, {
//       header: true,
//       dynamicTyping: true,
//     });

//     if (errors.length > 0) {
//       console.warn('CSV Parsing Errors:', errors);
//     }

//     console.log('Parsed CSV Data (Sample):', parsedData.slice(0, 5));

//     const trainingFeatures: number[][] = [];
//     const trainingLabels: string[] = [];

//     // Filter valid rows and extract features and labels
//     parsedData.forEach((row: any, index: number) => {
//       const { N, P, K, ph, temperature, humidity, rainfall, label } = row;

//       if (
//         N != null &&
//         P != null &&
//         K != null &&
//         ph != null &&
//         temperature != null &&
//         humidity != null &&
//         rainfall != null &&
//         label
//       ) {
//         trainingFeatures.push([N, P, K, ph, temperature, humidity, rainfall]);
//         trainingLabels.push(label);
//       } else {
//         console.warn(`Invalid row at index ${index}:`, row);
//       }
//     });

//     console.log('Valid Training Features:', trainingFeatures);
//     console.log('Valid Training Labels:', trainingLabels);

//     // Check if training data is available
//     if (trainingFeatures.length === 0 || trainingLabels.length === 0) {
//       throw new Error('No valid training data found.');
//     }

//     console.log(
//       `Training Data: ${trainingFeatures.length} samples, ${trainingFeatures[0]?.length} features`
//     );

//     // Encode labels to numeric values
//     const uniqueLabels = Array.from(new Set(trainingLabels));
//     const labelToIndex = Object.fromEntries(uniqueLabels.map((label, index) => [label, index]));
//     const indexToLabel = Object.fromEntries(uniqueLabels.map((label, index) => [index, label]));
//     const encodedLabels = trainingLabels.map(label => labelToIndex[label]);

//     // Train the Random Forest model
//     const rf = new RF({
//       nEstimators: 100,
//       maxFeatures: trainingFeatures[0].length,
//     });
//     rf.train(trainingFeatures, encodedLabels);
//     console.log('Model trained successfully.');

//     // Prepare input features for prediction
//     const inputFeatures = [
//       soilData.nitrogen,
//       soilData.phosphorus,
//       soilData.potassium,
//       soilData.ph,
//       soilData.temperature,
//       soilData.humidity,
//       soilData.rainfall,
//     ];

//     // Validate input features
//     if (inputFeatures.some((value) => typeof value !== 'number' || isNaN(value))) {
//       throw new Error('Invalid input features for prediction.');
//     }

//     console.log('Input Features:', inputFeatures);

//     // Make predictions
//     const predictions = rf.predict([inputFeatures]);
//     console.log('Predictions (Encoded):', predictions);

//     // Decode predictions back to string labels
//     const decodedPredictions = predictions.map(prediction => indexToLabel[prediction]);

//     // Return predictions with mock confidence and additional details
//     return decodedPredictions.map((cropName) => ({
//       cropName,
//       confidence: Math.random(), // Replace with real confidence scores if available
//       waterRequirement: 1000, // Placeholder
//       expectedYield: 4.0, // Placeholder
//     }));
//   } catch (error) {
//     console.error('Error in predictCrop function:', error);
//     throw error;
//   }
// }
import { RandomForestClassifier as RF } from "ml-random-forest";
import Papa from "papaparse"; // For parsing CSV files
import type { SoilData, CropPrediction } from "../types";

export async function predictCrop(soilData: SoilData): Promise<CropPrediction[]> {
  try {
    console.log("Fetching the CSV file...");
    const response = await fetch("/rabi_crops_dataset_reordered.csv");
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file. Status: ${response.status}`);
    }

    const csvData = await response.text();

    // Parse CSV file
    const { data: parsedData, errors } = Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      console.warn("CSV Parsing Errors:", errors);
    }

    console.log("Parsed CSV Data (Sample):", parsedData.slice(0, 5));

    const trainingFeatures: number[][] = [];
    const trainingLabels: string[] = [];

    // Filter valid rows and extract features and labels
    parsedData.forEach((row: any, index: number) => {
      const { N, P, K, ph, temperature, humidity, rainfall, label } = row;

      // Validate row data
      if (
        typeof N === "number" &&
        typeof P === "number" &&
        typeof K === "number" &&
        typeof ph === "number" &&
        typeof temperature === "number" &&
        typeof humidity === "number" &&
        typeof rainfall === "number" &&
        typeof label === "string"
      ) {
        trainingFeatures.push([N, P, K, ph, temperature, humidity, rainfall]);
        trainingLabels.push(label);
      } else {
        console.warn(`Invalid row at index ${index}:`, row);
      }
    });

    console.log("Valid Training Features:", trainingFeatures);
    console.log("Valid Training Labels:", trainingLabels);

    // Check if training data is available
    if (trainingFeatures.length === 0 || trainingLabels.length === 0) {
      throw new Error("No valid training data found in the CSV file.");
    }

    console.log(
      `Training Data: ${trainingFeatures.length} samples, ${trainingFeatures[0]?.length} features`
    );

    // Encode labels to numeric values
    const uniqueLabels = Array.from(new Set(trainingLabels));
    const labelToIndex = Object.fromEntries(uniqueLabels.map((label, index) => [label, index]));
    const indexToLabel = Object.fromEntries(uniqueLabels.map((label, index) => [index, label]));
    const encodedLabels = trainingLabels.map((label) => labelToIndex[label]);

    console.log("Unique Labels:", uniqueLabels);
    console.log("Label to Index Mapping:", labelToIndex);

    // Train the Random Forest model
    const rf = new RF({
      nEstimators: 100,
      maxFeatures: trainingFeatures[0].length,
    });
    rf.train(trainingFeatures, encodedLabels);
    console.log("Model trained successfully.");

    // Prepare input features for prediction
    const inputFeatures = [
      soilData.nitrogen,
      soilData.phosphorus,
      soilData.potassium,
      soilData.ph,
      soilData.temperature,
      soilData.humidity,
      soilData.rainfall,
    ];

    // Validate input features
    if (inputFeatures.some((value) => typeof value !== "number" || isNaN(value))) {
      throw new Error("Invalid input features for prediction.");
    }

    console.log("Input Features:", inputFeatures);

    // Make predictions
    const predictions = rf.predict([inputFeatures]);
    console.log("Predictions (Encoded):", predictions);

    // Decode predictions back to string labels
    const decodedPredictions = predictions.map((prediction) => indexToLabel[prediction]);

    console.log("Predictions (Decoded):", decodedPredictions);

    // Return predictions with mock confidence and additional details
    return decodedPredictions.map((cropName) => ({
      cropName,
      confidence: Math.random(), // Replace with real confidence scores if available
      waterRequirement: 1000, // Placeholder
      expectedYield: 4.0, // Placeholder
    }));
  } catch (error) {
    console.error("Error in predictCrop function:", error);
    throw error;
  }
}

