import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { CropPrediction } from '../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PredictionResultsProps {
  predictions: CropPrediction[];
}

export default function PredictionResults({ predictions }: PredictionResultsProps) {
  const chartData = {
    labels: predictions.map(p => p.cropName),
    datasets: [
      {
        label: 'Confidence Score (%)',
        data: predictions.map(p => p.confidence * 100),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Crop Prediction Confidence Scores'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Confidence (%)'
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Crop Recommendations</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-h-[300px]">
          <Bar data={chartData} options={options} />
        </div>
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <div key={prediction.cropName} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{prediction.cropName}</h3>
              <p>Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
              <p>Water Requirement: {prediction.waterRequirement}mm/season</p>
              <p>Expected Yield: {prediction.expectedYield} tons/hectare</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}