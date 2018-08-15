var pg = require('pg');
var conString = "postgres://postgres:Ricarofi1@localhost:5432/puppies";

var client = new pg.Client(conString);
client.connect();


client.query('select * from reviews where id=1', (err, res) => {
  console.log(err, res)
  client.end()
})