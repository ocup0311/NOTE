CREATE DATABASE db1;
USE db1;
source /src/testjoin/table1.sql
source /src/testjoin/simulated_3000x_data.sql
source /src/testjoin/simulated_5000x_data.sql
source /src/testjoin/simulated_7000x_data.sql
source /src/testjoin/simulated_8000x_data.sql
source /src/testjoin/simulated_8000x_data2.sql
source /src/testjoin/simulated_10000x_data.sql
source /src/testjoin/simulated_100000x_data/part_1.sql
DROP TABLE rental;
DROP TABLE customer;
