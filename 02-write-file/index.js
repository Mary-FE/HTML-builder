const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'text.txt');
const streem = fs.createWriteStream(file, { flags: 'a' });
const { stdout } = require('process');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let messageToInput =    "\nType your text here:\n" +
                        "Press [Enter] for SAVE | Ctrl + C or type 'exit' for stop writing\n" +
                        "==============================================\n";

let messageAfterSave =  "\n==============================================\n" +
                        "-- Printing is stopped. The file has been update successfully! --\n";

// Create file if not exist
fs.access(file, (e) => {
    if (e) {
        streem.end();
        console.log(`File text.txt was created\n`);
    }
});

// Start typing
console.log(messageToInput);

readline.on('line', (text) => {
    text === 'exit' 
        ? process.exit(0)
        : fs.appendFile(file, `${text}\n`, () => {});
});

process.on('exit', () => stdout.write(messageAfterSave));
process.on('SIGINT', () => stdout.write(messageAfterSave));
