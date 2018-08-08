var db = require('./config.js');

const getRatings = (listing_id, whenRatings) => {
  const qs = `SELECT accuracy, communication, cleanliness, location, check_in, _value \
              FROM reviews WHERE listing_id = ${listing_id}`;

  db.query(qs, whenRatings);
}

const getReviews = (listing_id, whenReviews) => {
  const qs = `select users.name, users.photo, reviews._date, reviews.content, reviews.is_reported \
              FROM users JOIN reviews \
              WHERE reviews.listing_id = ${listing_id} AND users.id = reviews.user_id
              ORDER BY reviews._date DESC`;

  db.query(qs, whenReviews);
}

const getReview = (review_id, whenReviews) => {
  const qs = `SELECT * \
              FROM users\
              WHERE id = ${review_id}`;
  db.query(qs, whenReviews);
}

const postReviews = (listing_id, user_id,
  accuracy, communication,
  cleanliness, location,
  check_in, value, date, content,
  whenRatings) => {
  const params =
    [listing_id,
    user_id, accuracy, communication,
    cleanliness, location,
    check_in, value, date, content];
  const qs =
    `INSERT INTO reviews (listing_id,
    user_id, accuracy, communication,
    cleanliness,
    location,
    check_in,
    _value, _date,
    content)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(qs, params, whenRatings);
}

const deleteReviews = (review_id, whenReviews) => {
  console.log(review_id);
  const qs = `DELETE FROM reviews WHERE id = ${review_id}`;
  db.query(qs, whenReviews);
}

const updateReviews = (review_id, field, value,
  whenRatings) => {
  const qs =
    `UPDATE reviews SET ${field} = ${value} WHERE id = ${review_id}`;
  db.query(qs, whenRatings);
}

module.exports = {
  getRatings: getRatings,
  getReviews: getReviews,
  postReviews: postReviews,
  deleteReviews:deleteReviews,
  updateReviews:updateReviews,
  getReview:getReview,
}

// getReviews(3, (error, result) => {
//   console.log(result);
// });

// postRatings(3, 3,
//   4.5, 1.5,
//   1.5, 2.4,
//   3.0, 1.6,
//   new Date (2011, 1, 1),
//   'Another test',
//   (error, result) => {
//     console.log(result);
//   });

//postRatings()
