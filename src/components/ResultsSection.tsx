import React from 'react';
import { formatBytes } from '../utils/calculations';

interface ResultsSectionProps {
  totalMemory: {
    global: number;
    perConnection: number;
    total: number;
  };
  darkMode: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ totalMemory, darkMode }) => {
  return (
    <div>
      <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Memory Usage Summary
      </h3>
      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Global Buffers
          </div>
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatBytes(totalMemory.global)}
          </div>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Per-Connection Buffers (Total)
          </div>
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {formatBytes(totalMemory.perConnection)}
          </div>
        </div>
        <div
          className={`p-4 rounded-lg ${
            darkMode ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-900'
          }`}
        >
          <div className="text-sm opacity-80">Total Memory Usage</div>
          <div className="text-3xl font-bold">{formatBytes(totalMemory.total)}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;