export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const convertToBytes = (value: number, unit: string): number => {
  const multipliers: { [key: string]: number } = {
    'B': 1,
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024
  };
  return value * multipliers[unit];
};

export const convertFromBytes = (bytes: number, unit: string): number => {
  const multipliers: { [key: string]: number } = {
    'B': 1,
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024
  };
  return bytes / multipliers[unit];
};

export const calculateTotalMemory = (variables: any) => {
  const globalBuffers = 
    variables.innodb_buffer_pool_size +
    variables.innodb_log_buffer_size +
    variables.key_buffer_size +
    variables.query_cache_size;

  const perConnectionBuffers = 
    variables.sort_buffer_size +
    variables.read_buffer_size +
    variables.read_rnd_buffer_size +
    variables.join_buffer_size +
    variables.thread_stack +
    variables.tmp_table_size;

  const totalPerConnection = perConnectionBuffers * variables.max_connections;
  const total = globalBuffers + totalPerConnection;

  return {
    globalBuffers,
    perConnectionBuffers,
    totalPerConnection,
    total
  };
};