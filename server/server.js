
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/operations.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/../client/dist')));

// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/listing/:listingid/overview', (req, res) => {
  const listing_id = Number(req.params.listingid);
  console.log(listing_id);
  let ratingsObj = {};


  db.getRatings(listing_id, function(err, results) {
    if (err) {
      console.log('err in server - overview: ', err)
      return;
    }

    ratingsObj.total = results.length;
    ratingsObj.accuracy = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj.communication = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj.cleanliness = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj.location = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj.check_in = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj._value = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj.avg = Math.round(((ratingsObj.accuracy + ratingsObj.communication + ratingsObj.cleanliness + ratingsObj.location + ratingsObj.check_in + ratingsObj._value) / 6) * 2) /2;
    // results.forEach(function(ratings) {
    //   ratingsObj.avg += ratings.accuracy;
    //   ratingsObj.accuracy += ratings.accuracy;
    //   ratingsObj.avg += ratings.communication;
    //   ratingsObj.communication += ratings.communication;
    //   ratingsObj.avg += ratings.cleanliness;
    //   ratingsObj.cleanliness += ratings.cleanliness;
    //   ratingsObj.avg += ratings.location;
    //   ratingsObj.location += ratings.location;
    //   ratingsObj.avg += ratings.check_in;
    //   ratingsObj.check_in += ratings.check_in;
    //   ratingsObj.avg += ratings._value;
    //   ratingsObj._value += ratings._value;
    //   console.log(ratings.accuracy);
    // });

    // ratingsObj.avg = Math.round((ratingsObj.avg/ (results.length * 6)) * 2) / 2;
    // ratingsObj.accuracy = Math.round((ratingsObj.accuracy / results.length) * 2) / 2;
    // ratingsObj.communication = Math.round((ratingsObj.communication / results.length) * 2) / 2;
    // ratingsObj.cleanliness = Math.round((ratingsObj.cleanliness / results.length) * 2) / 2;
    // ratingsObj.location = Math.round((ratingsObj.location / results.length) * 2) / 2;
    // ratingsObj.check_in = Math.round((ratingsObj.check_in / results.length) * 2) / 2;
    // ratingsObj._value = Math.round((ratingsObj._value / results.length) * 2) / 2;

    res.status(200).json(ratingsObj);
  });
});

app.get('/api/listing/:listingid/reviews', (req, res) => {
  const listing_id = Number(req.params.listingid);
  console.log(listing_id);

  db.getReviews(listing_id, function(err, results) {
    if (err) {
      console.log('err in server - reviews: ', err)
      return;
    }

    res.status(200).json(results);
  });
});


app.get('/api/listing/:listingid/reviews:reviewid', (req, res) => {
  const review_id = Number(req.body.reviewid);
  console.log(review_id);

  //write function to get from database
  db.getReview(review_id, function(err, results) {
    if (err) {
      console.log('err in server - reviews: ', err)
      return;
    }
    res.status(201).json(results);
  });
});


app.delete('/api/listing/:listingid/reviews:reviewid', (req, res) => {
  const review_id = Number(req.body.reviewid);
  console.log(review_id);

  db.deleteReviews(review_id, function(err, results) {
    if (err) {
      console.log('err in server - reviews: ', err)
      return;
    }
    res.status(200).json(results);
  });
});

app.put('/api/listing/:listingid/reviews:reviewid', (req, res) => {
  const review_id = Number(req.body.reviewid);
  const field = String(req.body.field);
  const value = String(req.body.value);
  console.log(review_id);
  db.updateReviews(review_id, field, value, function(err, results) {
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
  const user_id = Number(req.body.userid);
  const accuracy = Number(req.body.accuracy);
  const communication = Number(req.body.communication);
  const cleanliness = Number(req.body.cleanliness);
  const location = Number(req.body.location);
  const check_in = Number(req.body.check_in);
  const value = Number(req.body.value);
  const date = req.body.date;
  const content = String(req.body.content);

  console.log(listing_id);

  db.postReviews(listing_id, user_id,
    accuracy, communication,
    cleanliness, location,
    check_in, value, date, content, function(err, results) {
    if (err) {
      console.log('err in server - reviews: ', err)
      return;
    }
    res.status(201).send();
  });
});

app.listen(3002, console.log('Listening on port 3002'));

module.exports = app;
