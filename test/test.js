const SepaXML = require('../lib/sepaXML');
var x = new SepaXML('pain.001.001.03');



x.initName = 'initiators name';
x.initIBAN = 'DE00123456781234567890';
x.initBIC = 'MARKDEFFXXX';

// x.newTx("Halli", "DE11684522901000102622", 111.11, 'tsa 1 an halli', 'e2eid 1');
x.newTx("Tom", "DE00123456781234567890", 222.22, 'tsa 2 an tom', '');
x.newTx("Tami und Halli", "DE00123456781234567890", 333.33, 'tsa 3 an tami und halli', 'e2eid 3');


const fs = require('fs');
const path = require('path');

fs.writeFile(
  path.join(__dirname, 'test.xml'),
  x.getMsgAsXmlString(),
  err => {
    if (err) throw err;
    console.log('written text.xml to testfolder');
  }
);



// console.log(x.getMsgAsJson());

