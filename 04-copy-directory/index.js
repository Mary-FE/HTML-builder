const fs = require('fs'),
      path = require('path');

function copyDir(folder, copy) {
    let from = path.join(__dirname, folder),
        to = path.join(__dirname, copy);

    fs.rm(to, { recursive: true}, (e) => {
        fs.mkdir(to, { recursive: true }, (e) => {
            fs.readdir(from, (e, files) => {
                files.forEach(file => { 
                    fs.copyFile(`${from}/${file}`, `${to}/${file}`, (e) => {});
                });
            });
        });
    }); 
}

copyDir('files', 'files-copy');