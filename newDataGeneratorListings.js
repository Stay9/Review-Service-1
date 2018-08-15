const axios = require('axios');
const download = require('image-downloader');
const XMLParser = require('xml-js');
const DateGen = require('random-date-generator');
const loremIpsum = require('lorem-ipsum');
const faker = require('faker');
var fs = require('fs');

var stream = fs.createWriteStream("/home/ricardo/Desktop/listings.csv", {flags:'a'});

//999,999 999999

var createStream = () => {
stream.once('open', (fd) => {
  for(var i =9000000; i<10000000; i++){
    tempObject = '"' + 'Listing ' + i + '"';
    stream.write(tempObject+"\n");
  }
    stream.end();
});  
}

createStream();

