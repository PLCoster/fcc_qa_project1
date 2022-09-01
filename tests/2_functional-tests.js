const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const fs = require('fs');
const path = require('path');

// chai-http used for testing api routes
chai.use(chaiHttp);

suite('Functional Tests', function () {
  test('Server sends index.html page on GET request to /', (done) => {
    chai
      .request(server)
      .get('/')
      .then((res) => {
        assert.equal(res.status, 200, 'GET / Response status should be 200');
        assert.equal(res.type, 'text/html');
        assert.equal(
          res.text,
          fs.readFileSync(path.join(__dirname, '../views/index.html'), {
            encoding: 'utf8',
            flag: 'r',
          }),
          'Response text should be index.html',
        );
        done();
      });
  });

  test('Successfully converts on valid input to /api/convert (10L)', (done) => {
    const expectedResult = {
      initNum: 10,
      initUnit: 'L',
      returnNum: 2.64172,
      returnUnit: 'gal',
      string: '10 liters converts to 2.64172 gallons',
    };

    chai
      .request(server)
      .get('/api/convert?input=10L')
      .then((res) => {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(
          res.type,
          'application/json',
          'Response type should be application/json',
        );
        assert.deepEqual(
          res.body,
          expectedResult,
          'Returned JSON should have expected keys and values for successful conversion',
        );
        done();
      });
  });

  test('Successfully converts on valid unit-only input to /api/convert (kg)', (done) => {
    const expectedResult = {
      initNum: 1,
      initUnit: 'kg',
      returnNum: 2.20462,
      returnUnit: 'lbs',
      string: '1 kilograms converts to 2.20462 pounds',
    };

    chai
      .request(server)
      .get('/api/convert?input=kg')
      .then((res) => {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(
          res.type,
          'application/json',
          'Response type should be application/json',
        );
        assert.deepEqual(
          res.body,
          expectedResult,
          'Returned JSON should have expected keys and values for successful conversion',
        );
        done();
      });
  });

  test('Returns error on invalid unit input to /api/convert (32kilomegagram)', (done) => {
    const expectedResult = 'invalid unit';

    chai
      .request(server)
      .get('/api/convert?input=32kilomegagram')
      .then((res) => {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(
          res.type,
          'application/json',
          'Response type should be application/json',
        );
        assert.deepEqual(
          res.body,
          expectedResult,
          'Returned JSON should have expected error message for invalid unit input',
        );
        done();
      });
  });

  test('Returns error on invalid number input to /api/convert (3/7.2/3kg)', (done) => {
    const expectedResult = 'invalid number';

    chai
      .request(server)
      .get('/api/convert?input=3/7.2/3kg')
      .then((res) => {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(
          res.type,
          'application/json',
          'Response type should be application/json',
        );
        assert.deepEqual(
          res.body,
          expectedResult,
          'Returned JSON should have expected error message for invalid number input',
        );
        done();
      });
  });

  test('Returns error on invalid number and unit input to /api/convert (3/7.2/3kilomegagram)', (done) => {
    const expectedResult = 'invalid number and unit';

    chai
      .request(server)
      .get('/api/convert?input=3/7.2/3kilomegagram')
      .then((res) => {
        assert.equal(res.status, 200, 'Response status should be 200');
        assert.equal(
          res.type,
          'application/json',
          'Response type should be application/json',
        );
        assert.deepEqual(
          res.body,
          expectedResult,
          'Returned JSON should have expected error message for invalid number and unit input',
        );
        done();
      });
  });
});
