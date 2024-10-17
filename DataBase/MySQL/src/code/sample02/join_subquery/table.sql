
CREATE TABLE IF NOT EXISTS Customer (
    customer_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    create_date DATE NOT NULL,

    INDEX idx_cdate (create_date) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS Rental (
    rental_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id INT UNSIGNED NOT NULL,
    rental_date DATE NOT NULL,
    movie_id INT UNSIGNED NOT NULL,
    status ENUM('completed', 'pending', 'returned') NOT NULL DEFAULT 'pending',

    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
				
    INDEX idx_rdate (rental_date), 
    INDEX idx_cid_rdate (customer_id, rental_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
