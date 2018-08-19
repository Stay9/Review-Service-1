require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var compression = require('compression')
var redis = require('redis');
// const db = require('../database/operations.js'); //for mysql
const db = require('../database/configCassandra.js'); //for cassandra

client = redis.createClient(process.env.REDIS_URL);
console.log(process.env.REDIS_URL);

client.on('error', function(err){
  console.log('Error' + err);
});

var cluster = require('cluster');  
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {  
  for (var i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }
} 
else {
    // Workers share the TCP connection in this server
  var app = express();
  app.use(compression());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(express.static(path.join(__dirname, '/../client/dist')));

  app.get('/api/listing/:listingid/overview', (req, res) => {

    const listing_id = Number(req.params.listingid);
    client.get(listing_id, function(error, result){
    if(result){
          res.send(result.rows);
    }
    else{
      let ratingsObj = {};
      db.getRatings(listing_id, function(results) {
      var totalAccuracy = 0;
      var totalCommunication = 0;
      var totalCleanliness = 0;
      var totalLocation = 0;
      var totalCheck_In = 0;
      var totalValue = 0;    
      var total = 0;
      var rows = results.rows;
      for(var i=0; i<rows.length; i++){
        totalAccuracy = totalAccuracy + rows[i].accuracy;
        totalCommunication = totalCommunication+ rows[i].communication;
        totalCleanliness = totalCleanliness + rows[i].cleanliness;
        totalLocation =  totalLocation + rows[i].location;
        totalCheck_In = totalCheck_In + rows[i].check_in;
        totalValue = totalValue + rows[i].value;
        total = total + totalAccuracy + totalCommunication 
        + totalCleanliness + totalLocation + totalCheck_In
        + totalValue;
      }
      totalAccuracy = totalAccuracy/rows.length;
      totalCommunication = totalCommunication/rows.length;
      totalCleanliness = totalCleanliness/rows.length;
      totalLocation =  totalLocation/rows.length;
      totalCheck_In = totalCheck_In/rows.length;
      totalValue = totalValue/rows.length;
      total = rows.length

      ratingsObj.total = total;
      ratingsObj.accuracy = totalAccuracy;
      ratingsObj.communication = totalCommunication;
      ratingsObj.cleanliness = totalCleanliness;
      ratingsObj.location = totalLocation;
      ratingsObj.check_in = totalCheck_In;
      ratingsObj._value = totalValue;
      ratingsObj.avg = total/(rows.length*6);

      client.setex(listing_id + 'o', 60, results);//pending
      
      res.status(200).json(ratingsObj);

      });    
      }  
    })
  });

  app.get('/api/listing/:listingid/reviews', (req, res) => {
    const listing_id = Number(req.params.listingid);
    client.get(listing_id, function(error, result){
      if(result){
        res.send(result.rows);
      }
      else{
        db.getReviewsByListingCass(listing_id, function(results) {
        client.setex(listing_id, 60, results.rows);
        res.status(200).json(results.rows);
        });
      }    
    });
  });


  app.delete('/api/listing/:listingid/reviews', (req, res) => {
    const review_id = Number(req.body.listingid);
    const user_name = String(req.body.username);
    const date = String(req.body.date);
    console.log(review_id);

    db.deleteReview(review_id, date, user_name ,function(err, results) {
      if (err) {
        console.log('err in server - reviews: ', err)
        return;
      }
      res.status(200).json(results);
    });
  });


  app.post('/api/listing/:listingid/reviews:reviewid', (req, res) => {
    console.log(req.body, 'request');
    const listing_id = Number(req.body.listingid);
    const date = req.body.date;
    const user_name = Number(req.body.username);
    const accuracy = Number(req.body.accuracy);
    const check_in = Number(req.body.check_in);
    const cleanliness = Number(req.body.cleanliness);
    const communication = Number(req.body.communication);
    const content = String(req.body.content);
    const is_reported = req.body.is_reported;
    const location = Number(req.body.location);
    const photo = String(req.body.photo);
    const value = Number(req.body.value);

    db.postReviews(listing_id, date,
      user_name, accuracy, check_in, cleanliness,
      communication, content, is_reported, location,
      photo, value, function(err, results) {
      if (err) {
        console.log('err in server - reviews: ', err)
        return;
      }
      res.status(201).send();
      });
    });
    

    // All workers use this port
    app.listen(3002, console.log('Listening on port 3002'));
    module.exports = app;

}











