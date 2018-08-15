\setrandom num 8000000 10000000
\setrandom listing 0 10000000
\setrandom user 0 30000000
\setrandom accuracy 0 5
\setrandom communication 0 5
\setrandom cleanliness 0 5
\setrandom location 0 5
\setrandom check_in 0 5
\setrandom value 0 5
BEGIN;
--select * from reviews INNER JOIN listings ON reviews.listing_id = listings.id WHERE reviews.listing_id = :num; 
--INSERT INTO reviews VALUES (:listing, :user, :accuracy, :communication, :cleanliness, :location, :check_in, :value, '1971-07-13', 'Hi, this is just a test', true);
UPDATE reviews SET content = 'Hi this is just a test' FROM listings WHERE reviews.listing_id = listings.id AND reviews.listing_id = :num;
END;

-- To run ```pgbench -c 10 -f /home/ricardo/Documents/Bootcamp/SDC/Review-Service-1/database/ptest.sql -j 4 puppies -t 100000;```

