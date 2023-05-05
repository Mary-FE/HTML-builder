const fs = require('fs');

fs.readdir('./03-files-in-folder/secret-folder', (err, files) => {
    files.forEach(file => { 
        fs.stat(`./03-files-in-folder/secret-folder/${file}`, (err, stats) => {
            let [name, ext] = file.split('.');

            if (stats.size) console.log(`${name} - ${ext} - ${(stats.size / 1024).toFixed(2)}kb`);
        });
    });
});
