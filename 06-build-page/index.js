const fs = require('fs');

// 1 - Copy all assets files
fs.rm('./06-build-page/project-dist', { recursive: true}, (err) => {
    fs.cp('./06-build-page/assets', './06-build-page/project-dist/assets', {recursive: true}, (err) => {});
}); 

// 2 - Merge all styles
fs.readdir('./06-build-page/styles', (err, files) => {
    files.forEach(file => { 
        let [name, ext] = file.split('.');

        if (ext === 'css') {
            fs.readFile(`./06-build-page/styles/${file}`, 'utf-8', (err, text) => {
                fs.appendFile('./06-build-page/project-dist/style.css', text + '\n', (err) => {} );
            });
        }
    });
});

// 3 - Create full html filr from components
fs.readFile(`./06-build-page/template.html`, 'utf-8', (err, text) => {
    let html = text,
        components = text.match(/{{\w+}}/g);

    components.forEach((block, index) => {
        let file = block.match(/\w+/g)[0];

        fs.readFile(`./06-build-page/components/${file}.html`, 'utf-8', (err, text) => {
            html = html.replace(block, text);

            if (index === components.length - 1) {
                fs.unlink('./06-build-page/project-dist/index.html', (err) => {});
                fs.appendFile('./06-build-page/project-dist/index.html', html + '\n', (err) => {} );
            }
        });
    });
});
