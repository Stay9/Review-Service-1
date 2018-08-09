
const axios = require('axios');
const download = require('image-downloader');
const XMLParser = require('xml-js');
const DateGen = require('random-date-generator');

const loremIpsum = require('lorem-ipsum');
const db = require('./database/config.js');

const getPhotos = () => {
  var origUrls = [];

  for (var i = 0; i < 20; i++) {
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
        dest: './user_images'
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

const getAWSPhotos = () => {
  var urlArr = [];
  var accURLArr;

  axios.get('http://adamdogpics.s3.amazonaws.com')
  .then(function(response) {
    console.log(typeof response.data);
    var urls = XMLParser.xml2json(response.data, {compact: true, spaces: 4});
    urls = JSON.parse(urls);
    urls = urls.ListBucketResult.Contents.map(function(content) {
      return content.Key
    });
    urls = urls.map(function(obj) {
      return obj._text;
    })
    urls = urls.map(function(file) {
      return 'https://s3-us-west-1.amazonaws.com/adamdogpics/' + file;
    })

    var mid = Math.floor(urls.length/2);
    console.log(urls.slice(0, mid));
    console.log(urls.slice(mid));


    // urls = urls.map(function(obj) {
    //   return obj["_text"];
    // })

  })
  .catch(function(err) {
    console.log('err: ', err);
  });
}

const insertUsers = () => {
  let qs;
  const names = [
    'PetitAnge',
    'ChooChoo',
    'Horshack',
    'Salsa',
    'Cassie',
    'Whisper',
    'Junior',
    'Monty',
    'Stinky',
    'Dante',
    'Sooner',
    'Neutron',
    'Gusto',
    'Quixote',
    'Escapade',
    'Jazz',
    'Angus',
    'Tarragon',
    'Macho',
    'Jazz',
    'Brando',
    'Asset',
    'Soueee',
    'Delta',
    'Catalina',
    'Grover',
    'Valentino',
    'Zephyr',
    'Blackie',
    'Sparrow',
    'Rotten',
    'Bandit',
    'Birdy',
    'Wildwood',
    'Truffles',
    'Zoe',
    'Ricotta',
    'Baxter',
    'Portly',
    'Ebi',
    'Mole',
    'Falcon',
    'Ginger',
    'Babushka',
    'Capo',
    'Blotto',
    'Maggie',
    'Kosmic',
    'Asylum',
    'Furr',
    'BamBam',
    'Boss',
    'Ralph',
    'Yule',
    'Caribou',
    'Knickerbocker',
    'Elsa',
    'Brie',
    'Marshmallow',
    'ChaCha',
    'Rambo',
    'Sweetness',
    'Tinkerbell',
    'Panther',
    'Ray',
    'Ricotta',
    'Furr',
    'Gertrude',
    'Brownie',
    'Alfalfa',
    'Anais',
    'Mustang',
    'Lamborghini',
    'Web',
    'Laser',
    'Gatekeeper',
    'Sam',
    'Benebop Cumberfloof',
    'Dweeb',
    'Mongoose',
    'Braindead',
    'Thistle',
    'Chocolate',
    'Bamboozler',
    'Hugo',
    'Shah',
    'Ammo',
    'Linus',
    'Shrimp',
    'Knickerbocker',
    'Queeny',
    'Marlboro',
    'Butterball',
    'Pretty',
    'Casanova',
    'Poindexter',
    'Tissot',
    'Chester',
    'Joker',
    'Sly',
    'Spitfire',
    'Blue',
    'Moet',
    'Buzz',
    'Viva',
    'Sugarbaker',
    'Chiffon',
    'Quasimodo',
    'Condor',
    'Baron',
    'Sherlock',
    'Candy',
    'Lashes',
    'PitStop',
    'Trouper',
    'Sniffer',
    'Wagalot',
    'TerraCotta',
    'Geekie',
    'Zooey',
    'Inky',
    'Caleb',
    'Hefty',
    'Tomba',
    'Ghiradelli',
    'Astro',
    'Sashimi',
    'Bandito',
    'Ludwig',
    'Elvira',
    'Melody',
    'Shiksa',
    'Nightmare',
    'Tissot',
    'TomTom',
  ];

  const photos = [
    'https://s3-us-west-1.amazonaws.com/adamdogpics/Akita_Inu_dog.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/IMAG1063.jpeg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/IMG_081858.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/IMG_4421.JPG',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/Polo.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/cooper1.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/dachshund-123503_640.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/dachshund-1920_640.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/dog-495122_640.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/funny dog.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02085620_6295.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02085620_8636.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02085936_8449.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02086910_5017.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02086910_6682.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02086910_984.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02087394_8903.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02088094_5285.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02088238_9025.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02088364_12710.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02088364_16339.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02088632_2661.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02088632_2837.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02089078_269.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02089078_4331.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02089078_45.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02090379_4754.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02090721_6617.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02091032_135.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02091032_3886.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02091134_12375.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02091134_17675.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02091467_2723.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02091635_1302.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02091831_3847.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02092002_11459.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02092002_4898.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02092002_49.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02092339_272.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02093256_1757.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02093256_4090.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02093647_3058.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02096051_7580.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02096177_362.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02096294_4137.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02097209_1923.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02098413_20398.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02098413_20830.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02099712_2226.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02100735_3599.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02100735_6886.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02101556_8039.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02104029_3491.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02104029_3564.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02104365_6131.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105056_5111.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105162_1366.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105162_5913.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105162_6690.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105251_1382.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105251_673.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105412_2212.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105412_4674.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105505_3380.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105641_1815.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105641_2018.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02105641_9074.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02106030_10883.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02106030_15388.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02106166_1936.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02106382_1311.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02106382_2417.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02106550_12073.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02106550_5710.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02106550_9432.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02106662_13599.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02106662_16149.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02107142_1901.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02107142_2779.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02107142_5517.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02107142_7459.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02107683_1282.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02107683_4260.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02108000_2937.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02108000_3007.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02108422_1549.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02108915_142.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02109047_9396.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02109525_10792.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02109525_1624.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02109525_2770.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02109525_370.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02109961_3817.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02109961_5035.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02110063_8757.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02110627_13553.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02110806_4331.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02110958_12025.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02110958_12625.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02110958_9929.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02111129_2359.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02111129_3799.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02111129_4584.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02111277_1177.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02111500_1050.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02111500_1603.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02111889_11729.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02111889_466.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02111889_4967.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02111889_5532.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02112018_12953.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02112018_2336.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02112018_2896.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02112137_161.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02112137_5089.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02112137_5420.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02112350_177.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02112706_231.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02112706_473.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02113023_3509.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02113023_4128.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02113023_9001.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02113186_9924.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02113799_298.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02113978_2441.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02113978_386.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02115641_9110.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02115913_3529.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02115913_4119.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02116738_2020.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/n02116738_2802.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/shiba-1.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/shiba-2.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/shiba-3i.jpg',
    'https://s3-us-west-1.amazonaws.com/adamdogpics/shiba-9.jpg'
  ]

  for (var i = 0; i < names.length; i++) {
    //write query here
    qs = `INSERT INTO users (name, photo) VALUES ("${names[i]}", "${photos[i]}")`;
    db.query(qs, function(err) {
        if (err) {
            console.log(err);
            return;
        }
    });
  }

}

const getContent = () => {
  var finalArr = [];
  let declaratives = ['Wow', 'Did me a frighten', 'mlem', 'blep', 'slept on tha sofa', '10/10', 'Listen frien', 'Amaze', 'lol', 'Host is good boy', 'OMG', 'Did me a concern', 'Remain calm!', 'v happy', 'best pupdate', 'Heckin big shower']
  let adjectives = ['Such', 'So', 'Many', 'Much', 'Heckin awesome'];
  let perks = ['pad', 'location', 'lighting', 'comfort', 'opulent', 'classy', 'decor'];
  let verbs = ['sploot', 'bork', 'fluff', 'boop', 'boof'];
  let declarativeNum = Math.floor(Math.random() * (declaratives.length - 5) + 5);
  let phraseNum = Math.floor(Math.random() * (verbs.length - 3 ) + 3);
  let wouldIndex = Math.floor(Math.random() * verbs.length);
  let curAdjective;
  let curPerk

  let oneInTen =  Math.floor(Math.random() * (10 - 1) + 1);
  let oneInTwo = Math.floor(Math.random() * (2 - 1) + 1);

  if (oneInTen === 5) {
    if (oneInTwo === 1) {
      return 'Ball '.repeat(35);
    } else {
      return 'Cat '.repeat(35);
    }
  }

  while (declarativeNum > 0) {
    finalArr.push(declaratives.splice(Math.floor(Math.random() * (declaratives.length)), 1).pop())
    declarativeNum--;
  }

  while (phraseNum > 0) {
    curAdjective = adjectives.splice(Math.floor(Math.random() * (adjectives.length)), 1).pop();
    curPerk = perks.splice(Math.floor(Math.random() * (perks.length)), 1).pop();
    finalArr.push(curAdjective + ' ' + curPerk);
    phraseNum--;
  }

  finalArr.push('Would ' + verbs[wouldIndex] + ' again');


  finalArr = shuffle(finalArr);
  return finalArr.join('. ');
}

const shuffle = (arr) => {
  var temp;
  var rando;

  for (var i = arr.length - 1; i >= 0; i--) {
    rando = Math.floor(Math.random() * arr.length);
    temp = arr[i];
    arr[i] = arr[rando];
    arr[rando] = temp;
  }

  return arr;
}

const getRating = () => {
  return Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
}

const getDate = () => {
  let start = new Date (2011, 1, 1);
  let end = new Date ();

  var randoDate = DateGen.getRandomDateInRange(start, end);
  return randoDate.toISOString().slice(0, 19).replace('T', ' ');
};

const getReview = () => {
    let returnObj = {};
    returnObj.accuracy = getRating();
    returnObj.communication = getRating();
    returnObj.cleanliness = getRating();
    returnObj.location = getRating();
    returnObj.check_in = getRating();
    returnObj._value = getRating();
    returnObj.date = getDate();
    returnObj._content = getContent();

    return returnObj;
}

const getUsers = () => {
    let numOfRev = Math.floor(Math.random() * (135 - 1) + 1);
    let total_user_ids = [];
    let user_ids =[];
    for (let i = 1; i <= 135; i++) {
        total_user_ids.push(i);
    }

    for (let i = 0; i < numOfRev; i++) {
        let randIndex = total_user_ids.splice(Math.floor(Math.random() * total_user_ids.length), 1).pop();
        user_ids.push(randIndex);
    }

    return user_ids;
}

const insertReviews = () => {
  let qs;
  for (let i = 1; i <= 100; i++) {
    let listing_id = i;
    let users = getUsers();
    users.forEach(function(user) {
      let review = getReview();
      review.listing_id = listing_id;
      review.user_id = user;

      qs = `INSERT INTO reviews (listing_id, user_id, accuracy, communication, cleanliness, location, check_in, \
            _value, _date, content) \
            VALUES ("${review.listing_id}", "${review.user_id}", "${review.accuracy}", "${review.communication}", \
             "${review.cleanliness}", "${review.location}", "${review.check_in}", "${review._value}", "${review.date}", "${review._content}")`;
      db.query(qs, function(err) {
          if(err) {
              console.log(err);
              return;
          }
      });
    });
  }


};

const insertListings = () => {
    const listings = [];
    let qs;
    for (let i = 0; i < 100; i++) {
        let listing = loremIpsum({units: 'sentences'});
        listings.push(listing);
    }


    for (let i = 0; i < listings.length; i++) {
      qs = `INSERT INTO listings (name) VALUES ("${listings[i]}")`;
        db.query(qs, function(err) {
            if (err) {
                console.log(err);
                return;
            }
        })
    }
};


insertUsers();
console.log('finished users');
insertListings();
console.log('listings');
insertReviews();
console.log('finished review');
db.end();
