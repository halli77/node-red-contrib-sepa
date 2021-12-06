
class sepaBASE {
    constructor(name, iban, bic) {
        if ( sepaBASE.validateName(name) ) {
            this._initName = name;
        } else {
            throw 'invalid name';
        }
        
        if ( sepaBASE.validateIBAN(iban) ) {
            this._initIBAN = iban;
        } else {
            throw 'invalid iban';
        }
        if ( sepaBASE.validateBIC(bic) ) {
            this._initBIC = bic; 
        } else {
            throw 'invalid bic';
        }

        let d = new Date();
        this._execDate = d.toISOString().split('T')[0];
        this._createdDateTime = d.toISOString();
        this._msgId = d.toISOString();
        this._batchBooking = true;
        this.supportedMsgTypes = [];
        this._tx = [];
        
    }


   /**
    * Internal helper function to calculate modulo 97
    * 
    * @param {string} i - String to calculate modulo 97
    * @returns {int} - checksum as integer
    */

    static modulo97(i) {
        let mappingTable = {
            'A': 10,
            'B': 11,
            'C': 12,
            'D': 13,
            'E': 14,
            'F': 15,
            'G': 16,
            'H': 17,
            'I': 18,
            'J': 19,
            'K': 20,
            'L': 21,
            'M': 22,
            'N': 23,
            'O': 24,
            'P': 25,
            'Q': 26,
            'R': 27,
            'S': 28,
            'T': 29,
            'U': 30,
            'V': 31,
            'W': 32,
            'X': 33,
            'Y': 34,
            'Z': 35
        }        
        // swap characters to number equivalent
        let j = '';
        i.toUpperCase().split('').forEach(value => { 
            j += ( mappingTable.hasOwnProperty(value) ) ? mappingTable[value] : value;
        })
       
        // calculate modulo 97 
        let pz = '';
        j.match(/.{1,9}/g).forEach( value => {
            pz = (pz + value) % 97;
        })
        return 98 - parseInt(pz);
    }


   /**
    * static function: checks if iban is valid
    * 
    * @param {string} iban - IBAN to validate
    * @return {boolean} - true if valid, false if invalid
    * 
    */
    
    static validateIBAN(iban) {
        // iban may not be empty
        if ( iban == '' ) {
            return false;
        }

        iban = iban.toUpperCase();

        // matches to regex for country specific patterns
        if (! iban.match(/^AL\d{2}\d{8}[a-zA-Z\d]{16}$|^AD\d{2}\d{8}[a-zA-Z\d]{12}$|^AT\d{2}\d{16}$|^AZ\d{2}[a-zA-Z\d]{4}\d{20}$|^BH\d{2}[A-Z]{4}[a-zA-Z\d]{14}$|^BE\d{2}\d{12}$|^BA\d{2}\d{16}$|^BR\d{2}\d{23}[A-Z]{1}[a-zA-Z\d]{1}$|^BG\d{2}[A-Z]{4}\d{6}[a-zA-Z\d]{8}$|^CR\d{2}\d{17}$|^HR\d{2}\d{17}$|^CY\d{2}\d{8}[a-zA-Z\d]{16}$|^CZ\d{2}\d{20}$|^DK\d{2}\d{14}$|^DO\d{2}[A-Z]{4}\d{20}$|^TL\d{2}\d{19}$|^EE\d{2}\d{16}$|^FO\d{2}\d{14}$|^FI\d{2}\d{14}$|^FR\d{2}\d{10}[a-zA-Z\d]{11}\d{2}$|^GE\d{2}[a-zA-Z\d]{2}\d{16}$|^DE\d{2}\d{18}$|^GI\d{2}[A-Z]{4}[a-zA-Z\d]{15}$|^GR\d{2}\d{7}[a-zA-Z\d]{16}$|^GL\d{2}\d{14}$|^GT\d{2}[a-zA-Z\d]{4}[a-zA-Z\d]{20}$|^HU\d{2}\d{24}$|^IS\d{2}\d{22}$|^IE\d{2}[a-zA-Z\d]{4}\d{14}$|^IL\d{2}\d{19}$|^IT\d{2}[A-Z]{1}\d{10}[a-zA-Z\d]{12}$|^JO\d{2}[A-Z]{4}\d{22}$|^KZ\d{2}\d{3}[a-zA-Z\d]{13}$|^XK\d{2}\d{4}\d{10}\d{2}$|^KW\d{2}[A-Z]{4}[a-zA-Z\d]{22}$|^LV\d{2}[A-Z]{4}[a-zA-Z\d]{13}$|^LB\d{2}\d{4}[a-zA-Z\d]{20}$|^LI\d{2}\d{5}[a-zA-Z\d]{12}$|^LT\d{2}\d{16}$|^LU\d{2}\d{3}[a-zA-Z\d]{13}$|^MK\d{2}\d{3}[a-zA-Z\d]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[a-zA-Z\d]{18}$|^MR\d{2}\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{2}\d{10}[a-zA-Z\d]{11}\d{2}$|^MD\d{2}[a-zA-Z\d]{2}[a-zA-Z\d]{18}$|^ME\d{2}\d{18}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{2}\d{11}$|^PK\d{2}[a-zA-Z\d]{4}\d{16}$|^PS\d{2}[a-zA-Z\d]{4}\d{21}$|^PL\d{2}\d{24}$|^PT\d{2}\d{21}$|^QA\d{2}[A-Z]{4}[a-zA-Z\d]{21}$|^RO\d{2}[A-Z]{4}[a-zA-Z\d]{16}$|^SM\d{2}[A-Z]{1}\d{10}[a-zA-Z\d]{12}$|^SA\d{2}\d{2}[a-zA-Z\d]{18}$|^RS\d{2}\d{18}$|^SK\d{2}\d{20}$|^SI\d{2}\d{15}$|^ES\d{2}\d{20}$|^SE\d{2}\d{20}$|^CH\d{2}\d{5}[a-zA-Z\d]{12}$|^TN\d{2}\d{20}$|^TR\d{2}\d{5}[a-zA-Z\d]{17}$|^AE\d{2}\d{3}\d{16}$|^GB\d{2}[A-Z]{4}\d{14}$|^VG\d{2}[a-zA-Z\d]{4}\d{16}$|^AO[\d]{2}[A-Za-z\d]{21}$|^BF[\d]{2}[A-Za-z\d]{23}$|^BI[\d]{2}[A-Za-z\d]{12}$|^BJ[\d]{2}[A-Za-z\d]{24}$|^CF[\d]{2}[A-Za-z\d]{23}$|^CG[\d]{2}[A-Za-z\d]{23}$|^CI[\d]{2}[A-Za-z\d]{24}$|^CM[\d]{2}[A-Za-z\d]{23}$|^CV[\d]{2}[A-Za-z\d]{21}$|^DZ[\d]{2}[A-Za-z\d]{20}$|^EG[\d]{2}[A-Za-z\d]{23}$|^GA[\d]{2}[A-Za-z\d]{23}$|^IR[\d]{2}[A-Za-z\d]{22}$|^MG[\d]{2}[A-Za-z\d]{23}$|^ML[\d]{2}[A-Za-z\d]{24}$|^MZ[\d]{2}[A-Za-z\d]{21}$|^SN[\d]{2}[A-Za-z\d]{24}$|^ST[\d]{2}[A-Za-z\d]{21}$/ ) ) {
            return false;
        }

        // especially for german IBANS: check length
        if ( iban.substr(0, 2) == 'DE' & iban.length != 22) {
            return false;
        }

        // checksum
        let i = iban.substr(4, iban.length - 4) + iban.substr(0, 2) + '00';
        if (sepaBASE.modulo97(i) != parseInt(iban.substr(2,2))) {
            return false;
        }

        return true;
    }



   /**
    * static function: checks if iban is valid
    * 
    * @param {string} bic - BIC to validate
    * @return {boolean} - true if valid, false if invalid
    * 
    */

    static validateBIC(bic) {
        // may not be empty
        if (bic == '') {
            return false;
        }
        // check length
        if ( ! ( bic.length == 8 | bic.length == 11) ) {
            return false;
        }
        
        // pattern matching
        bic = bic.toUpperCase();
        if ( ! bic.match(/[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}/) ) {
            return false;
        }

        return true;
    }



   /**
    * static function: checks if creditor id is valid
    * 
    * @param {string} ci - creditor id to validate
    * @return {boolean} - true if valid, false if invalid
    * 
    */
    
    static validateCI(ci) {
        // ci may not be empty
        if ( ci == '' ) {
            return false;
        }

        // not longer than 35 chars
        if ( ci.length > 35) {
            return false;
        }

        ci = ci.toUpperCase();

        // matches to regex patterns
        if (! ci.match(/[a-zA-Z]{2,2}[0-9]{2,2}([A-Za-z0-9]|[\+|\?|/|\|:|\(|\)|\.|,|']){3,3}([A-Za-z0-9]|[\+|\?|/|\|:|\(|\)|\.|,|']){1,28}/ ) ) {
            //console.log('pattern does not match');
            return false;
        }

        // especially for german CI: check length
        if ( ci.substr(0, 2) == 'DE' && ci.length != 18) {
            //console.log('DE ci not 18 chars')
            return false;
        }

        // checksum
        let i = ci.substr(7, ci.length - 7) + ci.substr(0, 2) + '00';
        if ( sepaBASE.modulo97(i) != parseInt(ci.substr(2,2))) {
            // console.log('checksum wrong');
            // console.log(sepaBASE.modulo97(i));
            // console.log(ci);
            return false;
        }

        return true;
    }


   /**
    * static function: checks if name string is valid and length max. 70 chars
    * @param {string} name - name to validate
    * @return {boolean} - true if valid, false if invalid
    */
    static validateName(name) {
        // may not be empty
        if (name === '') {
            return false;
        }
        // check length
        if ( name.length > 70) {
            return false;
        }
    
        // pattern matching
        if ( ! name.match(/^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789/?:().,'+-]+$/) ) {
            return false;
        }
        return true;
    }



   /**
    * static function: checks if purpose string is valid and length max. 140 chars
    * @param {string} purpose - string to validate
    * @return {boolean} - true if valid, false if invalid
    */
    static validatePurpose(purpose) {
        // may not be empty
        if (purpose == '') {
            return false;
        }
        // check length
        if ( purpose.length > 140) {
            return false;
        }
    
        // pattern matching
        if ( ! purpose.match(/^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789/?:().,'+-]+$/) ) {
            return false;
        }
        return true;
    }




   /**
    * Check if a given number is a valid amount for sepa payments
    * @param {number} amount - number to check 
    * @returns {boolean} - true if valid, false if not
    */  
    static validateAmount(amount) {
        // not 0
        if (amount === 0) {
            return false;
        }
        let s = amount.toString();
        if ( ! s.match(/^\d+(\.\d{1,2})?$/) ) {
            return false;
        }
        return true;
    }


   /**
    * Temporary service function for generic format checking
    * 
    * @param {string} name 
    * @param {string} value 
    * @param {number} minLength 
    * @param {number} maxLength 
    * @returns value
    */

    static checkValue(name, value, minLength, maxLength) {
        if (value.length < minLength) {
          throw 'value for ' + name + ' is to short: ' + value;
        }
    
        if (value.length > maxLength) {
          throw 'value for ' + name + ' is to long: ' + value;
        }  
    
        return value;
    
      }


      
   /**
    * Set message type
    * 
    * @param {string} messagetype - requested message type
    * 
    */
   
    set messagetype(messagetype) {
        if (messagetype == '') {
          throw 'messagetype may not be empty';
        }
         
        if (this.supportedMsgTypes.indexOf(messagetype) == -1) {
          throw 'unsupported messagetype: ' + messagetype;
        }
    
        this._messagetype = messagetype;
    }




   /**
    *  Set batch booking attribute
    * 
    *  @param {boolean} batchbooking - if true: batch booking, if false: single bookings
    */

    set batchBooking(batchbooking) {
        if (typeof batchbooking == 'boolean') {
            this._batchBooking = batchbooking;
        } else if (typeof batchbooking == 'number') {
            batchbooking == 0 ? this._batchBooking = true : this._batchBooking = false;
        } else if (typeof batchbooking == 'string') {
            batchbooking.toUpperCase == 'TRUE' ? this._batchBooking = true : this._batchBooking = false;
        } else {
            throw 'batchBooking attribute not valid';
        }
    }


   /**
    * Set initiator's name
    * 
    * @param {string} name - A string containing the initiator's name 
    */
    
    set initName(name) {
        if (! sepaBASE.validateName(name)) {
            throw 'initname not valid';
        } else {
            this._initName = name;
        }
    }



   /**
    * Set initiator's IBAN
    * 
    * @param {string} iban - A string containing the initiator's IBAN 
    */

    set initIBAN(iban) {
        if (! sepaBASE.validateIBAN(iban) ) {
            throw 'initiban not valid';
        } else {
            this._initIBAN = iban;
        }
    }
    

   /**
    * Set initiator's BIC
    * 
    * @param {string} bic - A string containing the initiator's BIC 
    */

    set initBIC(bic) {
        if (! sepaBASE.validateBIC(bic)) {
            throw 'initbic not valid';
        } else {
            this._initBIC = bic;
        }
    }




   /**
    *  Set requested execution date / due date
    * 
    * @param {string} execdate - Execution date as string formatted YYYY-MM-DD
    */

    set execDate(execdate) {
        try {
          let d = new Date(execdate);
          this._execDate = d.toISOString().split('T')[0]; 
        } catch (err) {
          throw 'invalid execDate: ' + execdate;
        }
    
    }
    

   /**
    *  Set created date/time
    * 
    * @param {string} cdt - Created date/time
    */

    set createdDateTime(cdt) {
        try {
            let d = new Date(cdt);
            this._createdDateTime = d.toISOString(); 
        } catch (err) {
            throw 'invalid execDate: ' + cdt;
        }
        
    }



   /**
    *  Set message id
    * 
    * @param {string} msgid - message id
    */

    set messageId(msgid) {
        this._msgId = msgid;
    }


   /**
    * Get number of transactions
    * 
    * @returns {number} - total number of transactions
    */
    get getNumberOfTx() {
        return this._tx.length;
    }

   /**
    * Get total sum of transactions
    * @returns {number} - total sum of transactions
    */
    get getTotalSumOfTx() {
        let u = 0;
        if (this._tx.length == 0) return 0;
        this._tx.forEach(tx => {
          u += tx.amount;
        });
        return u;
    }


}

module.exports = sepaBASE;
