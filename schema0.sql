CREATE TABLE users
(
  name character varying(100),
  photo character varying(100)
);

CREATE TABLE listings
(
  name character varying(100)
);

CREATE TABLE reviews
(
listing_id int NOT NULL,
user_id int NOT NULL,
accuracy int NOT NULL,
communication int NOT NULL,
cleanliness int NOT NULL,
location int NOT NULL,
check_in int NOT NULL,
_value int NOT NULL,
_date date NOT NULL,																																								
content character varying(1000),
is_reported boolean NULL
);

COPY listings(name)
FROM '/home/ricardo/Desktop/listings.csv' DELIMITER ',' CSV HEADER;

COPY users(name,photo)
FROM '/home/ricardo/Desktop/users.csv' DELIMITER ',' CSV HEADER;

COPY reviews(listing_id,user_id,accuracy,communication,cleanliness,location,check_in,_value,_date,content,is_reported)
FROM '/home/ricardo/Desktop/reviews.csv' DELIMITER ',' CSV HEADER;																																																				

ALTER TABLE listings ADD COLUMN id SERIAL PRIMARY KEY;
ALTER TABLE users ADD COLUMN id SERIAL PRIMARY KEY;
ALTER TABLE reviews ADD COLUMN id SERIAL PRIMARY KEY;

ALTER TABLE reviews ADD CONSTRAINT foreign_key FOREIGN KEY (listing_id) REFERENCES listings (id)
ALTER TABLE reviews ADD CONSTRAINT foreign_key1 FOREIGN KEY (user_id) REFERENCES users (id)

CREATE INDEX ON users (id);
CREATE INDEX ON listings (id);
CREATE INDEX ON reviews (id);