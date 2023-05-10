const fs = require('fs'),
      path = require('path');

let secretPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretPath, {withFileTypes: true}, (err, files) => {
    files.forEach(file => { 
        fs.stat(`${secretPath}/${file.name}`, (err, stats) => {
            if (file.isFile()) {
                let [name, ext] = file.name.split('.');
                console.log(`${name} - ${ext} - ${(stats.size / 1024).toFixed(2)}kb`);
            } 
        });
    });
});
