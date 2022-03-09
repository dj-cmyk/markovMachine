/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { MarkovMachine } = require('./markov')

let mm;

function fileMarkov(file) {
    fs.readFile(file, 'utf8', function(err, data) {
      if (err) {
        console.error(`Error reading ${file}: ${err}`);
        process.exit(1);
      } else {
        mm = new MarkovMachine(data)
        return mm.makeText()
      }
    });
  }

async function webMarkov(url) {
    try {
        let resp = await axios.get(url);
        mm = new MarkovMachine(resp.data)
        return mm.makeText()
      } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
      }
}



let file;
let url;

if (process.argv[2] === 'file') {
    file = process.argv[3];
    fileMarkov(file)
  } else if (process.argv[2] === 'url') {
    url = process.argv[3];
    webMarkov(url)
  } else {
      process.exit(1)
  }
