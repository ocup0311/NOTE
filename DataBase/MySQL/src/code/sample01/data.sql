CREATE TABLE IF NOT EXISTS employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  title VARCHAR(100) DEFAULT NULL,
  salary DOUBLE DEFAULT NULL,
  hire_date DATE NOT NULL,
  notes TEXT,
  PRIMARY KEY (id)
);

INSERT INTO employees(first_name, last_name, title, salary, hire_date) VALUES 
    ('Robin', 'Jackman', 'Software Engineer', 5500, '2001-10-12'),
    ('Taylor', 'Edward', 'Software Architect', 7200, '2002-09-21'),
    ('Vivian', 'Dickens', 'Database Administrator', 6000, '2012-08-29'),
    ('Harry', 'Clifford', 'Database Administrator', 6800, '2015-12-10'),
    ('Eliza', 'Clifford', 'Software Engineer', 4750, '1998-10-19'),
    ('Nancy', 'Newman', 'Software Engineer', 5100, '2007-01-23'),
    ('Melinda', 'Clifford', 'Project Manager', 8500, '2013-10-29'),
    ('Jack', 'Chan', 'Test Engineer', 6500, '2018-09-07'),
    ('Harley', 'Gilbert', 'Software Architect', 8000, '2000-07-17');