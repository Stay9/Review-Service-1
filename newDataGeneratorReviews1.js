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

const getDate = () => {
  let start = new Date (2011, 1, 1);
  let end = new Date ();
  var randoDate = DateGen.getRandomDateInRange(start, end);
  return randoDate.toISOString().slice(0, 19).replace('T', ' ');
};

var stream = fs.createWriteStream("/home/ricardo/Desktop/reviews_by_listing2.csv", {flags:'a'});

var createStream = () => {
stream.once('open', (fd) => {
  for(var i =0; i<1000000; i++){
    var tempObject = '';
    var listingid = Math.floor(Math.random()*10000000);
    var date = getDate();
    var user_name = faker.name.findName();
    var photo = 'https://s3.amazonaws.com/ricardodogpics/' + array[Math.floor(Math.random()*array.length)]; 
    var accuracy = Math.floor(Math.random()*6);
    var communication = Math.floor(Math.random()*6);
    var cleanliness = Math.floor(Math.random()*6);
    var location = Math.floor(Math.random()*6);
    var check_in = Math.floor(Math.random()*6);
    var value = Math.floor(Math.random()*6);
    let content = loremIpsum({units: 'sentences'});
    tempObject = tempObject + listingid +',';
    tempObject = tempObject + date + ',';
    tempObject = tempObject + user_name + ',';
    tempObject = tempObject + photo + ',';
    tempObject = tempObject + accuracy + ',';
    tempObject = tempObject + communication + ',';
    tempObject = tempObject + cleanliness + ',';
    tempObject = tempObject + location + ',';
    tempObject = tempObject + check_in + ',';
    tempObject = tempObject + value + ',';
    tempObject = tempObject + content+ ',';
    tempObject = tempObject + true;
    stream.write(tempObject+"\n");
  }
    stream.end();
});  
}

createStream();
// const writeToFile = (object) => {
//   fs.appendFile('/home/ricardo/Desktop/reviews.csv',
//   object+"\n",
//   (err) => {
//     if(err){
//       console.log('error writing to array');
//     }
//   }
// // )}
// //100 0000
// const writeChunks = () =>{
//   for(var i =0; i<10000; i++){
//     writeData();
//   }
// }

//writeChunks();
