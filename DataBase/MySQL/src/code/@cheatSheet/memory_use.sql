-- 查詢記憶體在各區塊使用情況

SELECT 
  @@key_buffer_size / (1024 * 1024) AS key_buffer,
  @@innodb_buffer_pool_size / (1024 * 1024) AS innodb_buffer_pool,
  @@innodb_log_buffer_size / (1024 * 1024) AS innodb_log_buffer,
  (@@max_connections * @@read_buffer_size) / (1024 * 1024) AS read_buffer,
  (@@max_connections * @@read_rnd_buffer_size) / (1024 * 1024) AS read_rnd_buffer,
  (@@max_connections * @@sort_buffer_size) / (1024 * 1024) AS sort_buffer,
  (@@max_connections * @@join_buffer_size) / (1024 * 1024) AS join_buffer,
  (@@max_connections * @@binlog_cache_size) / (1024 * 1024) AS binlog_cache,
  (@@max_connections * @@thread_stack) / (1024 * 1024) AS thread_stack,
  (@@max_connections * @@tmp_table_size) / (1024 * 1024) AS tmp_table;
