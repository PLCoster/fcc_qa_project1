const unitRegex = /kg|lbs|mi|km|gal|l/;

// Class to handle conversions
function ConvertHandler() {
  // Extract number from string input to API
  // Number can be integer, decimal or fraction
  // Returns the extracted number, if valid, otherwise throws an error
  // If no number given, returns 1
  this.getNum = function (inputStr) {
    const safeString = inputStr.trim().toLowerCase();
    // Try to match number as fraction, decimal or whole number
    const match = safeString.match(
      /^((?<NUMERATOR>[0-9]*(?:\.[0-9]*)?)\/(?<DENOMINATOR>[0-9]*(?:\.[0-9]*)?)|(?<DECIMAL>[0-9]*(?:\.[0-9]*)?))[^0-9\.\/]*$/,
    );
    console.log(match);

    if (!match) {
      // No valid number detected - throw an error
      throw new Error('invalid number');
    }

    const { NUMERATOR, DENOMINATOR, DECIMAL } = match.groups;

    // If we have a fractional input, calculate fraction
    if (NUMERATOR && DENOMINATOR) {
      const num = Number(NUMERATOR);
      const denom = Number(DENOMINATOR);
      if (denom === 0) {
        // Avoid dividing by 0 - number is invalid
        return false;
      }

      return num / denom;
    } else if (DECIMAL) {
      return Number(DECIMAL);
    } else {
      // No number was given - DECIMAL is empty string
      return 1;
    }
  };

  // Extract measurement unit from input string and return it
  // Valid inputs are gal|l|km|mi|lb(s?)|kg in upper or lowercase
  // Valid measurement units are returned as lowercase strings
  // If no valid unit is found, throws an error
  this.getUnit = function (inputStr) {
    const safeString = inputStr.trim().toLowerCase();

    // Try to match the measurement unit

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;

const test = new ConvertHandler();
const testInput = '10kg';
const result = test.getNum(testInput);
console.log('RESULT: ', result, typeof result);

const testInput2 = '10.5l';
const result2 = test.getNum(testInput2);
console.log('RESULT: ', result2, typeof result2);

const testInput3 = '3/2gal';
const result3 = test.getNum(testInput3);
console.log('RESULT: ', result3, typeof result3);

const testInput4 = 'km';
const result4 = test.getNum(testInput4);
console.log('RESULT: ', result4, typeof result4);
