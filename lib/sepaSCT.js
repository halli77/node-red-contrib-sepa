
const sepaBASE = require('./sepaBASE.js');


class sepaSCT extends sepaBASE {
    constructor(name, iban, bic) {
        super(name, iban, bic);
        this.supportedMsgTypes = ['pain.001.001.03'];
        this._messagetype = 'pain.001.001.03';
    }


  /**
    * Add a new transaction
    * @param {string} name - name of creditor
    * @param {string} iban - account of creditor
    * @param {number} amount - amount to transfer
    * @param {string} purpose - 140 chars of remittance info
    * @param {string} id - end to end id
    */
    newTx(name, iban, amount, purpose, id = '') {
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
    
        if (id === '') {
            let d = new Date();
            tx.id = d.toISOString();
        } else {
            tx.id = id;
        }
        this._tx.push(tx);
    }    


  getMsgAsXmlString() {

    const xmlbuilder = require('xmlbuilder');
    const document = {
      'Document': {
        '@xmlns': 'urn:iso:std:iso:20022:tech:xsd:pain.001.001.03',
        '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@xsi:schemaLocation': 'urn:iso:std:iso:20022:tech:xsd:pain.001.001.03 pain.001.001.03.xsd'
      }
    }
    var xml = xmlbuilder.create(document, {version: '1.0', encoding: 'UTF-8', standalone: true});

    var sct = xml.ele('CstmrCdtTrfInitn');
    
    // Group Header    
    var grphdr = sct.ele('GrpHdr');
    grphdr.ele('MsgId', this._msgId);
    grphdr.ele('CreDtTm', this._createdDateTime);
    grphdr.ele('NbOfTxs', this.getNumberOfTx);
    grphdr.ele('CtrlSum', this.getTotalSumOfTx);
    grphdr.ele('InitgPty').ele('Nm', this._initName);

    // PmtInf

    var pmtinf = sct.ele('PmtInf');
    pmtinf.ele('PmtInfId', this._msgId);
    pmtinf.ele('PmtMtd', 'TRF');
    pmtinf.ele('BtchBookg', this._batchBooking.toString());
    pmtinf.ele('NbOfTxs', this.getNumberOfTx);
    pmtinf.ele('CtrlSum', this.getTotalSumOfTx);
    pmtinf.ele('ReqdExctnDt', this._execDate);
    pmtinf.ele('Dbtr').ele('Nm', this._initName);
    pmtinf.ele('DbtrAcct').ele('Id').ele('IBAN', this._initIBAN);
    pmtinf.ele('DbtrAgt').ele('FinInstnId').ele('BIC', this._initBIC);
    pmtinf.ele('ChrgBr', 'SLEV');
    
    

    this._tx.forEach((tx) => {
      let txs = pmtinf.ele('CdtTrfTxInf');
      txs.ele('PmtId').ele('EndToEndId', tx.id);
      txs.ele('Amt').ele('InstdAmt', {'Ccy': 'EUR'}, tx.amount);
      txs.ele('Cdtr').ele('Nm', tx.name);
      txs.ele('CdtrAcct').ele('Id').ele('IBAN', tx.iban);
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

module.exports = sepaSCT;