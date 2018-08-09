const axios = require('axios');
const download = require('image-downloader');
const XMLParser = require('xml-js');
const DateGen = require('random-date-generator');
const loremIpsum = require('lorem-ipsum');
const faker = require('faker');
var fs = require('fs');

const getDogImages = () => {
  var origUrls = [];

  for (var i = 0; i < 1000; i++) {
    var promise = new Promise ((resolve, reject) => {
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then(function(response) {
        resolve(response.data.message);
      })
      .catch(function(err) {
        reject(err);
      })
    });

    origUrls.push(promise);
  }

  Promise.all(origUrls).then(function(urlArr) {
    urlArr.forEach(function(url) {
      const options = {
        url: url,
        dest: '/home/ricardo/Desktop/images'
      }

      download.image(options)
      .then((filename, image) => {
        console.log('file saved to ', filename)
      })
      .catch((err) => {
        console.log(err);
      })
    });
  })
}

getDogImages();
