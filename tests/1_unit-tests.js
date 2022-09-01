const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler.getNum correctly reads a whole number input', () => {
    const num = convertHandler.getNum('10kg');
    assert.isNumber(num, 'convertHandler should return a number');
    assert.equal(
      num,
      10,
      'convertHandler.getNum should return the correct whole number (10)',
    );
  });

  test('convertHandler.getNum correctly reads a decimal number input', () => {
    const num1 = convertHandler.getNum('10.5gal');
    assert.isNumber(num1, 'convertHandler should return a number');
    assert.equal(
      num1,
      10.5,
      'convertHandler.getNum should return the correct decimal number (10.5)',
    );

    const num2 = convertHandler.getNum('0.01km');
    assert.isNumber(num2, 'convertHandler should return a number');
    assert.equal(
      num2,
      0.01,
      'convertHandler.getNum should return the correct decimal number (0.01)',
    );
  });

  test('convertHandler.getNum correctly reads a fractional input', () => {
    const num = convertHandler.getNum('3/2lbs');
    assert.isNumber(num, 'convertHandler should return a number');
    assert.equal(
      num,
      3 / 2,
      'convertHandler.getNum should return the correct fractional number (1.5)',
    );

    const num2 = convertHandler.getNum('0/5l');
    assert.isNumber(num2, 'convertHandler should return a number');
    assert.equal(
      num2,
      0,
      'convertHandler.getNum should return the correct fractional number (0)',
    );
  });

  test('convertHandler.getNum correctly reads a fractional input with decimals', () => {
    const num = convertHandler.getNum('3.5/2mi');
    assert.isNumber(num, 'convertHandler should return a number');
    assert.equal(
      num,
      3.5 / 2,
      'convertHandler.getNum should return the correct fractional number (1.75)',
    );

    const num2 = convertHandler.getNum('10/2.5lb');
    assert.isNumber(num2, 'convertHandler should return a number');
    assert.equal(
      num2,
      10 / 2.5,
      'convertHandler.getNum should return the correct fractional number (4)',
    );

    const num3 = convertHandler.getNum('20.1/4.2grams');
    assert.isNumber(num3, 'convertHandler should return a number');
    assert.equal(
      num3,
      20.1 / 4.2,
      'convertHandler.getNum should return the correct fractional number (5)',
    );

    const num4 = convertHandler.getNum('3.333/1.111');
    assert.isNumber(num4, 'convertHandler should return a number');
    assert.equal(
      num4,
      3.333 / 1.111,
      'convertHandler.getNum should return the correct fractional number (3)',
    );
  });

  test('convertHandler.getNum should return an error on a double-fraction (3/2/3', () => {
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

  test('convertHandler.getNum should return an error on a double-fraction (e.g. 3/2/3)', () => {
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

  test('convertHandler.getNum should default to a numerical input of 1 when no numerical input is provided', () => {
    const num = convertHandler.getNum('');
    assert.isNumber(num, 'convertHandler should return a number');
    assert.equal(num, 1, 'convertHandler.getNum should return 1 by default');

    const num2 = convertHandler.getNum('km');
    assert.isNumber(num2, 'convertHandler should return a number');
    assert.equal(num2, 1, 'convertHandler.getNum should return 1 by default');
  });
});
