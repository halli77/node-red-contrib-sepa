
class sepaXML {
  constructor(messagetype) {
    this.messagetype = messagetype
    if (messagetype === 'pain.001.001.03') {
      this.messagetype = messagetype;
    } else {
      throw 'messagetype is not supported';
    }

    this.tx = [];
    this.batchBooking = true;
    this.initName = '';
    this.initIBAN = '';
    this.initBIC = '';
    this.msgId = '';
    this.execDate = '';
  }


  newTx(name, iban, amount, purpose, id = '') {
    let tx = {};
    tx.name = name;
    tx.iban = iban;
    tx.amount = amount;
    tx.purpose = purpose;
    if (id == '') {
      let d = new Date();
      tx.id = d.toISOString();
    } else {
      tx.id = id;
    }
    this.tx.push(tx);
  }


  checkValue(name, value, minLength, maxLength) {
    if (value.length < minLength) {
      throw 'value for ' + name + ' is to short: ' + value;
    }

    if (value.length > maxLength) {
      throw 'value for ' + name + ' is to long: ' + value;
    }  

    return value;

  }

  getTxSum() {
    let u = 0;
    if (this.tx.length == 0) return 0;
    this.tx.forEach(tx => {
      u += tx.amount;
    });
    return u;
  }

  getTxCt() {
    return this.tx.length;
  }


  getMsgAsXmlString() {


    if (this.msgId === '') {
      let d = new Date();
      this.msgId = d.toISOString();
    }
      
    if (this.execDate === '') {
      let d = new Date();
      this.execDate = d.toISOString().split('T')[0]; 
    } else {
      try {
        let d = new Date(this.execDate);
      } catch (err) {
        throw 'invalid execDate: ' + this.execDate;
      }
    }

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
    grphdr.ele('MsgId', this.msgId);
    let d = new Date();
    grphdr.ele('CreDtTm', d.toISOString());
    grphdr.ele('NbOfTxs', this.getTxCt());
    grphdr.ele('CtrlSum', this.getTxSum());
    grphdr.ele('InitgPty').ele('Nm', this.initName);

    // PmtInf

    var pmtinf = sct.ele('PmtInf');
    pmtinf.ele('PmtInfId', this.msgId);
    pmtinf.ele('PmtMtd', 'TRF');
    pmtinf.ele('BtchBookg', this.batchBooking.toString());
    pmtinf.ele('NbOfTxs', this.getTxCt());
    pmtinf.ele('CtrlSum', this.getTxSum());
    pmtinf.ele('ReqdExctnDt', this.execDate);
    pmtinf.ele('Dbtr').ele('Nm', this.initName);
    pmtinf.ele('DbtrAcct').ele('Id').ele('IBAN', this.initIBAN);
    pmtinf.ele('DbtrAgt').ele('FinInstnId').ele('BIC', this.initBIC);
    pmtinf.ele('ChrgBr', 'SLEV');
    
    

    this.tx.forEach((tx) => {
      if (tx.id === '') {
        let d = new Date();
        tx.id = d.toISOString();
      }

      let txs = pmtinf.ele('CdtTrfTxInf');
      txs.ele('PmtId').ele('EndToEndId', tx.id);
      txs.ele('Amt').ele('InstdAmt', {'Ccy': 'EUR'}, tx.amount);
      txs.ele('Cdtr').ele('Nm', this.checkValue('name', tx.name, 2, 70));
      txs.ele('CdtrAcct').ele('Id').ele('IBAN', this.checkValue('iban',tx.iban, 2, 70));
      txs.ele('RmtInf').ele('Ustrd', this.checkValue('purpose', tx.purpose, 1, 140));
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

module.exports = sepaXML;