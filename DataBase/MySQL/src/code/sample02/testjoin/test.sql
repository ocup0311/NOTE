-- EX.1 ----------------------------

-- sub-query
SELECT ROUND(AVG(counts.num_of_movies_rented)) AS avg_num_of_movies_rented
FROM (
    SELECT COUNT(cust.customer_id) AS num_of_movies_rented
    FROM rental
    JOIN customer cust ON cust.customer_id = rental.customer_id
    WHERE rental_date BETWEEN cust.create_date AND DATE_ADD(cust.create_date, INTERVAL 20 MONTH)
    GROUP BY cust.customer_id
) AS counts;

-- CTE
WITH counts AS (
    SELECT COUNT(cust.customer_id) AS num_of_movies_rented
    FROM rental
    JOIN customer cust ON cust.customer_id = rental.customer_id
    WHERE rental_date BETWEEN cust.create_date AND DATE_ADD(cust.create_date, INTERVAL 20 MONTH)
    GROUP BY cust.customer_id
)
SELECT ROUND(AVG(counts.num_of_movies_rented)) AS avg_num_of_movies_rented
FROM counts;

-- only JOIN：針對不同需求分別需使用 inner/outer JOIN
SELECT ROUND(COUNT(rental.rental_id) / COUNT(DISTINCT cust.customer_id)) AS avg_num_of_movies_rented
FROM rental
JOIN customer cust ON cust.customer_id = rental.customer_id
WHERE rental.rental_date BETWEEN cust.create_date AND DATE_ADD(cust.create_date, INTERVAL 20 MONTH);

SELECT ROUND(COUNT(rental.rental_id) / COUNT(cust.customer_id)) AS avg_num_of_movies_rented
FROM customer cust
LEFT JOIN rental ON cust.customer_id = rental.customer_id
    AND rental.rental_date BETWEEN cust.create_date AND DATE_ADD(cust.create_date, INTERVAL 20 MONTH);


-- EX.2 ----------------------------

-- sub-query
EXPLAIN SELECT cust.customer_id, cust.name, cust.create_date, 
    (SELECT COUNT(rental.customer_id)
     FROM rental
     WHERE cust.customer_id = rental.customer_id AND rental_date 
        BETWEEN cust.create_date AND DATE_ADD(cust.create_date, INTERVAL 20 MONTH)
    ) AS counts
FROM customer cust;

-- only JOIN
EXPLAIN SELECT cust.customer_id, cust.name, cust.create_date, COUNT(rental.customer_id) AS counts
FROM rental
JOIN customer cust ON cust.customer_id = rental.customer_id
WHERE rental.rental_date BETWEEN cust.create_date AND DATE_ADD(cust.create_date, INTERVAL 20 MONTH)
GROUP BY cust.customer_id;


SELECT * FROM customer cust;