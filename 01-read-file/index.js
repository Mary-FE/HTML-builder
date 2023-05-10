const fs = require('fs'),
      path = require('path');

let file = path.join(__dirname, 'text.txt'),
    stream = new fs.createReadStream(file, { encoding: 'UTF-8'});

stream.on('data', function (val) {
    console.log(val.toString());
});
