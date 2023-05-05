const fs = require('fs');

function copyDir(path, dest) {
    fs.rm(dest, { recursive: true}, (err) => {
        fs.cp(path, dest, {recursive: true}, (err) => {});
    }); 
}

copyDir('./04-copy-directory/files', './04-copy-directory/files-copy');