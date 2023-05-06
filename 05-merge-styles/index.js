const fs = require('fs');

fs.readdir('./05-merge-styles/styles', (err, files) => {
    fs.unlink('./05-merge-styles/project-dist/bundle.css', (err) => {});  

    files.forEach(file => { 
        let [name, ext] = file.split('.');

        if (ext === 'css') {
            fs.readFile(`./05-merge-styles/styles/${file}`, 'utf-8', (err, text) => {
                fs.appendFile('./05-merge-styles/project-dist/bundle.css', text + '\n', (err) => {} );
            });
        }
    });
});

