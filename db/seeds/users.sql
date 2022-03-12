-- Users table seeds here (Example)
INSERT INTO users (name, email, password)
VALUES ('Alice', 'alice@gmail.com', 'password'),
('John', 'john@gmail.com', 'password');




-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   created_maps_id INTEGER REFERENCES maps(id),
--   favourite_maps_id INTEGER REFERENCES maps(id),
--   created_points_id INTEGER REFERENCES points(id),
--   favourite_points_id INTEGER REFERENCES points(id)
-- );

