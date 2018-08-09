var fs = require('fs');

var array = [];

//console.log(stats.size('/home/ricardo/Desktop/reviews'));
const stats = fs.statSync('/home/ricardo/Desktop/reviews')
const fileSizeInBytes = stats.size
console.log(fileSizeInBytes);

async function read2 (file) {
  return new Promise(resolve => {
    let header;
    const label = `read2-${file}`;
    console.time(label);
    const stream = fs.createReadStream(file, {encoding: 'utf8'});
    stream.on('data', data => {
      header = data.split(/\n/)[0];
      // array.push(header);
      console.log(header);
      stream.destroy();
    });
    stream.on('close', () => {
      console.timeEnd(label);
      resolve();
    });
  });
}

read2('/home/ricardo/Desktop/reviews');

console.log(array);
