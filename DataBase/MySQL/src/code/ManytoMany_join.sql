CREATE TABLE reviewers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

CREATE TABLE books(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    released_year YEAR(4) NOT NULL,
    language VARCHAR(100) NOT NULL,
    paperback INT NOT NULL
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating DECIMAL(2,1),
    book_id INT,
    reviewer_id INT,
    FOREIGN KEY(book_id) REFERENCES books(id),
    FOREIGN KEY(reviewer_id) REFERENCES reviewers(id)
);

INSERT INTO books(title, released_year, language, paperback) VALUES
    ('Fifty Shades of Grey Series', 2012, 'English', 514),
    ('Civilian Publishing Alif Baa Taa: Learning My Arabic Alphabet', 2018, 'Arabic', 30),
    ('The Hunger Games (Book 3)', 2014, 'English', 400),
    ('Santo Remedio', 2017, 'Spanish', 240),
    ('The Fault in Our Stars', 2012, 'English', 318),
    ('Harry Potter Und der Stein der Weisen (German Edition)', 2005, 'German', 334),
    ('Collection Folio, no. 2', 1971, 'French', 185),
    ('Santo remedio: Ilustrado y a color', 2018, 'Spanish', 216),
    ('Splatoon 2', 2017, 'Japanese', 384),
    ('Minna No Nihongo: Beginner 1, 2nd Edition', 2012, 'Japanese', 210);


INSERT INTO reviewers (first_name, last_name) VALUES
    ('Thomas', 'Stoneman'),
    ('Wyatt', 'Skaggs'),
    ('Kimbra', 'Masters'),
    ('Domingo', 'Cortes'),
    ('Colt', 'Steele'),
    ('Pinkie', 'Petit'),
    ('Marlon', 'Crafford');

INSERT INTO reviews(book_id, reviewer_id, rating) VALUES
    (1,1,8.0),(1,2,7.5),(1,3,8.5),(1,4,7.7),(1,5,8.9),
    (2,1,8.1),(2,4,6.0),(2,3,8.0),(2,6,8.4),(2,5,9.9),
    (3,1,7.0),(3,6,7.5),(3,4,8.0),(3,3,7.1),(3,5,8.0),
    (4,1,7.5),(4,3,7.8),(4,4,8.3),(4,2,7.6),(4,5,8.5),
    (5,1,9.5),(5,3,9.0),(5,4,9.1),(5,2,9.3),(5,5,9.9),
    (6,2,6.5),(6,3,7.8),(6,4,8.8),(6,2,8.4),(6,5,9.1),
    (7,2,9.1),(7,5,9.7),
    (8,4,8.5),(8,2,7.8),(8,6,8.8),(8,5,9.3),
    (9,2,5.5),(9,3,6.8),(9,4,5.8),(9,6,4.3),(9,5,4.5),
    (10,5,9.9);
