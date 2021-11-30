
class sepaBASE {
  constructor() {
  
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



}

module.exports = sepaBASE;