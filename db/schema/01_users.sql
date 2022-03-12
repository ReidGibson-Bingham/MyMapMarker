-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  created_maps_id INTEGER REFERENCES maps(id),
  favourite_maps_id INTEGER REFERENCES maps(id),
  created_points_id INTEGER REFERENCES points(id),
  favourite_points_id INTEGER REFERENCES points(id)
);

