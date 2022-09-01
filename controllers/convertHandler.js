const numberRegex = /[0-9]*(?:\.[0-9]*)?(?:\/[0-9]*(?:\.[0-9]*)?)?/;
const validUnitRegex = /kg|lbs|mi|km|gal|l/;

// Class to handle conversions
function ConvertHandler() {
  // Extract number from string input to API
  // Number can be integer, decimal or fraction
  // Returns the extracted number, if valid, otherwise throws an error
  // If no number given, returns 1
  this.getNum = function (inputStr) {
    const safeString = inputStr.trim().toLowerCase();
    // The number portion of the string is everything before a run of alphabetical
    // characters at the end of the string
    const numString = safeString.match(/^(?<NUMBER>.*)[a-zA-Z]*$/).groups
      .NUMBER;

    // Try to match number as fraction, decimal or whole number
    const numMatch = numString.match(
      /^((?<NUMERATOR>[0-9]*(?:\.[0-9]*)?)\/(?<DENOMINATOR>[0-9]*(?:\.[0-9]*)?)|(?<DECIMAL>[0-9]*(?:\.[0-9]*)?))[^0-9\.\/]*$/,
    );

    if (!numMatch) {
      // No valid number detected - throw an error
      throw new Error('invalid number');
    }

    const { NUMERATOR, DENOMINATOR, DECIMAL } = numMatch.groups;

    // If we have a fractional input, calculate fraction
    if (NUMERATOR && DENOMINATOR) {
      const num = Number(NUMERATOR);
      const denom = Number(DENOMINATOR);
      if (denom === 0) {
        // Avoid dividing by 0 - number is invalid - throw an error
        throw new Error('invalid number (divide by 0)');
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

    // Extract all alphabetic characters from end of the inputStr
    const unitString = safeString.match(/[a-zA-Z]*$/)[0];

    // Try to match the measurement unit
    const unitRegex = new RegExp(`^(?<UNIT>${validUnitRegex.source})$`);
    const unitMatch = unitString.match(unitRegex);

    if (!unitMatch) {
      // No valid unit detected - throw an error
      throw new Error('invalid unit');
    }

    return unitMatch.groups.UNIT === 'l' ? 'L' : unitMatch.groups.UNIT;
  };

  // Returns the abbreviated unit we will convert the given number to,
  // based on the initial unit given
  this.getReturnUnit = function (initUnit) {
    const unitToReturnUnit = {
      L: 'gal',
      gal: 'L',
      kg: 'lbs',
      lbs: 'kg',
      km: 'mi',
      mi: 'km',
    };

    return unitToReturnUnit[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const unitToFullString = {
      L: 'liters',
      gal: 'gallons',
      kg: 'kilograms',
      lbs: 'pounds',
      km: 'kilometers',
      mi: 'miles',
    };

    return unitToFullString[unit];
  };

  // Converts the initNum to the returnNum value, based on initUnit
  // Rounds the result to 5 D.P.
  this.convert = function (initNum, initUnit) {
    const unitConversion = {
      gal: 3.78541,
      L: 1 / 3.78541,
      lbs: 0.453592,
      kg: 1 / 0.453592,
      mi: 1.60934,
      km: 1 / 1.60934,
    };

    return Math.round(initNum * unitConversion[initUnit] * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const conversionString = `${initNum} ${this.spellOutUnit(
      initUnit,
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return conversionString;
  };
}

module.exports = ConvertHandler;
