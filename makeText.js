/** Command-line tool to generate Markov text. */
const fs = require('fs');
const { MarkovMachine } = require('./markov');
const axios = require('axios');

function init(param)
{
    if (param === "--file"){
        if(process.argv[4].slice(0, 7).toLowerCase() === 'http://'
        || process.argv[4].slice(0, 8).toLowerCase() === 'https://') readURL(process.argv[4], process.argv[3]);
        else readPath(process.argv[4], process.argv[3]);
    }
    else if (!param || param === "--help") console.log("Usage:\nnode makeText.js --file [path to write file] [path to read file]\nnode makeText.js --file [path to write file] [path to URL]\nnode makeText.js [path to read file/URL]");
    else if(param.slice(0, 7).toLowerCase() === 'http://'
    || param.slice(0, 8).toLowerCase() === 'https://') readURL(param);
    else readPath(param);
}

function getText(data){
    console.log("Processing Data...")
    const mm = new MarkovMachine(data);
    return mm.makeText(20);
}


function readPath(path, file){
    fs.readFile(path, 'utf8', function(err,data){
        if (err){
            console.log("error: ", err);
            process.exit(1);
        }
        if (file) fs.writeFile(file, getText(data), 'utf8', (err) => {
            if(err){
                console.log("There was an error: type 'node makeText.js --help' for help"); 
                process.exit(1);
            } 
        })
        else console.log(getText(data));
    })
}

async function readURL(url, file){
    try{
        let content = await axios.get(url);
        if (file) fs.writeFile(file, getText(content.data), 'utf8', (err) => {
            if(err){
                console.log("There was an error"); 
                process.exit(1);
            } 
        })
        else console.log(getText(content.data));
    }
    catch (err) {
        console.log("That page doesn't exist, or is down.");
    }
}

init(process.argv[2]);
