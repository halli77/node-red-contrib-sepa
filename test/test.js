const SepaXML = require('../lib/sepaXML');
var x = new SepaXML('pain.001.001.03');



x.initName = 'initName: Halli';
x.initIBAN = 'DE00123456781234567890';
x.initBIC = 'MARKDEFF';
x.batchBooking = false;
// x.msgId = 'testfile';


x.newTx("Creditor 1", "DE00123456781234567890", 1.11, 'purpose 1', 'id 1');
x.newTx("Creditor 2", "DE00123456781234567890", 2.22, 'purpose 2', 'id 2');


const fs = require('fs');
const path = require('path');

let xmlstring = '';

try {
  xmlstring = x.getMsgAsXmlString();
  fs.writeFile(
    path.join(__dirname, 'test.xml'),
    xmlstring,
    err => {
      if (err) throw err;
      console.log('written text.xml to testfolder');
    }
  )
} catch (err) {
  console.log(err);
}





// console.log(x.getMsgAsJson());

