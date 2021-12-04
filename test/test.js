const sepaBASE = require('../lib/sepaBASE');
// const sepaSCT = require('../lib/sepaSCT');
const assert = require('assert').strict;


/* describe([String with Test Group Name], function() {
    it([String with Test Name], function() {
        [Test Code]
    });
}); */



// sepaBASE class test

describe('sepaBASE', function() {

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

});




// try {

//    var x = new sepaSCT('initName', 'DE12500105170648489890', 'INGDDEFF');
//    x.newTx("Creditor 1", "AT483200000012345864", 1.11, 'purpose 1', 'id 1');
//    x.newTx("Creditor 2", "CH5604835012345678009", 2.22, 'purpose 2', 'id 2');

// } catch (err) {
//   console.log('========>>> ' + err);
// }



// const fs = require('fs');
// const path = require('path');

// let xmlstring = '';

// try {
//   xmlstring = x.getMsgAsXmlString();
//   fs.writeFile(
//     path.join(__dirname, 'test.xml'),
//     xmlstring,
//     err => {
//       if (err) throw err;
//       console.log('written text.xml to testfolder');
//     }
//   )
// } catch (err) {
//   console.log('========>>> ' + err);
// }


