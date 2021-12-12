
const sepaBASE = require('./sepaBASE.js');

class sepaSDD extends sepaBASE {
    constructor(name, iban, bic, id, localinstrument, sequencetype) {
        super(name, iban, bic);
        if ( sepaBASE.validateCI(id) ) {
            this._creditorid = id;
        } else {
            throw 'invalid creditor id';
        }

        this._localinstrument = localinstrument;
        this._sequencetype = sequencetype;
        this.supportedMsgTypes = ['pain.008.001.02'];
        this._messagetype = 'pain.008.001.02';
    }

  
   /**
    * set credtior id
    * 
    * @param {string} id - creditor id
    */
    set creditorid(id) {
        if ( sepaBASE.validateCI(id) ) {
            this._creditorid = id;
        } else {
            throw 'invalid creditor id';
        }
    }



   /**
    * set local instrument
    * 
    * @param {string} value - local instrument ()
    */
    set localinstrument(value) {
        // define set of valid values
        let supportedLocalInstruments = ['CORE', 'B2B'];
        
        if (value === '') {
            throw 'local instrument may not be empty';
          }
           
          if (this.supportedLocalInstruments.indexOf(value) == -1) {
            throw `unsupported local instrument: ${value}`;
          }
      
          this._localinstrument = value;
    }




   /**
    * set sequence type
    * 
    * @param {string} value - sequence type (FRST, RCUR, FNAL, OOFF)
    */
    set sequenceType(value) {
        // define set of valid values
        let supportedSequenceTypes = ['FRST', 'RCUR', 'FNAL', 'OOFF'];
        
        if (value === '') {
            throw 'sequence type may not be empty';
          }
           
          if (this.supportedSequenceTypes.indexOf(value) == -1) {
            throw `unsupported sequence type: ${value}`;
          }
      
          this._sequencetype = value;
    }



   /**
    * Add new direct debit transaction
    * @param {string} name - name of debitor
    * @param {string} iban - account of debitor
    * @param {number} amount - amount to debit
    * @param {string} purpose - 140 chars of remittance info
    * @param {string} mref - mandate id
    * @param {string} mdate - date of signature of mandate
    * @param {string} id - end 2 end id
    */ 
    newTx(name, iban, amount, purpose, mref, mdate, id = '') {
        let tx = {};
    
        if (! sepaBASE.validateName(name) ) {
            throw `invalid creditor name: ${name}`;
        } else {
            tx.name = name;
        }

        if (sepaBASE.validateIBAN(iban)) {
            tx.iban = iban;
        } else {
            throw `invalid creditor iban: ${iban}`;
        }
    

        if (! sepaBASE.validatePurpose(purpose) ) {
            throw `invalid purpose: ${purpose}`;
        } else {
            tx.purpose = purpose;
        }

        if (sepaBASE.validateAmount(amount)) {
            tx.amount = amount;
        } else {
            throw `invalid amount: ${amount}`;
        }
    
        // if e2e id is empty, use time/date; else validate given id
        if (id === '') {
            let d = new Date();
            tx.id = d.toISOString();
        } else {
            if (sepaBASE.validateE2EId(id)) {
                tx.id = id;
            } else {
                throw `invalid end2end id: ${id}`;
            }
        }

        // check mandate date
        try {
            let d = new Date(mdate);
            tx.mdate = d.toISOString().split('T')[0]; 
        } catch (err) {
            throw `invalid mandate date: ${mdate}`;
        }

        // check mandate reference
        if (mref === '' || mref.length > 35 ||  ! mref.match(/^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789/?:().,'+-]+$/)) {
            throw `invalid mandate reference: ${mref}`;
        } else {
            tx.mref = mref;
        }

        this._tx.push(tx);
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
        pmttpinf.ele('LclInstrm').ele('Cd', this._localinstrument);
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

        const msgString = xml.end({ 
            pretty: true,
            indent: '  ',
            newline: '\n',
            width: 0,
            spacebeforeslash: ''
            });
           
        return msgString;
    }


}

module.exports = sepaSDD;