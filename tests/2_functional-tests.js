const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

// chai-http used for testing api routes
chai.use(chaiHttp);

suite('Functional Tests', function (done) {
  test('Server sends index.html page on GET request to /', () => {
    chai
      .request(server)
      .get('/')
      .then((data) => {
        console.log('DATA IS: ', data);
        done();
      });
  });
});
