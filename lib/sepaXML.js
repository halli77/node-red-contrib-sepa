const pain_001_001_03_file = {
    "Document": {
      "$": {
        "xmlns": "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation": "urn:iso:std:iso:20022:tech:xsd:pain.001.001.03 pain.001.001.03.xsd"
      },
      "CstmrCdtTrfInitn": [
        {
          "GrpHdr": [
            {
              "MsgId": [
                "myMessageId"
              ],
              "CreDtTm": [
                "2000-10-19T17:42:15.239Z"
              ],
              "NbOfTxs": [
                "0"
              ],
              "CtrlSum": [
                "0"
              ],
              "InitgPty": [
                {
                  "Nm": [
                    "Initiators Name"
                  ]
                }
              ]
            }
          ],
          "PmtInf": [
            {
              "PmtInfId": [
                "MsgId"
              ],
              "PmtMtd": [
                "TRF"
              ],
              "BtchBookg": [
                "true"
              ],
              "NbOfTxs": [
                "0"
              ],
              "CtrlSum": [
                "0"
              ],
              "ReqdExctnDt": [
                "2000-01-01"
              ],
              "Dbtr": [
                {
                  "Nm": [
                    "initiators Name"
                  ]
                }
              ],
              "DbtrAcct": [
                {
                  "Id": [
                    {
                      "IBAN": [
                        "DE00000000000000000000"
                      ]
                    }
                  ]
                }
              ],
              "DbtrAgt": [
                {
                  "FinInstnId": [
                    {
                      "BIC": [
                        ""
                      ]
                    }
                  ]
                }
              ],
              "ChrgBr": [
                "SLEV"
              ],
              "CdtTrfTxInf": [
              ]
            }
          ]
        }
      ]
    }
  };


const pain_001_001_03_tx = {
  "PmtId": [
    {
      "EndToEndId": [
        "e2e ..."
      ]
    }
  ],
  "Amt": [
    {
      "InstdAmt": [
        {
          "_": "0",
          "$": {
            "Ccy": "EUR"
          }
        }
      ]
    }
  ],
  "Cdtr": [
    {
      "Nm": [
        "counterparty name..."
      ]
    }
  ],
  "CdtrAcct": [
    {
      "Id": [
        {
          "IBAN": [
            "DE..."
          ]
        }
      ]
    }
  ],
  "RmtInf": [
    {
      "Ustrd": [
        "rmtinfo..."
      ]
    }
  ]
};



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
    var tx = {};
    var d = new Date();
    tx.name = name;
    tx.iban = iban;
    tx.amount = amount;
    tx.purpose = purpose;
    if (id == '') {
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

  getMsgAsJson() {

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

    this.message = pain_001_001_03_file;  

    // CdtTrfTxInf => this.message.Document.CstmrCdtTrfInitn[0].CrdTrfTxInf[]
    this.tx.forEach((tx) => {
      let txtmplt = pain_001_001_03_tx;
      if (tx.id === '') {
        let d = new Date();
        txtmplt.PmtId[0].EndToEndId[0] = d.toISOString();
      } else {
        txtmplt.PmtId[0].EndToEndId[0] = this.checkValue('id', tx.id, 1, 35);
      }
      txtmplt.Amt[0].InstdAmt[0]._ = tx.amount;
      txtmplt.Cdtr[0].Nm[0] = this.checkValue('name', tx.name, 2, 70);
      txtmplt.CdtrAcct[0].Id[0].IBAN[0] = this.checkValue('iban',tx.iban, 2, 70)
      txtmplt.RmtInf[0].Ustrd[0] = this.checkValue('purpose', tx.purpose, 1, 140);
      this.message.Document.CstmrCdtTrfInitn[0].PmtInf[0].CdtTrfTxInf.push(txtmplt);
    });

    let d = new Date();

    // GrpHeader
    this.message.Document.CstmrCdtTrfInitn[0].GrpHdr[0].MsgId[0] = this.msgId;
    this.message.Document.CstmrCdtTrfInitn[0].GrpHdr[0].CreDtTm[0] = d.toISOString();
    this.message.Document.CstmrCdtTrfInitn[0].GrpHdr[0].NbOfTxs[0] = this.getTxCt();
    this.message.Document.CstmrCdtTrfInitn[0].GrpHdr[0].CtrlSum[0] = this.getTxSum();
    this.message.Document.CstmrCdtTrfInitn[0].GrpHdr[0].InitgPty[0].Nm[0] = this.checkValue('initName', this.initName, 2, 70);

    // PmtInfo
    this.message.Document.CstmrCdtTrfInitn[0].PmtInf[0].PmtInfId[0] = this.msgId;
    this.message.Document.CstmrCdtTrfInitn[0].PmtInf[0].BtchBookg[0] = this.batchBooking.toString();
    this.message.Document.CstmrCdtTrfInitn[0].PmtInf[0].NbOfTxs[0] = this.getTxCt();
    this.message.Document.CstmrCdtTrfInitn[0].PmtInf[0].CtrlSum[0] = this.getTxSum();
    this.message.Document.CstmrCdtTrfInitn[0].PmtInf[0].ReqdExctnDt[0] = this.execDate;
    this.message.Document.CstmrCdtTrfInitn[0].PmtInf[0].Dbtr[0].Nm[0] = this.checkValue('initName', this.initName, 2, 70);
    this.message.Document.CstmrCdtTrfInitn[0].PmtInf[0].DbtrAcct[0].Id[0].IBAN[0] = this.checkValue('initIBAN', this.initIBAN, 2, 70);
    this.message.Document.CstmrCdtTrfInitn[0].PmtInf[0].DbtrAgt[0].FinInstnId[0].BIC[0] = this.checkValue('initBIC', this.initBIC, 8, 11);

    return this.message;
      
  }

  getMsgAsString() {
    this.getMsgAsJson();
    return JSON.stringify(this.message);
  }

  getMsgAsXmlString() {
    const xml2js = require('xml2js');
    let builder = new xml2js.Builder();
    return builder.buildObject(this.getMsgAsJson());
  }

}

module.exports = sepaXML;