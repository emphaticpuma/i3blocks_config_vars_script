const fs = require('fs');

const infile = process.argv[2];
var outfile = '~/.i3blocks.conf';
if (process.argv[3]) {
    outfile = process.argv[3];
}
console.log(infile,outfile);
