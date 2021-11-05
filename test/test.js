const SepaXML = require('../lib/sepaXML');
var x = new SepaXML('pain.001.001.03');

console.log('hello world');
console.log(x);


x.initName = 'DRK';
x.initIBAN = 'DE11684522900014887830';
x.initBIC = 'SKHRDE6WXXX';

// x.newTx("Halli", "DE11684522901000102622", 111.11, 'tsa 1 an halli', 'e2eid 1');
x.newTx("Tom", "DE05684522901002909180", 222.22, 'tsa 2 an tom', 'e2eid 2');
x.newTx("Tami und Halli", "DE52684522901002211777", 333.33, 'tsa 3 an tami und halli', 'e2eid 3');


const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

let builder = new xml2js.Builder();
let xml = builder.buildObject(x.getMsgAsJson());

fs.writeFile(
  path.join(__dirname, 'test.xml'),
  xml,
  err => {
    if (err) throw err;
    console.log('File written to...');
  }
);



// console.log(x.getMsgAsJson());

console.log(xml);