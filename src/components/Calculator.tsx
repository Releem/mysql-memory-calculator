import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ConfigSection from './ConfigSection';
import ResultsSection from './ResultsSection';
import { formatBytes, calculateTotalMemory } from '../utils/calculations';
import { defaultValues, tooltips } from '../utils/constants';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CalculatorProps {
  darkMode: boolean;
}

const Calculator: React.FC<CalculatorProps> = ({ darkMode }) => {
  const [values, setValues] = useState(defaultValues);
  const [totalMemory, setTotalMemory] = useState({ global: 0, perConnection: 0, total: 0 });
  const [serverRam, setServerRam] = useState(0);

  useEffect(() => {
    const calculated = calculateTotalMemory(values);
    setTotalMemory(calculated);
  }, [values]);

  const handleInputChange = (category: string, name: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setValues(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: numValue
      }
    }));
  };

  const getWarnings = () => {
    const warnings = [];
    if (serverRam && totalMemory.total > serverRam * 0.8) {
      warnings.push('Total MySQL memory usage exceeds 80% of server RAM');
    }
    if (values.global.innodb_buffer_pool_size < 134217728) {
      warnings.push('innodb_buffer_pool_size is less than recommended 128MB minimum');
    }
    if (values.global.max_connections > 1000) {
      warnings.push('High max_connections value may lead to excessive memory usage');
    }
    if (values.perConnection.sort_buffer_size > 262144) {
      warnings.push('Large sort_buffer_size may impact performance with many connections');
    }
    return warnings;
  };

  const chartData = {
    labels: ['Global Buffers', 'Per-Connection Buffers'],
    datasets: [
      {
        data: [totalMemory.global, totalMemory.perConnection],
        backgroundColor: ['#3B82F6', '#EF4444'],
        borderColor: ['#2563EB', '#DC2626'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#fff' : '#000',
        },
      },
    },
  };

  return (
    <div className={`rounded-lg shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ConfigSection
            title="Global System Variables"
            values={values.global}
            tooltips={tooltips.global}
            onChange={(name, value) => handleInputChange('global', name, value)}
            darkMode={darkMode}
          />
          <ConfigSection
            title="Per-Connection Variables"
            values={values.perConnection}
            tooltips={tooltips.perConnection}
            onChange={(name, value) => handleInputChange('perConnection', name, value)}
            darkMode={darkMode}
          />
          <div className="mt-6">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Server Total RAM (bytes)
            </label>
            <input
              type="number"
              value={serverRam}
              onChange={(e) => setServerRam(parseInt(e.target.value) || 0)}
              className={`mt-1 block w-full rounded-md ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
          </div>
        </div>

        <div>
          <ResultsSection
            totalMemory={totalMemory}
            darkMode={darkMode}
          />

          <div className="mt-8">
            <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Memory Distribution
            </h3>
            <div className="w-full max-w-md mx-auto">
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>

          {getWarnings().length > 0 && (
            <div className="mt-8">
              <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Configuration Warnings
              </h3>
              <div className="space-y-2">
                {getWarnings().map((warning, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 text-yellow-600 dark:text-yellow-400"
                  >
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;