const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let prompt = function() {
    let messageToInput =    "\nType your text here:\n" +
                            "Press [Enter] for SAVE | Ctrl + C or type 'exit' for stop writing\n" +
                            "==============================================\n\n";
    let messageAfterSave =  "\n==============================================\n" +
                            "-- Your was saved! Write more or finish work. --";

    readline.question(messageToInput, text => {
        console.log(messageAfterSave);
        if (text === 'exit') return readline.close();
        fs.appendFile('./02-write-file/text.txt', text, (err) => { if (err) throw err; } );
        prompt();
    });
}

prompt();
