export const defaultValues = {
  global: {
    innodb_buffer_pool_size: 134217728,      // 128MB
    innodb_log_buffer_size: 16777216,        // 16MB
    innodb_additional_mem_pool_size: 8388608, // 8MB
    key_buffer_size: 16777216,               // 16MB
    query_cache_size: 0,
    tmp_table_size: 16777216,                // 16MB
    max_connections: 151,
    performance_schema_max_memory: 67108864,  // 64MB
  },
  perConnection: {
    sort_buffer_size: 262144,                // 256KB
    read_buffer_size: 131072,                // 128KB
    read_rnd_buffer_size: 262144,            // 256KB
    join_buffer_size: 262144,                // 256KB
    thread_stack: 262144,                    // 256KB
    binlog_cache_size: 32768,                // 32KB
    net_buffer_length: 16384                 // 16KB
  }
};

export const tooltips = {
  global: {
    innodb_buffer_pool_size: 'The size of the memory buffer InnoDB uses to cache data and indexes of its tables',
    innodb_log_buffer_size: 'The size of the buffer that InnoDB uses to write to the log files on disk',
    innodb_additional_mem_pool_size: 'Size of memory pool InnoDB uses to store data dictionary and internal data structures',
    key_buffer_size: 'Size of the buffer used for MyISAM index blocks',
    query_cache_size: 'Amount of memory allocated for storing query results',
    tmp_table_size: 'Maximum size for internal in-memory temporary tables',
    max_connections: 'Maximum permitted number of simultaneous client connections',
    performance_schema_max_memory: 'Maximum amount of memory that can be consumed by Performance Schema'
  },
  perConnection: {
    sort_buffer_size: 'Memory allocated for sorting operations per connection',
    read_buffer_size: 'Buffer size for sequential table scans per connection',
    read_rnd_buffer_size: 'Buffer for reading rows in sorted order following a key-sort operation',
    join_buffer_size: 'Minimum size of the buffer used for joins without indexes',
    thread_stack: 'Stack size for each connection thread',
    binlog_cache_size: 'Size of cache to hold SQL statements for the binary log during a transaction',
    net_buffer_length: 'Buffer length for TCP/IP and socket communication'
  }
};