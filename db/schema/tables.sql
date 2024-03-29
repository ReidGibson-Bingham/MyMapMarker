-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP
);

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  user_id INTEGER,
  latitude FLOAT(24),
  longitude FLOAT(24),
  created_at TIMESTAMP,
  favourite_map BOOLEAN
);

CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  user_id INTEGER,
  map_id VARCHAR(255) NOT NULL,
  latitude FLOAT(24),
  longitude FLOAT(24),
  created_at TIMESTAMP,
  favourite_point BOOLEAN
);
