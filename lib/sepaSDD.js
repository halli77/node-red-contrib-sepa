
const sepaBASE = require('./sepaBASE.js');

class sepaSDD extends sepaBASE {
    constructor(name, iban, bic, id, localinstrument, sequencetype) {
        super(name, iban, bic);
        if ( sepaBASE.validateCI(id) ) {
            this._creditorid = id;
        } else {
            throw 'invalid creditor id';
        }

        this._lclinstrm = localinstrument;
        this._sequencetype = sequencetype;
        this.supportedMsgTypes = ['pain.008.001.02'];
        this._messagetype = 'pain.008.001.02';
    }

  
   /**
    * set credtior id
    * 
    * @param {string} - creditor id
    */
    set creditorid(id) {
        if ( sepaBASE.validateCI(id) ) {
            this._creditorid = id;
        } else {
            throw 'invalid creditor id';
        }
    }


    
    newTx(name, iban, amount, purpose, mref, mdate, id = '') {
        
        let tx = {};
        
        if (! name.match(/^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789/?:().,'+-]+$/) | name.length > 70  ) {
            throw 'invalid creditor name: ' + name;
        } else {
            tx.name = name;
        }
        

        if (sepaBASE.validateIBAN(iban)) {
            tx.iban = iban;
        } else {
           throw 'invalid creditor iban: ' + iban;
        }
        
        if (! purpose.match(/^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789/?:().,'+-]+$/) | name.length > 140  ) {
            throw 'invalid purpose: ' + purpose;
        } else {
            tx.purpose = purpose;
        }

        if (sepaBASE.validateAmount(amount)) {
            tx.amount = amount;
        } else {
           throw 'invalid amount: ' + amount;
        }

        if (id == '') {
            let d = new Date();
            tx.id = d.toISOString();
        } else {
            tx.id = id;
        }
        this._tx.push(tx);

        tx.mref = mref;
        tx.mdate = mdate;
    }



    getMsgAsXmlString() {
        const xmlbuilder = require('xmlbuilder');
        const document = {
        'Document': {
            '@xmlns': 'urn:iso:std:iso:20022:tech:xsd:pain.008.001.02',
            '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            '@xsi:schemaLocation': 'urn:iso:std:iso:20022:tech:xsd:pain.008.001.02 pain.008.001.02.xsd'
        }
        }
        var xml = xmlbuilder.create(document, {version: '1.0', encoding: 'UTF-8', standalone: true});

        var dd = xml.ele('CstmrDrctDbtInitn');
        
        // Group Header    
        var grphdr = dd.ele('GrpHdr');
        grphdr.ele('MsgId', this._msgId);
        let d = new Date();
        grphdr.ele('CreDtTm', this._createdDateTime);
        grphdr.ele('NbOfTxs', this.getNumberOfTx);
        grphdr.ele('CtrlSum', this.getTotalSumOfTx);
        grphdr.ele('InitgPty').ele('Nm', this._initName);

        // PmtInf
        var pmtinf = dd.ele('PmtInf');
        pmtinf.ele('PmtInfId', this._msgId);
        pmtinf.ele('PmtMtd', 'DD');
        // pmtinf.ele('BtchBookg', this._batchBooking.toString());
        pmtinf.ele('NbOfTxs', this.getNumberOfTx);
        pmtinf.ele('CtrlSum', this.getTotalSumOfTx);
        var pmttpinf = pmtinf.ele('PmtTpInf');
        pmttpinf.ele('SvcLvl').ele('Cd', 'SEPA');
        pmttpinf.ele('LclInstrm').ele('Cd', this._lclinstrm);
        pmttpinf.ele('SeqTp', this._sequencetype);

        pmtinf.ele('ReqdColltnDt', this._execDate);
        pmtinf.ele('Cdtr').ele('Nm', this._initName);
        pmtinf.ele('CdtrAcct').ele('Id').ele('IBAN', this._initIBAN);
        pmtinf.ele('CdtrAgt').ele('FinInstnId').ele('BIC', this._initBIC);
        pmtinf.ele('ChrgBr', 'SLEV');
        var tmp = pmtinf.ele('CdtrSchmeId').ele('Id').ele('PrvtId').ele('Othr');
        tmp.ele('Id', this._creditorid);
        tmp.ele('SchmeNm').ele('Prtry', 'SEPA');
    
    
        this._tx.forEach((tx) => {
        let txs = pmtinf.ele('DrctDbtTxInf');
        txs.ele('PmtId').ele('EndToEndId', tx.id);
        txs.ele('InstdAmt', {'Ccy': 'EUR'}, tx.amount);

        let mdte = txs.ele('DrctDbtTx').ele('MndtRltdInf');
        mdte.ele('MndtId', tx.mref);
        mdte.ele('DtOfSgntr', tx.mdate);
        //mdte.ele('AmdmntInd', 'false'); // no changes of mandate
        
        txs.ele('DbtrAgt').ele('FinInstnId').ele('BIC', 'NOTPROVIDED');
        txs.ele('Dbtr').ele('Nm', tx.name);
        txs.ele('DbtrAcct').ele('Id').ele('IBAN', tx.iban);
        txs.ele('RmtInf').ele('Ustrd', tx.purpose);
    
        });

        return xml.end({ 
            pretty: true,
            indent: '  ',
            newline: '\n',
            width: 0,
            spacebeforeslash: ''
        });
    }


}

module.exports = sepaSDD;