CREATE TABLE IF NOT EXISTS table1( 
	k1 INT NOT NULL, 
	k2 INT, 
	k3 INT NOT NULL, 
	UNIQUE KEY pkname1 (k3) 
); 

INSERT INTO table1 (k1, k2, k3) VALUES
    (1, 2, 3),
    (5, 6, 7);
