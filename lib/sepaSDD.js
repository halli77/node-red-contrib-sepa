
class sepaSDD {
  constructor(name, iban, bic, id, localinstrument, sequencetype) {
    let d = new Date();
    this.initName = name;
    this.initIBAN = iban;
    this.initBIC = bic;
    this.creditorid = id;
    this.lclinstrm = localinstrument;
    this.sequencetype = sequencetype;
    this._tx = [];
    this._batchBooking = true;
    this._msgId = d.toISOString();
    this._execDate = d.toISOString().split('T')[0]; 
    this._messagetype = 'pain.001.001.03';
  }


  set messagetype(v) {
    if (v == '') {
      throw 'messagetype may not be empty';
    }

    let mt = ['pain.001.001.03'];
    
    if (mt.indexOf(v) == -1) {
      throw 'unsupported messagetype: ' + v;
    }

    this._messagetype = v;
  }

  set initName(v) {
    if (v == '') {
      throw 'initName may not be emtpy';
    }

    if (v.length > 70) {
      throw 'initName exceeds max length of 70 chars';
    }

    if ( ! v.match(/^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789/?:().,'+-]+$/) ) {
      throw 'initName contains invalid chars: ' + v;
    }

    this._initName = v;
  }

  set initIBAN(v) {
    if ( v == '' ) {
      throw 'initIBAN may not be emtpy';
    }
    v = v.toUpperCase();

    if (! v.match(/^AL\d{2}\d{8}[a-zA-Z\d]{16}$|^AD\d{2}\d{8}[a-zA-Z\d]{12}$|^AT\d{2}\d{16}$|^AZ\d{2}[a-zA-Z\d]{4}\d{20}$|^BH\d{2}[A-Z]{4}[a-zA-Z\d]{14}$|^BE\d{2}\d{12}$|^BA\d{2}\d{16}$|^BR\d{2}\d{23}[A-Z]{1}[a-zA-Z\d]{1}$|^BG\d{2}[A-Z]{4}\d{6}[a-zA-Z\d]{8}$|^CR\d{2}\d{17}$|^HR\d{2}\d{17}$|^CY\d{2}\d{8}[a-zA-Z\d]{16}$|^CZ\d{2}\d{20}$|^DK\d{2}\d{14}$|^DO\d{2}[A-Z]{4}\d{20}$|^TL\d{2}\d{19}$|^EE\d{2}\d{16}$|^FO\d{2}\d{14}$|^FI\d{2}\d{14}$|^FR\d{2}\d{10}[a-zA-Z\d]{11}\d{2}$|^GE\d{2}[a-zA-Z\d]{2}\d{16}$|^DE\d{2}\d{18}$|^GI\d{2}[A-Z]{4}[a-zA-Z\d]{15}$|^GR\d{2}\d{7}[a-zA-Z\d]{16}$|^GL\d{2}\d{14}$|^GT\d{2}[a-zA-Z\d]{4}[a-zA-Z\d]{20}$|^HU\d{2}\d{24}$|^IS\d{2}\d{22}$|^IE\d{2}[a-zA-Z\d]{4}\d{14}$|^IL\d{2}\d{19}$|^IT\d{2}[A-Z]{1}\d{10}[a-zA-Z\d]{12}$|^JO\d{2}[A-Z]{4}\d{22}$|^KZ\d{2}\d{3}[a-zA-Z\d]{13}$|^XK\d{2}\d{4}\d{10}\d{2}$|^KW\d{2}[A-Z]{4}[a-zA-Z\d]{22}$|^LV\d{2}[A-Z]{4}[a-zA-Z\d]{13}$|^LB\d{2}\d{4}[a-zA-Z\d]{20}$|^LI\d{2}\d{5}[a-zA-Z\d]{12}$|^LT\d{2}\d{16}$|^LU\d{2}\d{3}[a-zA-Z\d]{13}$|^MK\d{2}\d{3}[a-zA-Z\d]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[a-zA-Z\d]{18}$|^MR\d{2}\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{2}\d{10}[a-zA-Z\d]{11}\d{2}$|^MD\d{2}[a-zA-Z\d]{2}[a-zA-Z\d]{18}$|^ME\d{2}\d{18}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{2}\d{11}$|^PK\d{2}[a-zA-Z\d]{4}\d{16}$|^PS\d{2}[a-zA-Z\d]{4}\d{21}$|^PL\d{2}\d{24}$|^PT\d{2}\d{21}$|^QA\d{2}[A-Z]{4}[a-zA-Z\d]{21}$|^RO\d{2}[A-Z]{4}[a-zA-Z\d]{16}$|^SM\d{2}[A-Z]{1}\d{10}[a-zA-Z\d]{12}$|^SA\d{2}\d{2}[a-zA-Z\d]{18}$|^RS\d{2}\d{18}$|^SK\d{2}\d{20}$|^SI\d{2}\d{15}$|^ES\d{2}\d{20}$|^SE\d{2}\d{20}$|^CH\d{2}\d{5}[a-zA-Z\d]{12}$|^TN\d{2}\d{20}$|^TR\d{2}\d{5}[a-zA-Z\d]{17}$|^AE\d{2}\d{3}\d{16}$|^GB\d{2}[A-Z]{4}\d{14}$|^VG\d{2}[a-zA-Z\d]{4}\d{16}$|^AO[\d]{2}[A-Za-z\d]{21}$|^BF[\d]{2}[A-Za-z\d]{23}$|^BI[\d]{2}[A-Za-z\d]{12}$|^BJ[\d]{2}[A-Za-z\d]{24}$|^CF[\d]{2}[A-Za-z\d]{23}$|^CG[\d]{2}[A-Za-z\d]{23}$|^CI[\d]{2}[A-Za-z\d]{24}$|^CM[\d]{2}[A-Za-z\d]{23}$|^CV[\d]{2}[A-Za-z\d]{21}$|^DZ[\d]{2}[A-Za-z\d]{20}$|^EG[\d]{2}[A-Za-z\d]{23}$|^GA[\d]{2}[A-Za-z\d]{23}$|^IR[\d]{2}[A-Za-z\d]{22}$|^MG[\d]{2}[A-Za-z\d]{23}$|^ML[\d]{2}[A-Za-z\d]{24}$|^MZ[\d]{2}[A-Za-z\d]{21}$|^SN[\d]{2}[A-Za-z\d]{24}$|^ST[\d]{2}[A-Za-z\d]{21}$/ ) ) {
      throw 'initIBAN not valid: ' + v;
    }

    if ( v.substr(0, 2) == 'DE' & v.length != 22) {
      throw 'initIBAN (DE) not valid: ' + v;
    }

    this._initIBAN = v;
    
  }

  set initBIC(v) {
    if (v == "") {
      throw 'initBIC may not be emtpy';
    }
    if ( ! ( v.length == 8 | v.length == 11) ) {
      throw 'initBIC must have 8 oder 11 chars';
    }
    v = v.toUpperCase();
    if ( ! v.match(/[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}/) ) {
      throw 'initBIC not valid: ' + v;
    }
    this._initBIC = v;
  }


  set execDate(v) {
    try {
      let d = new Date(v);
    } catch (err) {
      throw 'invalid execDate: ' + v;
    }

    this._execDate = v.toISOString().split('T')[0]; 

  }




  newTx(name, iban, amount, purpose, mref, mdate, id = '') {
    
    let tx = {};
    
    if (! name.match(/^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789/?:().,'+-]+$/) | name.length > 70  ) {
      throw 'invalid creditor name: ' + name;
    } else {
      tx.name = name;
    }
    

    if (! iban.match(/^AL\d{2}\d{8}[a-zA-Z\d]{16}$|^AD\d{2}\d{8}[a-zA-Z\d]{12}$|^AT\d{2}\d{16}$|^AZ\d{2}[a-zA-Z\d]{4}\d{20}$|^BH\d{2}[A-Z]{4}[a-zA-Z\d]{14}$|^BE\d{2}\d{12}$|^BA\d{2}\d{16}$|^BR\d{2}\d{23}[A-Z]{1}[a-zA-Z\d]{1}$|^BG\d{2}[A-Z]{4}\d{6}[a-zA-Z\d]{8}$|^CR\d{2}\d{17}$|^HR\d{2}\d{17}$|^CY\d{2}\d{8}[a-zA-Z\d]{16}$|^CZ\d{2}\d{20}$|^DK\d{2}\d{14}$|^DO\d{2}[A-Z]{4}\d{20}$|^TL\d{2}\d{19}$|^EE\d{2}\d{16}$|^FO\d{2}\d{14}$|^FI\d{2}\d{14}$|^FR\d{2}\d{10}[a-zA-Z\d]{11}\d{2}$|^GE\d{2}[a-zA-Z\d]{2}\d{16}$|^DE\d{2}\d{18}$|^GI\d{2}[A-Z]{4}[a-zA-Z\d]{15}$|^GR\d{2}\d{7}[a-zA-Z\d]{16}$|^GL\d{2}\d{14}$|^GT\d{2}[a-zA-Z\d]{4}[a-zA-Z\d]{20}$|^HU\d{2}\d{24}$|^IS\d{2}\d{22}$|^IE\d{2}[a-zA-Z\d]{4}\d{14}$|^IL\d{2}\d{19}$|^IT\d{2}[A-Z]{1}\d{10}[a-zA-Z\d]{12}$|^JO\d{2}[A-Z]{4}\d{22}$|^KZ\d{2}\d{3}[a-zA-Z\d]{13}$|^XK\d{2}\d{4}\d{10}\d{2}$|^KW\d{2}[A-Z]{4}[a-zA-Z\d]{22}$|^LV\d{2}[A-Z]{4}[a-zA-Z\d]{13}$|^LB\d{2}\d{4}[a-zA-Z\d]{20}$|^LI\d{2}\d{5}[a-zA-Z\d]{12}$|^LT\d{2}\d{16}$|^LU\d{2}\d{3}[a-zA-Z\d]{13}$|^MK\d{2}\d{3}[a-zA-Z\d]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[a-zA-Z\d]{18}$|^MR\d{2}\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{2}\d{10}[a-zA-Z\d]{11}\d{2}$|^MD\d{2}[a-zA-Z\d]{2}[a-zA-Z\d]{18}$|^ME\d{2}\d{18}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{2}\d{11}$|^PK\d{2}[a-zA-Z\d]{4}\d{16}$|^PS\d{2}[a-zA-Z\d]{4}\d{21}$|^PL\d{2}\d{24}$|^PT\d{2}\d{21}$|^QA\d{2}[A-Z]{4}[a-zA-Z\d]{21}$|^RO\d{2}[A-Z]{4}[a-zA-Z\d]{16}$|^SM\d{2}[A-Z]{1}\d{10}[a-zA-Z\d]{12}$|^SA\d{2}\d{2}[a-zA-Z\d]{18}$|^RS\d{2}\d{18}$|^SK\d{2}\d{20}$|^SI\d{2}\d{15}$|^ES\d{2}\d{20}$|^SE\d{2}\d{20}$|^CH\d{2}\d{5}[a-zA-Z\d]{12}$|^TN\d{2}\d{20}$|^TR\d{2}\d{5}[a-zA-Z\d]{17}$|^AE\d{2}\d{3}\d{16}$|^GB\d{2}[A-Z]{4}\d{14}$|^VG\d{2}[a-zA-Z\d]{4}\d{16}$|^AO[\d]{2}[A-Za-z\d]{21}$|^BF[\d]{2}[A-Za-z\d]{23}$|^BI[\d]{2}[A-Za-z\d]{12}$|^BJ[\d]{2}[A-Za-z\d]{24}$|^CF[\d]{2}[A-Za-z\d]{23}$|^CG[\d]{2}[A-Za-z\d]{23}$|^CI[\d]{2}[A-Za-z\d]{24}$|^CM[\d]{2}[A-Za-z\d]{23}$|^CV[\d]{2}[A-Za-z\d]{21}$|^DZ[\d]{2}[A-Za-z\d]{20}$|^EG[\d]{2}[A-Za-z\d]{23}$|^GA[\d]{2}[A-Za-z\d]{23}$|^IR[\d]{2}[A-Za-z\d]{22}$|^MG[\d]{2}[A-Za-z\d]{23}$|^ML[\d]{2}[A-Za-z\d]{24}$|^MZ[\d]{2}[A-Za-z\d]{21}$|^SN[\d]{2}[A-Za-z\d]{24}$|^ST[\d]{2}[A-Za-z\d]{21}$/ ) ) {
      throw 'invalid creditor iban: ' + iban;
    } else {
      tx.iban = iban;
    }
    
    if (! purpose.match(/^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789/?:().,'+-]+$/) | name.length > 140  ) {
      throw 'invalid purpose: ' + purpose;
    } else {
      tx.purpose = purpose;
    }

    tx.amount = amount;

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
    if (this._tx.length == 0) return 0;
    this._tx.forEach(tx => {
      u += tx.amount;
    });
    return u;
  }

  getTxCt() {
    return this._tx.length;
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
    grphdr.ele('CreDtTm', d.toISOString());
    grphdr.ele('NbOfTxs', this.getTxCt());
    grphdr.ele('CtrlSum', this.getTxSum());
    grphdr.ele('InitgPty').ele('Nm', this._initName);

    // PmtInf
    var pmtinf = dd.ele('PmtInf');
    pmtinf.ele('PmtInfId', this._msgId);
    pmtinf.ele('PmtMtd', 'DD');
    // pmtinf.ele('BtchBookg', this._batchBooking.toString());
    pmtinf.ele('NbOfTxs', this.getTxCt());
    pmtinf.ele('CtrlSum', this.getTxSum());
    var pmttpinf = pmtinf.ele('PmtTpInf');
    pmttpinf.ele('SvcLvl').ele('Cd', 'SEPA');
    pmttpinf.ele('LclInstrm').ele('Cd', this.lclinstrm);
    pmttpinf.ele('SeqTp', this.sequencetype);

    pmtinf.ele('ReqdColltnDt', this._execDate);
    pmtinf.ele('Cdtr').ele('Nm', this._initName);
    pmtinf.ele('CdtrAcct').ele('Id').ele('IBAN', this._initIBAN);
    pmtinf.ele('CdtrAgt').ele('FinInstnId').ele('BIC', this._initBIC);
    pmtinf.ele('ChrgBr', 'SLEV');
    var tmp = pmtinf.ele('CdtrSchmeId').ele('Id').ele('PrvtId').ele('Othr');
    tmp.ele('Id', this.creditorid);
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