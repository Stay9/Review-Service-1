const axios = require('axios');
const download = require('image-downloader');
const XMLParser = require('xml-js');
const DateGen = require('random-date-generator');
const loremIpsum = require('lorem-ipsum');
const faker = require('faker');
var fs = require('fs');

//first we need to create the users.
//users have "name-lastname", and a picture.

var array = fs.readdirSync('/home/ricardo/Desktop/images').toString().split(",");


var finalUsers = [];
const getUsers = () => {
  for(var i =0; i<100000; i++){
     var tempImage = 'https://s3.amazonaws.com/ricardodogpics/' + array[Math.floor(Math.random()*array.length)];
     var tempObject = ''+faker.name.findName()+ ',' + String(tempImage);
     fs.appendFile('/home/ricardo/Desktop/users.csv', JSON.stringify(tempObject)+'\n', function (err) {
        if (err) throw err;
     });
   }
}
getUsers();
