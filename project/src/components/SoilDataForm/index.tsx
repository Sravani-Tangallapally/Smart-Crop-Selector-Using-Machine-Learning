import React from 'react';
import { DEFAULT_SOIL_DATA } from '../../config/constants';
import { validateSoilData } from '../../utils/validation';
import type { SoilData } from '../../types';
import FormField from './FormField';

interface SoilDataFormProps {
  onSubmit: (data: SoilData) => void;
}

export default function SoilDataForm({ onSubmit }: SoilDataFormProps) {
  const [formData, setFormData] = React.useState<SoilData>(DEFAULT_SOIL_DATA);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateSoilData(formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
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
      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Nitrogen (mg/kg)"
          name="nitrogen"
          value={formData.nitrogen}
          onChange={handleChange}
        />
        <FormField
          label="Phosphorus (mg/kg)"
          name="phosphorus"
          value={formData.phosphorus}
          onChange={handleChange}
        />
        <FormField
          label="Potassium (mg/kg)"
          name="potassium"
          value={formData.potassium}
          onChange={handleChange}
        />
        <FormField
          label="pH Level"
          name="ph"
          value={formData.ph}
          onChange={handleChange}
          min={0}
          max={14}
          step={0.1}
        />
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