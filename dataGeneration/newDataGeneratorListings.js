const axios = require('axios');
const download = require('image-downloader');
const XMLParser = require('xml-js');
const DateGen = require('random-date-generator');
const loremIpsum = require('lorem-ipsum');
const faker = require('faker');
var fs = require('fs');

const getListings = () => {
  for(var i =0; i<1000; i++){
     tempObject = faker.name.findName();
     //console.log(JSON.stringify(tempObject));
     fs.appendFile('/home/ricardo/Desktop/listings.csv', JSON.stringify(tempObject)+'\n', function (err) {
        if (err) throw err;
     });
   }
}

getListings();
