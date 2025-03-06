import { Sprout } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2">
          <Sprout className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Smart Crop Selector
          </h1>
        </div>
      </div>
    </header>
  );
}
