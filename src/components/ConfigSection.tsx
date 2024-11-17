import React from 'react';
import { HelpCircle } from 'lucide-react';
import Tooltip from './Tooltip';

interface ConfigSectionProps {
  title: string;
  values: Record<string, number>;
  tooltips: Record<string, string>;
  onChange: (name: string, value: string) => void;
  darkMode: boolean;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({
  title,
  values,
  tooltips,
  onChange,
  darkMode,
}) => {
  const formatLabel = (name: string) => {
    return name;
  };

  return (
    <div className="mb-6">
      <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      <div className="space-y-4">
        {Object.entries(values).map(([name, value]) => (
          <div key={name}>
            <div className="flex items-center space-x-2">
              <label
                htmlFor={name}
                className={`block text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {formatLabel(name)}
              </label>
              <Tooltip content={tooltips[name]}>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </Tooltip>
            </div>
            <input
              type="number"
              id={name}
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              className={`mt-1 block w-full rounded-md ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfigSection;