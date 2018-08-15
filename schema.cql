DROP KEYSPACE IF EXISTS puppies;

CREATE KEYSPACE puppies WITH replication = {'class': 'SimpleStrategy', 'replication_factor':10};

USE puppies;

CREATE TABLE users(
	id int,
	name TEXT,
	photo TEXT,
	PRIMARY KEY (name)
);

CREATE TABLE listings(
	id int,
	name TEXT,
	PRIMARY KEY (name)
);

CREATE TABLE reviews_by_listing (
	listing_id int,
	date date,
	user_name TEXT,
	accuracy int,
	communication int,
	cleanliness int,
	location int,
	check_in int,
	value int,
	content TEXT,
	is_reported boolean,
	PRIMARY KEY((listing_id), date, user_name)) WITH CLUSTERING ORDER BY (date DESC, user_name ASC);

COPY reviews_by_listing (
	listing_id,
	date,
	user_name,
	accuracy,
	communication,
	cleanliness,
	location,
	check_in,
	value,
	content,
	is_reported
	) FROM './../../../Desktop/reviews_by_listing1.csv' WITH HEADER = true;

COPY users (
	id,
	name,
	photo
	) FROM './../../../Desktop/users1.csv' WITH HEADER = true;

COPY listings (
	id,
	name
	) FROM './../../../Desktop/listings1.csv' WITH HEADER = true;
