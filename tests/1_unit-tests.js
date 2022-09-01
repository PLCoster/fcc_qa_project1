const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler.getNum correctly reads a whole number input', () => {
    const num = convertHandler.getNum('10kg');
    assert.strictEqual(
      num,
      10,
      'convertHandler.getNum should return the correct whole number (10)',
    );
  });

  test('convertHandler.getNum correctly reads a decimal number input', () => {
    const num1 = convertHandler.getNum('10.5gal');
    assert.strictEqual(
      num1,
      10.5,
      'convertHandler.getNum should return the correct decimal number (10.5)',
    );

    const num2 = convertHandler.getNum('0.01km');
    assert.strictEqual(
      num2,
      0.01,
      'convertHandler.getNum should return the correct decimal number (0.01)',
    );
  });

  test('convertHandler.getNum correctly reads a fractional input', () => {
    const num = convertHandler.getNum('3/2lbs');
    assert.strictEqual(
      num,
      3 / 2,
      'convertHandler.getNum should return the correct fractional number (1.5)',
    );

    const num2 = convertHandler.getNum('0/5l');
    assert.strictEqual(
      num2,
      0,
      'convertHandler.getNum should return the correct fractional number (0)',
    );
  });

  test('convertHandler.getNum correctly reads a fractional input with decimals', () => {
    const num = convertHandler.getNum('3.5/2mi');
    assert.strictEqual(
      num,
      3.5 / 2,
      'convertHandler.getNum should return the correct fractional number (1.75)',
    );

    const num2 = convertHandler.getNum('10/2.5lb');
    assert.strictEqual(
      num2,
      10 / 2.5,
      'convertHandler.getNum should return the correct fractional number (4)',
    );

    const num3 = convertHandler.getNum('20.1/4.2grams');
    assert.strictEqual(
      num3,
      20.1 / 4.2,
      'convertHandler.getNum should return the correct fractional number (5)',
    );

    const num4 = convertHandler.getNum('3.333/1.111');
    assert.strictEqual(
      num4,
      3.333 / 1.111,
      'convertHandler.getNum should return the correct fractional number (3)',
    );
  });

  test('convertHandler.getNum should return an error on a double-fraction (3/2/3)', () => {
    assert.throws(
      () => convertHandler.getNum('3/2/3'),
      Error,
      'invalid number',
      'An invalid number (3/2/3) should throw an error in convertHandler',
    );

    assert.throws(
      () => convertHandler.getNum('5.2.1km'),
      Error,
      'invalid number',
      'An invalid number (5.2.1km) should throw an error in convertHandler',
    );
  });

  test('convertHandler.getNum should return an error on an infinite fraction (1/0)', () => {
    assert.throws(
      () => convertHandler.getNum('3/0km'),
      Error,
      'invalid number (divide by 0)',
      'A fraction with a denominator of 0 should throw an error in convertHandler.getNum (3/0km)',
    );

    assert.throws(
      () => convertHandler.getNum('10.0/0.000mi'),
      Error,
      'invalid number (divide by 0)',
      'A fraction with a denominator of 0 should throw an error in convertHandler.getNum (10.0/0.000mi)',
    );
  });

  test('convertHandler.getNum should default to a numerical input of 1 when no numerical input is provided', () => {
    const num = convertHandler.getNum('');
    assert.strictEqual(
      num,
      1,
      'convertHandler.getNum should return 1 by default',
    );

    const num2 = convertHandler.getNum('km');
    assert.strictEqual(
      num2,
      1,
      'convertHandler.getNum should return 1 by default',
    );
  });

  test('convertHandler.getUnit should correctly read each valid input unit', () => {
    let unit;
    unit = convertHandler.getUnit('10L');
    assert.strictEqual(
      unit,
      'L',
      'convertHandler.getUnit should detect L and return L',
    );

    unit = convertHandler.getUnit('10.51l');
    assert.strictEqual(
      unit,
      'L',
      'convertHandler.getUnit should detect l and return L',
    );

    unit = convertHandler.getUnit('2/3gal');
    assert.strictEqual(
      unit,
      'gal',
      'convertHandler.getUnit should detect gal and return gal',
    );

    unit = convertHandler.getUnit('6.5/3GAL');
    assert.strictEqual(
      unit,
      'gal',
      'convertHandler.getUnit should detect GAL and return gal',
    );

    unit = convertHandler.getUnit('10.001kg');
    assert.strictEqual(
      unit,
      'kg',
      'convertHandler.getUnit should detect kg and return kg',
    );

    unit = convertHandler.getUnit('3.333/1.111KG');
    assert.strictEqual(
      unit,
      'kg',
      'convertHandler.getUnit should detect KG and return kg',
    );

    unit = convertHandler.getUnit('10/3lbs');
    assert.strictEqual(
      unit,
      'lbs',
      'convertHandler.getUnit should detect lbs and return lbs',
    );

    unit = convertHandler.getUnit('10/3LBS');
    assert.strictEqual(
      unit,
      'lbs',
      'convertHandler.getUnit should detect LBS and return lbs',
    );

    unit = convertHandler.getUnit('99999km');
    assert.strictEqual(
      unit,
      'km',
      'convertHandler.getUnit should detect km and return km',
    );

    unit = convertHandler.getUnit('99999.578KM');
    assert.strictEqual(
      unit,
      'km',
      'convertHandler.getUnit should detect KM and return km',
    );

    unit = convertHandler.getUnit('123/456mi');
    assert.strictEqual(
      unit,
      'mi',
      'convertHandler.getUnit should detect mi and return mi',
    );

    unit = convertHandler.getUnit('123.45/789.0MI');
    assert.strictEqual(
      unit,
      'mi',
      'convertHandler.getUnit should detect MI and return mi',
    );
  });

  test('convertHandler.getUnit should return an error on an invalid unit', () => {
    assert.throws(
      () => convertHandler.getUnit('3/2/3'),
      Error,
      'invalid unit',
      'An input with no unit should throw an invalid unit error in convertHandler.getUnit',
    );

    assert.throws(
      () => convertHandler.getUnit('5.2.1kgkm'),
      Error,
      'invalid unit',
      'An input with an invalid unit should throw an an invalid unit error in convertHandler.getUnit',
    );

    assert.throws(
      () => convertHandler.getUnit('3/7.2/4kilomegagrams'),
      Error,
      'invalid unit',
      'An input with an invalid unit should throw an an invalid unit error in convertHandler.getUnit',
    );
  });

  test('convertHandler.getReturnUnit should return the correct return unit for each valid input unit', () => {
    const unitToReturnUnit = {
      L: 'gal',
      gal: 'L',
      kg: 'lbs',
      lbs: 'kg',
      km: 'mi',
      mi: 'km',
    };

    let returnUnit;
    Object.keys(unitToReturnUnit).forEach((initUnit) => {
      returnUnit = convertHandler.getReturnUnit(initUnit);

      assert.strictEqual(
        returnUnit,
        unitToReturnUnit[initUnit],
        `convertHandler.getReturnUnit should return ${unitToReturnUnit[initUnit]} given ${initUnit}`,
      );
    });
  });

  test('convertHandler.spellOutUnit should return the correct unit string for each valid input unit', () => {
    const unitToFullString = {
      L: 'liters',
      gal: 'gallons',
      kg: 'kilograms',
      lbs: 'pounds',
      km: 'kilometers',
      mi: 'miles',
    };

    Object.keys(unitToFullString).forEach((initUnit) => {
      const fullString = convertHandler.spellOutUnit(initUnit);

      assert.strictEqual(
        fullString,
        unitToFullString[initUnit],
        `convertHandler.spellOutUnit should return ${unitToFullString[initUnit]} given ${initUnit}`,
      );
    });
  });

  // Provided conversions
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  // Helper to round to 5 D.P.
  function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
  }

  test('convertHandler.convert successfully converts gal to L', () => {
    const result = convertHandler.convert(10, 'gal');
    assert.strictEqual(result, roundNumber(10 * galToL));
  });

  test('convertHandler.convert successfully converts L to gal', () => {
    const result = convertHandler.convert(25.5, 'L');
    assert.strictEqual(result, roundNumber(25.5 / galToL));
  });

  test('convertHandler.convert successfully converts mi to km', () => {
    const result = convertHandler.convert(2 / 3, 'mi');
    assert.strictEqual(result, roundNumber((2 / 3) * miToKm));
  });

  test('convertHandler.convert successfully converts km to mi', () => {
    const result = convertHandler.convert(3 / 4, 'km');
    assert.strictEqual(result, roundNumber(3 / 4 / miToKm));
  });

  test('convertHandler.convert successfully converts lbs to kg', () => {
    const result = convertHandler.convert(24, 'lbs');
    assert.strictEqual(result, roundNumber(24 * lbsToKg));
  });

  test('convertHandler.convert successfully converts kg to lbs', () => {
    const result = convertHandler.convert(3, 'kg');
    assert.strictEqual(result, roundNumber(3 / lbsToKg));
  });

  test('convertHandler.getString produces correct conversion string', () => {
    const string = convertHandler.getString(
      10,
      'kg',
      roundNumber(10 / lbsToKg),
      'lbs',
    );
    const expected = '10 kilograms converts to 22.04624 pounds';
    assert.strictEqual(string, expected);
  });
});
