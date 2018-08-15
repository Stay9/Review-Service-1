const axios = require('axios');
const download = require('image-downloader');
const XMLParser = require('xml-js');
const DateGen = require('random-date-generator');
const loremIpsum = require('lorem-ipsum');
const faker = require('faker');
var fs = require('fs');

const getDate = () => {
  let start = new Date (2011, 1, 1);
  let end = new Date ();
  var randoDate = DateGen.getRandomDateInRange(start, end);
  return randoDate.toISOString().slice(0, 19).replace('T', ' ');
};

// const writeData = () => {
//   for(var i =0; i<100; i++){
//     var tempObject = '';
//     var listingid = Math.floor(Math.random()*1000);
//     var userid = Math.floor(Math.random()*1000000);
//     var accuracy = Math.floor(Math.random()*6);
//     var communication = Math.floor(Math.random()*6);
//     var cleanliness = Math.floor(Math.random()*6);
//     var location = Math.floor(Math.random()*6);
//     var check_in = Math.floor(Math.random()*6);
//     var _value = Math.floor(Math.random()*6);
//     var location = Math.floor(Math.random()*6);
//     var date = getDate();
//     let text = loremIpsum({units: 'sentences'});
//     tempObject = tempObject + '"' + listingid + '"' +',';
//     tempObject = tempObject + '"' + userid+ '"' + ',';
//     tempObject = tempObject + '"' + accuracy+ '"' + ',';
//     tempObject = tempObject + '"' + communication+ '"' + ',';
//     tempObject = tempObject + '"' + cleanliness+ '"' + ',';
//     tempObject = tempObject + '"' + location+ '"' + ',';
//     tempObject = tempObject + '"' + check_in+ '"' + ',';
//     tempObject = tempObject + '"' + _value+ '"' + ',';
//     tempObject = tempObject + '"' + date+ '"' + ',';
//     tempObject = tempObject + '"' + text+ '"' + ',';
//     tempObject = tempObject + '"' + true+ '"' + ',';
//     writeToFile(tempObject);
//   }
// }


var fs = require('fs');
var stream = fs.createWriteStream("/home/ricardo/Desktop/reviews.csv", {flags:'a'});


var createStream = () => {
stream.once('open', (fd) => {
  for(var i =0; i<1000000; i++){
    var tempObject = '';
    var listingid = Math.floor(Math.random()*10000000);
    var userid = Math.floor(Math.random()*20000000);
    var accuracy = Math.floor(Math.random()*6);
    var communication = Math.floor(Math.random()*6);
    var cleanliness = Math.floor(Math.random()*6);
    var location = Math.floor(Math.random()*6);
    var check_in = Math.floor(Math.random()*6);
    var _value = Math.floor(Math.random()*6);
    var location = Math.floor(Math.random()*6);
    var date = getDate();
    let text = loremIpsum({units: 'sentences'});
    tempObject = tempObject + listingid +',';
    tempObject = tempObject + userid + ',';
    tempObject = tempObject + accuracy + ',';
    tempObject = tempObject + communication + ',';
    tempObject = tempObject + cleanliness + ',';
    tempObject = tempObject + location + ',';
    tempObject = tempObject + check_in + ',';
    tempObject = tempObject + _value + ',';
    tempObject = tempObject + date + ',';
    tempObject = tempObject + '"' + text+ '"' + ',';
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
