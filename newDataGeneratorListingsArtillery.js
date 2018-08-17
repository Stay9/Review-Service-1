const axios = require('axios');
const download = require('image-downloader');
const XMLParser = require('xml-js');
const DateGen = require('random-date-generator');
const loremIpsum = require('lorem-ipsum');
const faker = require('faker');
var fs = require('fs');

var stream = fs.createWriteStream("/home/ricardo/Desktop/listings_artillery.csv", {flags:'a'});

//999,999 999999

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createStream = () => {
stream.once('open', (fd) => {
  for(var i =0; i<10000000; i++){
    var i = getRandomInt(8000000,10000000);
    stream.write(i+"\n");
  }
    stream.end();
});  
}

createStream();

