const sepaSCT = require('../lib/sepaSCT');
const crypto = require('crypto');



const x = new sepaSCT('John Doe - Debitor', 'DE12500105170648489890', 'INGDDEFF');

x.messageId = 'my msg id';
x.executiondate = '2021-12-15';
x.createdDateTime = '2021-12-05T09:04:35.586Z';

x.newTx("Creditor 1", "AT483200000012345864", 1.11, 'purpose 1', 'id 1');
x.newTx("Creditor 2", "CH5604835012345678009", 2.22, 'purpose 2', 'id 2');

const msg = x.getMsgAsXmlString();
//console.log(msg)

console.log(crypto.createHash('md5').update(msg).digest('hex'));

const fs = require('fs');
const path = require('path');


 try {
   xmlstring = msg;
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
