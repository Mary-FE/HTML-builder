const fs = require('fs'),
      path = require('path');

// 1 - Create build folder and copy assets files
function copyFolder(from, to, deep = false) {
    let dist = path.join(__dirname, to),
        folder = path.join(__dirname, from);

    // Remove folder & re-create
    fs.rm(dist, { recursive: true}, (e) => {
        fs.mkdir(dist, { recursive: true }, (e) => {

            // Read files & folders
            fs.readdir(folder, {withFileTypes: true}, (e, files) => {
                files.forEach(file => {
                    if (!file.isFile()) {
                        fs.mkdir(`${dist}\\${from}\\${file.name}`, { recursive: true }, (e) => {});
                        copyFolder(`${from}\\${file.name}`, `${to}\\${from}\\${file.name}`, true);
                    } else {
                        fs.copyFile(`${folder}\\${file.name}`, `${dist}\\${file.name}`, (e) => {});
                    }
                });
            });
        });
    });

    // Need only when build folder was created
    if (!deep) {
        mergeCSS('styles', 'project-dist/style.css');
        mergeHTML('template.html', 'components', 'project-dist/index.html');
    }
}

// 2 - Merge all styles
function mergeCSS(from, to) {
    let styles = path.join(__dirname, from),
        dist = path.join(__dirname, to);

    fs.unlink(dist, () => {}); 
    fs.readdir(styles, (e, files) => {
        files.forEach(file => { 
            let [name, ext] = file.split('.');
    
            if (ext === 'css') {
                fs.readFile(`${styles}\\${file}`, 'utf-8', (e, text) => {
                    fs.appendFile(dist, text + '\n', () => {} );
                });
            }
        });
    });
}

// 3 - Create full html filr from components
function mergeHTML(tmp, from, to) {
    let template = path.join(__dirname, tmp),
        dist = path.join(__dirname, to);

    fs.readFile(template, 'utf-8', (err, text) => {
        let html = text,
            components = text.match(/{{\w+}}/g);
    
        components.forEach((block, index) => {
            let file = block.match(/\w+/g)[0],
                pathComponent = path.join(__dirname, `${from}/${file}.html`);
    
            fs.readFile(pathComponent, 'utf-8', (e, text) => {
                html = html.replace(block, text);
    
                if (index === components.length - 1) {
                    fs.unlink(dist, () => {});
                    fs.appendFile(dist, html + '\n', () => {} );
                }
            });
        });
    });
}

copyFolder('assets', 'project-dist');