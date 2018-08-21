const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['18.219.66.176'], //public ip address of Cassandra instance
  keyspace:'puppies'
});


const getReviewsByListingCass = (listing_id, callback) => {
	const query = 'SELECT * FROM reviews_by_listing3 WHERE listing_id = ? ORDER BY date DESC';
	client.execute(query, [listing_id], { hints : ['int'] })
  	.then((result) => {
  		callback(result)
  	});	
}


const getRatings = (listing_id, callback) => {
  const query = 'SELECT accuracy, communication, cleanliness, location, check_in, value \
              FROM reviews_by_listing3 WHERE listing_id = ? ORDER BY date DESC';
  client.execute(query, [listing_id], { hints : ['int'] })
    .then((result) => {
      callback(result)
    });
}

// getReviewsByListingCass(10, console.log);

const deleteReview = (listing_id, date, user_name, callback) => {
  const query = 'DELETE FROM reviews_by_listing3 WHERE listing_id = ? AND date = ? AND user_name = ?';
  client.execute(query, [listing_id, date,user_name], { hints : ['int', 'timestamp', 'TEXT'] })
    .then((result) => {
      callback(result)
    });
}

//pendiente arreglar orden
const PostReviews = (
  listing_id,
  date,
  user_name,
  accuracy,
  check_in,
  cleanliness,
  communication,
  content,
  is_reported,
  location,
  photo,
  value, callback) => {
  // var initialTime = new Date().getTime()
  const query = 'INSERT INTO reviews_by_listing3 (\
    listing_id,\
    date,\
    user_name,\
    accuracy,\
    check_in,\
    cleanliness,\
    communication,\
    content,\
    is_reported,\
    location,\
    photo,\
    value) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
  client.execute(query, [listing_id, date, user_name, accuracy, check_in, cleanliness,
   communication, content, is_reported, location, photo, value], { hints : ['int', 'timestamp', 'TEXT', 'int', 'int', 'int', 'int', 'TEXT', 'boolean', 'int', 'TEXT', 'int'] })
    .then((result) => {
      // var totaltime = new Date().getTime()-initialTime;
      // console.log(totaltime)
      callback(result)
  
  });
}

// deleteReview(176, '2017-01-08T19:26:56.000Z', "Rodrigo Figueroa", console.log);
// PostReviews(176, '2017-01-08T19:26:56.000Z', 'Rodrigo Figueroa', 1,1,1,1, 'hi this is just a test' ,true, 1, 'https://s3.amazonaws.com/ricardodogpics/n02088364_2566.jpg', 1 , console.log);

module.exports = {
  getReviewsByListingCass: getReviewsByListingCass,
  getRatings: getRatings,
  deleteReview: deleteReview,
  PostReviews:PostReviews
}



// This function is just for testing
// var getUsersByReviewsAndListingCass = (listing_id) => {
//   var initialTime = new Date().getTime()
// 	const query = 'SELECT * FROM reviews_by_listing WHERE listing_id = ?';
// 	client.execute(query, [listing_id], { hints : ['int'] })
//   	.then((result) => {
//   		var user_name = result.rows[0].user_name;
//   		const query1 = 'SELECT id FROM users WHERE name = ?';
//   		client.execute(query1, [user_name], { hints : ['TEXT'] }).then((result) =>{
//   			if(result){
//           // console.log(result);
//           var totaltime = new Date().getTime()-initialTime;
//           console.log(result, totaltime)
//         }
//   		})
//   	});	
// }


// getUsersByReviewsAndListingCass(Math.random(8000000, 10000000));

