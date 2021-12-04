const sepaSCT = require('../lib/sepaSCT');



var x = new sepaSCT('initName', 'DE12500105170648489890', 'INGDDEFF');
  x.newTx("Creditor 1", "AT483200000012345864", 1.11, 'purpose 1', 'id 1');
  x.newTx("Creditor 2", "CH5604835012345678009", 2.22, 'purpose 2', 'id 2');








// console.log(x.getMsgAsJson());

