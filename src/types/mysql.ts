export interface MySQLVariables {
  innodb_buffer_pool_size: number;
  innodb_log_buffer_size: number;
  key_buffer_size: number;
  query_cache_size: number;
  tmp_table_size: number;
  max_connections: number;
  sort_buffer_size: number;
  read_buffer_size: number;
  read_rnd_buffer_size: number;
  join_buffer_size: number;
  thread_stack: number;
  total_ram?: number;
}

export interface VariableUnits {
  [key: string]: 'B' | 'KB' | 'MB' | 'GB';
}

export type MemoryUnit = 'B' | 'KB' | 'MB' | 'GB';