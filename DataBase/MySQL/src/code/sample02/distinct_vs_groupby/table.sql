CREATE TABLE IF NOT EXISTS Table1( 
	k1 VARCHAR(20),
	k2 INT,
	k3 INT, 
	k4 INT, 
	k5 INT, 
	k6 INT
);

CREATE INDEX idx_k2_k3 ON Table1(k2, k3);
