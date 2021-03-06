# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Additional notes

### Documented CRUD

To make GET requests to the server intended to update a review given a review id, a field and a value:

`curl -H "Content-Type: application/json" -X GET -d '{"reviewid":"176"}' http://localhost:3002/api/listing/:listingid/reviews:reviewid`

To make POST request to the server intended to post a new review given a listing id:

`curl -H "Content-Type: application/json" -X POST -d '{"listingid":"3", "userid":"3", "accuracy":"2.4", "communication":"2.0", "cleanliness":"2.1", "location":"2.2", "check_in":"2.3", "value":"2.4", "date": "2011-02-01 00:00:00", "content":"Second Test"}' http://localhost:3002/api/listing/:listingid/reviews:reviewid`

To make DELETE requests to the server intended to delete a review given a review id:

`curl -H "Content-Type: application/json" -X DELETE -d '{"reviewid":"177"}' http://localhost:3002/api/listing/:listingid/reviews:reviewid`

To make PUT requests to the server intended to update a review given a review id, a field and a value:

`curl -H "Content-Type: application/json" -X PUT -d '{"reviewid":"176", "field":"accuracy", "value":"4.9"}' http://localhost:3002/api/listing/:listingid/reviews:reviewid`

## Data generation

Data generation was implemented using 3 scripts for each table ans using csv files.
The approximate time to generate data for reviews (the largest file of above 10 million entries was 15 minutes).
The bash command to look for the number of lines in a csv file is `cat reviews.csv  | wc -l`.
reviews.csv file has 32,000,000 entries.
users.csv file has 10,000,000 entries.
listings.csv file has 10,000,000 entries.

## Using postgres

- The command for accesing postgres is `sudo su - postgres`.
- To create a new database type `createdb [NAME]`.
- To get out of a database type `\q`.
- To access a database type `psql -s [NAME]`.
- To link to schema sql file: \i basics.sql

`psql -h localhost -U ricardo -d puppies -c "\copy users FROM '/home/ricardo/Desktop/users.csv' with (format csv, delimiter ',');"`

- to change users inside a database run `ALTER USER postgres PASSWORD 'newPassword';`, this is useful to change passwords.


- To output to csv `COPY (SELECT name FROM users JOIN reviews ON (users.id = reviews.user_id)) TO '/home/ricardo/Desktop/reviews_by_listing4.csv' DELIMITER ',' CSV HEADER;`

`COPY (select reviews.listing_id, reviews._date, users.name, reviews.accuracy, reviews.communication, reviews.cleanliness, reviews.location,reviews.check_in, reviews._value, reviews.content, reviews.is_reported FROM reviews, users WHERE reviews.user_id = users.id) to '/home/ricardo/Desktop/reviews_by_listing1.csv' DELIMITER ',' CSV HEADER;`


- To cut files columns and combine run `join -t, <(csvcut -c 1,3,4,5,6,7,8,9,10,11 reviews6.csv) <(csvcut -c 1 reviews_by_listing4.csv)`

Change permissions of files
`sudo chmod -R o+rw ./reviews_by_listing1.csv`

COPY (select reviews.listing_id, reviews._date, users.name, reviews.accuracy, reviews.communication, reviews.cleanliness, reviews.location,reviews.check_in, reviews._value, reviews.content, reviews.is_reported FROM reviews, users WHERE reviews.user_id = users.id) to '/home/ricardo/Desktop/reviews_by_listing1.csv' DELIMITER ',' CSV HEADER;

count number of lines in csv file with operating syste `cat reviews_by_listing1.csv | wc -l
`

## Using Cassandra

- The command to start a cassandra service is `sudo service cassandra start`

### Configuring Cassandra

- Follow tutorial
cd
https://docs.datastax.com/en/dse/5.1/dse-dev/datastax_enterprise/install/installTARdse.html#

- to start Cassandra type bin/dse in directory `/Documents/Bootcamp/dse-5.1.10`.
- to start the command line for cassandra type `bin/dse cassandra`.
- to access cqlsh type `bin/cqlsh`
- I had to refactor my files to switch columns using the command `awk 'BEGIN{FS=",";OFS=",";} {print $3,$1,$2}' foo.csv`

- To escape double quotes in csv file use `awk -F, -v OFS="," '{gsub("\"","",$1)0gsub("\"","",$3);}1;' file.csv`, the $3 and $1 refer to the columns 3 and 1 respectively.

-To change permission to write all 

## Cassandra Schema

Sourcing files:

` SOURCE './myscript.cql'`

Run stress tests:

- `./bin/cassandra-stress user profile=puppies.yaml ops\(singlepost=1\)`
- `./bin/cassandra-stress mixed ratio\(write=1,read=10\) n=100000 cl=ONE -pop dist=UNIFORM\(1..1000000\) -schema keyspace="puppies" -mode native cql3 -rate threads=16 -graph file=./graph_varying_read-write.html revision=write1-read1_8_10`
- ./puppies.yaml is a configuration file to run simulation queries in a similar table in Cassandra.

Relic

https://rpm.newrelic.com/accounts/2069509/applications/setup#

- Command to start server requiring relic:
`node server.js -require newrelic`

- Command to start artillery:

`artillery quick -n 100 -r 20 -d 120 http://localhost:3001;`

Change consistency level for Cassandra

ALTER KEYSPACE "puppies" WITH REPLICATION =
  { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

 ALTER TABLE reviews_by_listing3 WITH
  compaction = { 'class' :  'LeveledCompactionStrategy'  }


 How to install REDIS

 https://askubuntu.com/questions/868848/how-to-install-redis-on-ubuntu-16-04

 Sending files over AWS 
- `scp -i ./SDC.pem ./reviews_by_listing2.csv ubuntu@ec2-18-219-66-176.us-east-2.compute.amazonaws.com:~`

It is important to change the address of the http requests to the EC2 instances in the client App component

Instructions to set instance in ec2 from Github
1. Change IP adress of configCassandra file to IP address of Cassandra instance.
2. Change 'localhost' to `<public IP address>` of instance
3. Install github in instance
	- `sudo apt-get update`
	- `sudo apt-get install git`
4. Clone repo.
	`https://github.com/Stay9/Review-Service-1.git`
5. Send newRelic.js file and put it in server folder
	`scp -i ./SDC.pem ./newrelic.js ubuntu@ec2-18-219-66-176.us-east-2.compute.amazonaws.com:~`
6. Install redis and start server.
	`wget http://download.redis.io/redis-stable.tar.gz`
	`tar xvzf redis-stable.tar.gz`
	`cd redis-stable`
	`make`
	`sudo cp src/redis-server /usr/local/bin/`
	`sudo cp src/redis-cli /usr/local/bin/`
	start redis in background `redis-server --daemonize yes`
7. Install nginxs.
	- `sudo apt-get update`
	-  `sudo apt-get install nginx`
8. Install node
	- `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -` //me quede aqui
	- `sudo apt-get install -y nodejs`
9. sudo apt install npm 
10. `node Reviews/server server.js &`


## Other

- How to kill node:
 - `ps aux | grep node`
 - `kill -9 <PID>`

Tools used

- newRelic
- Loader IO

In order to scale the application the following was added to the running instance in order to guarantee that the server will run at start up - reboot

`  GNU nano 2.5.3             File: executeApp.sh                                
#!/bin/bash

echo "Hello World!"

redis-server --daemonize yes
node ~/Review-Service-1/server/server.js &
`
- edit crontab file `crontab -e` with the following line `@reboot  /path_to_you_file/your_file`
