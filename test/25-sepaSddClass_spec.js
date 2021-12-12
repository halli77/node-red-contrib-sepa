const sepaSDD = require('../lib/sepaSDD');
const assert = require('assert').strict;


describe('sepaSDD class ...', function() {


    it('should create xml-file with given hash value', function() {
        const x = new sepaSDD('John Doe - Creditor', 'DE12500105170648489890', 'INGDDEFF', 'DE98ZZZ09999999999', 'CORE', 'RCUR');
        x.messageId = 'my msg id';
        x.execDate = '2021-12-15';
        x.createdDateTime = '2021-12-05T09:04:35.586Z';
        x.newTx("Debitor 1", "AT483200000012345864", 1.11, 'purpose 1', 'mandate 1', '2021-01-01', 'e2eid 1');
        x.newTx("Debitor 2", "CH5604835012345678009", 2.22, 'purpose 2', 'mandate 2', '2021-02-02', 'e2eid 2');
        const expectedhash = "AD796269EAA616CCB1E4804A3C0339BA".toLowerCase();
        //console.log(x.getMsgAsXmlString())
        assert.strictEqual(x.getMsgHash, expectedhash);
      
    });
    
});