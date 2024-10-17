-- EX.1 ----------------------------

-- sub-query
SELECT ROUND(AVG(counts.num_of_movies_rented)) AS avg_num_of_movies_rented
FROM (
    SELECT COUNT(Cust.customer_id) AS num_of_movies_rented
    FROM Rental
    JOIN Customer Cust ON Cust.customer_id = Rental.customer_id
    WHERE rental_date BETWEEN Cust.create_date AND DATE_ADD(Cust.create_date, INTERVAL 20 MONTH)
    GROUP BY Cust.customer_id
) AS counts;

-- CTE
WITH counts AS (
    SELECT COUNT(Cust.customer_id) AS num_of_movies_rented
    FROM Rental
    JOIN Customer Cust ON Cust.customer_id = Rental.customer_id
    WHERE rental_date BETWEEN Cust.create_date AND DATE_ADD(Cust.create_date, INTERVAL 20 MONTH)
    GROUP BY Cust.customer_id
)
SELECT ROUND(AVG(counts.num_of_movies_rented)) AS avg_num_of_movies_rented
FROM counts;

-- only JOIN：針對不同需求分別需使用 inner/outer JOIN
SELECT ROUND(COUNT(Rental.rental_id) / COUNT(DISTINCT Cust.customer_id)) AS avg_num_of_movies_rented
FROM Rental
JOIN Customer Cust ON Cust.customer_id = Rental.customer_id
WHERE Rental.rental_date BETWEEN Cust.create_date AND DATE_ADD(Cust.create_date, INTERVAL 20 MONTH);

SELECT ROUND(COUNT(Rental.rental_id) / COUNT(Cust.customer_id)) AS avg_num_of_movies_rented
FROM Customer Cust
LEFT JOIN Rental ON Cust.customer_id = Rental.customer_id
    AND Rental.rental_date BETWEEN Cust.create_date AND DATE_ADD(Cust.create_date, INTERVAL 20 MONTH);


-- EX.2 ----------------------------

-- sub-query
EXPLAIN 
SELECT Cust.customer_id, Cust.name, Cust.create_date, 
    (SELECT COUNT(Rental.customer_id)
     FROM Rental
     WHERE Cust.customer_id = Rental.customer_id AND rental_date 
        BETWEEN Cust.create_date AND DATE_ADD(Cust.create_date, INTERVAL 20 MONTH)
    ) AS counts
FROM Customer Cust;

-- only JOIN
EXPLAIN 
SELECT Cust.customer_id, Cust.name, Cust.create_date, COUNT(Rental.customer_id) AS counts
FROM Rental
JOIN Customer Cust ON Cust.customer_id = Rental.customer_id
WHERE Rental.rental_date BETWEEN Cust.create_date AND DATE_ADD(Cust.create_date, INTERVAL 20 MONTH)
GROUP BY Cust.customer_id;


SELECT * FROM Customer Cust;