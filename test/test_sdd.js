const SepaSDD = require('../lib/sepaSDD');


try {

  var x = new SepaSDD('initName', 'DE00123456781234567890', 'MARKDEFFXXX', 'DE66ZZZ00000704165', 'CORE', 'RCUR');
  x.newTx("Creditor 1", "DE00123456781234567890", 1.11, 'purpose 1', 'mref1', '2021-01-01', 'id 1', );
  x.newTx("Creditor 2", "DE00123456781234567890", 2.22, 'purpose 2', 'mref2', '2021-02-02', 'id 2');

} catch (err) {
  console.log('========>>> ' + err);
}



const fs = require('fs');
const path = require('path');

let xmlstring = '';

try {
  xmlstring = x.getMsgAsXmlString();
  fs.writeFile(
    path.join(__dirname, 'test_sdd.xml'),
    xmlstring,
    err => {
      if (err) throw err;
      console.log('written text_sdd.xml to testfolder');
    }
  )
} catch (err) {
  console.log('========>>> ' + err);
}





// console.log(x.getMsgAsJson());

