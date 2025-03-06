import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function FormField({
  label,
  name,
  value,
  onChange,
  min,
  max,
  step
}: FormFieldProps) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </label>
  );
}