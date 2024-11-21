import React, { useState, useEffect } from 'react';
import { AlertTriangle, HelpCircle } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { MySQLVariables, VariableUnits, MemoryUnit } from '../types/mysql';
import { calculateTotalMemory, formatBytes, convertToBytes, convertFromBytes } from '../utils/calculations';

ChartJS.register(ArcElement, Tooltip, Legend);

const defaultValues: MySQLVariables = {
  innodb_buffer_pool_size: convertToBytes(128, 'MB'),
  innodb_log_buffer_size: convertToBytes(16, 'MB'),
  key_buffer_size: convertToBytes(16, 'MB'),
  query_cache_size: 0,
  tmp_table_size: convertToBytes(16, 'MB'),
  max_connections: 151,
  sort_buffer_size: convertToBytes(256, 'KB'),
  read_buffer_size: convertToBytes(128, 'KB'),
  read_rnd_buffer_size: convertToBytes(256, 'KB'),
  join_buffer_size: convertToBytes(256, 'KB'),
  thread_stack: convertToBytes(256, 'KB')
};

const defaultUnits: VariableUnits = {
  innodb_buffer_pool_size: 'MB',
  innodb_log_buffer_size: 'MB',
  key_buffer_size: 'MB',
  query_cache_size: 'MB',
  tmp_table_size: 'MB',
  sort_buffer_size: 'KB',
  read_buffer_size: 'KB',
  read_rnd_buffer_size: 'KB',
  join_buffer_size: 'KB',
  thread_stack: 'KB'
};

interface Props {
  darkMode: boolean;
}

const MemoryCalculator: React.FC<Props> = ({ darkMode }) => {
  const [variables, setVariables] = useState<MySQLVariables>(defaultValues);
  const [units, setUnits] = useState<VariableUnits>(defaultUnits);
  const [memoryStats, setMemoryStats] = useState<any>(null);
  const [totalServerMemory, setTotalServerMemory] = useState<number>(1);

  useEffect(() => {
    setMemoryStats(calculateTotalMemory(variables));
  }, [variables]);

  const handleInputChange = (name: keyof MySQLVariables, value: string) => {
    if (name === 'max_connections') {
      setVariables(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
      return;
    }

    const numValue = parseFloat(value) || 0;
    const bytes = convertToBytes(numValue, units[name]);
    setVariables(prev => ({
      ...prev,
      [name]: bytes
    }));
  };

  const handleUnitChange = (name: keyof MySQLVariables, newUnit: MemoryUnit) => {
    const currentBytes = variables[name];
    const currentValue = convertFromBytes(currentBytes, units[name]);
    const newBytes = convertToBytes(currentValue, newUnit);
    
    setUnits(prev => ({
      ...prev,
      [name]: newUnit
    }));
    
    setVariables(prev => ({
      ...prev,
      [name]: newBytes
    }));
  };

  const getDisplayValue = (name: keyof MySQLVariables): number => {
    if (name === 'max_connections') return variables[name];
    return convertFromBytes(variables[name], units[name]);
  };

  const chartData = {
    labels: ['Global Buffers', 'Per-Connection Buffers'],
    datasets: [{
      data: [memoryStats?.globalBuffers || 0, memoryStats?.totalPerConnection || 0],
      backgroundColor: ['#3B82F6', '#EF4444'],
      borderColor: ['#2563EB', '#DC2626'],
      borderWidth: 1,
    }]
  };

  const renderInput = (name: keyof MySQLVariables, label: string, tooltip: string, showUnit = true) => (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </label>
        <div className="group relative">
          <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="absolute left-full ml-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            {tooltip}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={getDisplayValue(name)}
          onChange={(e) => handleInputChange(name, e.target.value)}
          className={`flex-1 px-3 py-2 rounded-lg ${
            darkMode 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-300 text-gray-900'
          } border focus:ring-2 focus:ring-blue-500`}
        />
        {showUnit && (
          <select
            value={units[name]}
            onChange={(e) => handleUnitChange(name, e.target.value as MemoryUnit)}
            className={`w-24 px-3 py-2 rounded-lg ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } border focus:ring-2 focus:ring-blue-500`}
          >
            <option value="B">B</option>
            <option value="KB">KB</option>
            <option value="MB">MB</option>
            <option value="GB">GB</option>
          </select>
        )}
      </div>
    </div>
  );

  const getMemoryWarnings = () => {
    const warnings = [];
    if (totalServerMemory > 0) {
      const totalMemoryBytes = convertToBytes(totalServerMemory, 'GB');
      const usagePercentage = (memoryStats?.total / totalMemoryBytes) * 100;
      
      if (usagePercentage > 80) {
        warnings.push('MySQL memory usage exceeds 80% of total server memory');
      }
    }
    return warnings;
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Configuration Variables
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Global Buffers
            </h3>
            {renderInput('innodb_buffer_pool_size', 'innodb_buffer_pool_size', 
              'Memory used to cache table and index data')}
            {renderInput('innodb_log_buffer_size', 'innodb_log_buffer_size',
              'Memory used for transaction log operations')}
            {renderInput('key_buffer_size', 'key_buffer_size',
              'Buffer for MyISAM table indexes')}
            {renderInput('query_cache_size', 'query_cache_size',
              'Memory allocated for caching query results')}
          </div>


          {renderInput('max_connections', 'max_connections',
            'Maximum number of simultaneous client connections', false)}

          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Per-Connection Settings
            </h3>
            {renderInput('sort_buffer_size', 'sort_buffer_size',
              'Memory allocated for sorting operations per connection')}
            {renderInput('read_buffer_size', 'read_buffer_size',
              'Buffer used for sequential table scans')}
            {renderInput('read_rnd_buffer_size', 'read_rnd_buffer_size',
              'Buffer for reading rows in sorted order')}
            {renderInput('join_buffer_size', 'join_buffer_size',
              'Buffer used for joins without indexes')}
            {renderInput('thread_stack', 'thread_stack',
              'Stack size for each connection thread')}
            {renderInput('tmp_table_size', 'tmp_table_size',
              'Maximum size for in-memory temporary tables')}            
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Server Configuration
          </h2>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Total Server Memory (GB)
              </label>
              <div className="group relative">
                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute left-full ml-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg 
                              opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  Total physical memory available on the server
                </div>
              </div>
            </div>
            <input
              type="number"
              value={totalServerMemory}
              onChange={(e) => setTotalServerMemory(parseFloat(e.target.value) || 0)}
              className={`w-full px-3 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } border focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {getMemoryWarnings().map((warning, index) => (
            <div key={index} className="flex items-center gap-2 text-yellow-500 mt-4">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{warning}</span>
            </div>
          ))}
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Memory Usage Summary
          </h2>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Global Buffers
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatBytes(memoryStats?.globalBuffers || 0)}
              </div>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Per-Connection Total ({variables.max_connections} connections)
              </div>
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatBytes(memoryStats?.totalPerConnection || 0)}
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-900'
            }`}>
              <div className="text-sm opacity-80">Total Memory Usage</div>
              <div className="text-3xl font-bold">
                {formatBytes(memoryStats?.total || 0)}
              </div>
              {totalServerMemory > 0 && (
                <div className="text-sm mt-1 opacity-80">
                  {((memoryStats?.total / convertToBytes(totalServerMemory, 'GB')) * 100).toFixed(1)}% of server memory
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Memory Distribution
          </h2>
          <div className="w-full max-w-md mx-auto">
            <Pie 
              data={chartData} 
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: darkMode ? '#fff' : '#000'
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCalculator;