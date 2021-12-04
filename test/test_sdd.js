const sepaSDD = require('../lib/sepaSDD');


try {

  var x = new sepaSDD('initName', 'DE12500105170648489890', 'INGDDEFF', 'DE98ZZZ09999999999', 'CORE', 'RCUR');
  x.newTx("Creditor 1", "AT483200000012345864", 1.11, 'purpose 1', 'mref1', '2021-01-01', 'id 1', );
  x.newTx("Creditor 2", "CH5604835012345678009", 2.22, 'purpose 2', 'mref2', '2021-02-02', 'id 2');

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

