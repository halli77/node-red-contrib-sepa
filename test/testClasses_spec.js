const sepaBASE = require('../lib/sepaBASE');
const sepaSCT = require('../lib/sepaSCT');
const sepaSDD = require('../lib/sepaSDD');
const assert = require('assert').strict;


/* describe([String with Test Group Name], function() {
    it([String with Test Name], function() {
        [Test Code]
    });
}); */



// sepaBASE class test

describe('sepaBASE ...', function() {

    it('should validate IBAN', function() {
        assert.strictEqual(sepaBASE.validateIBAN('DE12500105170648489890'), true);
        assert.strictEqual(sepaBASE.validateIBAN('AT483200000012345864'), true);
        assert.strictEqual(sepaBASE.validateIBAN('CH5604835012345678009'), true);
        assert.strictEqual(sepaBASE.validateIBAN('CH5604835045678009'), false);
        assert.strictEqual(sepaBASE.validateIBAN('DE00500105170648489890'), false);
    });

    it('should validate BIC', function() {
        assert.strictEqual(sepaBASE.validateBIC('MARKDEFF'), true); 
        assert.strictEqual(sepaBASE.validateBIC('MARKDEFFXXX'), true); 
        assert.strictEqual(sepaBASE.validateBIC('markdeff'), true); 
        assert.strictEqual(sepaBASE.validateBIC('markde'), false); 
        assert.strictEqual(sepaBASE.validateBIC('markdeffxxxY'), false); 
    });

    it('should calculate modulo97', function() {
        assert.strictEqual(sepaBASE.modulo97('210501700012345678DE00'), 68); 
        assert.notStrictEqual(sepaBASE.modulo97('210501700012345678DE01'), 68); 
    });

    it('should validate CI', function() {
        assert.strictEqual(sepaBASE.validateCI('DE98ZZZ09999999999'), true); 
        assert.strictEqual(sepaBASE.validateCI('DE98'), false); 
        assert.strictEqual(sepaBASE.validateCI(''), false); 
        assert.strictEqual(sepaBASE.validateCI('DE98ZZZ099999999999999999999'), false); 
        assert.strictEqual(sepaBASE.validateCI('DE98ZZZ09999999998'), false); 
        assert.strictEqual(sepaBASE.validateCI('DE__ZZZ09999999999'), false); 
    });

    it('should validate amount', function() {
        assert.strictEqual(sepaBASE.validateAmount(0), false);
        assert.strictEqual(sepaBASE.validateAmount(-1), false);
        assert.strictEqual(sepaBASE.validateAmount(-0.001), false);
        assert.strictEqual(sepaBASE.validateAmount(0.001), false);
        assert.strictEqual(sepaBASE.validateAmount(0.01), true);
        assert.strictEqual(sepaBASE.validateAmount(0.1), true);
        assert.strictEqual(sepaBASE.validateAmount(0.10), true);
        assert.strictEqual(sepaBASE.validateAmount(1), true);
        assert.strictEqual(sepaBASE.validateAmount(10.), true);
        assert.strictEqual(sepaBASE.validateAmount(10.01), true);
        assert.strictEqual(sepaBASE.validateAmount(1000000), true);
    });

    it('should validate names of involved parties', function() {
        assert.strictEqual(sepaBASE.validateName('John Doe'), true); 
        assert.strictEqual(sepaBASE.validateName('John Doe a name with a max of 70 characters which is a quite long name'), true); 
        assert.strictEqual(sepaBASE.validateName('John Doe a name with a max of 71 characters which is a tooooo long name'), false); 
        assert.strictEqual(sepaBASE.validateName(''), false); 
        assert.strictEqual(sepaBASE.validateName("strange but valid: '?,-(+-)./"), true);       
    });

    it('should validate purposes (remittance info)', function() {
        assert.strictEqual(sepaBASE.validatePurpose('A perfect valid remittance info'), true); 
        assert.strictEqual(sepaBASE.validatePurpose('A perfect valid remittance info with a maximum of 140 chars xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), true); 
        assert.strictEqual(sepaBASE.validatePurpose('A to long remittance info with 141 chars xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxy'), false); 
        assert.strictEqual(sepaBASE.validatePurpose("strange but valid: '?,-(+-)./"), true); 
        assert.strictEqual(sepaBASE.validatePurpose("invalid: §$%&=#;"), false); 
    });   
});




// sepaSCT class test

describe('sepaSCT ...', function() {

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


// sepaSDD class test

describe('sepaSDD ...', function() {

    


    it('should create xml-file with given hash value', function() {
        const crypto = require('crypto');
        const x = new sepaSDD('John Doe - Creditor', 'DE12500105170648489890', 'INGDDEFF', 'DE98ZZZ09999999999', 'CORE', 'RCUR');
        x.messageId = 'my msg id';
        x.execDate = '2021-12-15';
        x.createdDateTime = '2021-12-05T09:04:35.586Z';
        x.newTx("Debitor 1", "AT483200000012345864", 1.11, 'purpose 1', 'mandate 1', '2021-01-01', 'e2eid 1');
        x.newTx("Debitor 2", "CH5604835012345678009", 2.22, 'purpose 2', 'mandate 2', '2021-02-02', 'e2eid 2');
        const msghash = crypto.createHash('md5').update(x.getMsgAsXmlString()).digest('hex');
        const expectedhash = "AD796269EAA616CCB1E4804A3C0339BA".toLocaleLowerCase();
        //console.log(x.getMsgAsXmlString())
        assert.strictEqual(msghash, expectedhash);
      
    });
    
});