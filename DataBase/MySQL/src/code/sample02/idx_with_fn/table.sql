CREATE TABLE IF NOT EXISTS table1( 
	id INT NOT NULL AUTO_INCREMENT,
	k2 VARCHAR(20), 
	k3 INT, 
	k4 INT, 
	k5 INT, 
	k6 INT, 
	k7 INT, 
  PRIMARY KEY (id)
); 

CREATE INDEX idx_k3 ON table1(k3);
CREATE INDEX idx_K4_k2 ON table1(k4, k2);
CREATE INDEX idx_k7 ON table1(k7);

