const sepaSCT = require('../lib/sepaSCT');


try {

   var x = new sepaSCT('initName', 'DE12500105170648489890', 'INGDDEFF');
   x.newTx("Creditor 1", "AT483200000012345864", 1.11, 'purpose 1', 'id 1');
   x.newTx("Creditor 2", "CH5604835012345678009", 2.22, 'purpose 2', 'id 2');

} catch (err) {
  console.log('========>>> ' + err);
}



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
  console.log('========>>> ' + err);
}





// console.log(x.getMsgAsJson());

