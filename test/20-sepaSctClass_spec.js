const sepaSCT = require('../lib/sepaSCT');
const assert = require('assert').strict;




describe('sepaSCT class ...', function() {

    it('should create xml-file with given hash value', function() {
        const crypto = require('crypto');
        const x = new sepaSCT('John Doe - Debitor', 'DE12500105170648489890', 'INGDDEFF');
        x.messageId = 'my msg id';
        x.execDate = '2021-12-15';
        x.createdDateTime = '2021-12-05T09:04:35.586Z';
        x.newTx("Creditor 1", "AT483200000012345864", 1.11, 'purpose 1', 'id 1');
        x.newTx("Creditor 2", "CH5604835012345678009", 2.22, 'purpose 2', 'id 2');
        const msghash = crypto.createHash('md5').update(x.getMsgAsXmlString()).digest('hex');
        const expectedhash = "955C7FF478664E68FBECEAB99387E3C9".toLocaleLowerCase();
        //console.log(x.getMsgAsXmlString())
        assert.strictEqual(msghash, expectedhash);
      
    });
    
});

