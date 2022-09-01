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

  // TESTS TO DO:
  // Convert a valid input such as 10L: GET request to /api/convert.
  // Convert an invalid input such as 32g: GET request to /api/convert.
  // Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
  // Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
  // Convert with no number such as kg: GET request to /api/convert.
});
