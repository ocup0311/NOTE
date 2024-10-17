SELECT k1, k2, k3, _rowid FROM Table1;

SELECT TABLE_SCHEMA, TABLE_NAME, GROUP_CONCAT(COLUMN_NAME) as pk
FROM information_schema.COLUMNS
WHERE column_key = 'PRI'
AND table_schema = 'db1'
AND table_name = 'Table1';