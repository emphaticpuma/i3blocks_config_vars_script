const fs = require('fs');
const rl = require('readline');

const infile = process.argv[2];
var outfile = '~/.i3blocks.conf';
if (process.argv[3]) {
    outfile = process.argv[3];
}
console.log(infile,'=>',outfile);

var linereader = rl.createInterface({
    input: fs.createReadStream(infile),
    terminal: false
});
var rs = fs.createWriteStream(outfile);

var vars = {};
var var_names = [];

function addvar (line) {
    var def = line.substring(0,7);
    if (def === '#define') {
        // makes an array, then takes out empty string elements
        var arr = line.split(' ').filter((val) => {
            if (val !== '')
                return val;
        });
        arr.shift(); // removes #define part
        vars[arr[0]] = arr[1];
        var_names.push(arr[0]);
        return '';
    }
    else {
        line = replacevar(line);
        return line;
    }
}
function replacevar (line) {
    var matches = [];
    var rightmatch;
    var matchloc = 0;
    for (i=0;i<var_names.length;i++) {
        var loc = line.indexOf(var_names[i]);
        if (loc > -1) {
            // console.log(line,loc);
            matches.push(var_names[i]);
            matchloc = loc;
        }
    }
    // if one variable contains the other ex. BLACK, BLACK_ALT
    // we need to pick the longest of the matches
    if (matches.length !== 0) {
        var maxlength = 0;
        var maxindex = 0;
        matches.forEach((val,index) => {
            // console.log(val);
            if (val.length > maxlength)
                maxindex = index;
        });
        rightmatch = matches[maxindex];
        if (rightmatch) {
            // console.log(">",rightmatch,">>",matchloc);
            var final = line.replace(rightmatch,vars[rightmatch]);
            // console.log(final);
            return final;
        }
    }
    else {
        // console.log(line);
        return line;
    }
}

linereader.on('line', (line) => {
    // console.log(addvar(line));
    rs.write(addvar(line)+'\n');
});
linereader.on('close', ()=>{
    console.log(vars);
    console.log('\n');
    console.log(var_names);
    console.log("finished");
    rs.end();
});
