'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  // API route - GET request to /api/convert with input query param
  app.get('/api/convert', (req, res) => {
    const { input } = req.query;

    // If no input, there are no units (number would default to 1)
    if (!input) {
      return res.json('invalid unit');
    }

    // Otherwise try to convert:
    let errMessage, initNum, initUnit;
    try {
      initNum = convertHandler.getNum(input);
    } catch (err) {
      // Number is not valid, store message
      errMessage = err.message;
    }

    try {
      initUnit = convertHandler.getUnit(input);
    } catch (err) {
      // Unit is not valid - either both number and unit or just unit are invalid
      if (errMessage) {
        errMessage = 'invalid number and unit';
      } else {
        errMessage = err.message;
      }
    }

    if (errMessage) {
      return res.json(errMessage);
    }

    // Otherwise number and unit are valid, return conversion
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit,
    );

    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
