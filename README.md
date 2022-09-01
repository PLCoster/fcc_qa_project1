# Free Code Camp: Quality Assurance Projec 1 - Metric / Imperial Converter

## Metric / Imperial Converter

The aim of this project was to build a small web app with functionality similar to: https://metric-imperial-converter.freecodecamp.rocks

The project was built using the following technologies:

- **HTML**
- **JavaScript** with **[Node.js](https://nodejs.org/en/) / [NPM](https://www.npmjs.com/)** for package management.
- **[Express](https://expressjs.com/)** web framework to build the web API.
- **[Bootstrap](https://getbootstrap.com/)** for styling with some custom **CSS**.
- **[FontAwesome](https://fontawesome.com/)** for icons.
- **[Mocha](https://mochajs.org/)** test framework with **[Chai](https://www.chaijs.com/)** assertions for testing.
- **[nodemon](https://nodemon.io/)** for automatic restarting of server during development.

### Project Requirements:

- **User Story #1:** You can GET /api/convert with a single parameter containing an accepted number and unit and have it converted.

- **User Story #2:** You can convert 'gal' to 'L' and vice versa. (1 gal to 3.78541 L)

- **User Story #3:** You can convert 'lbs' to 'kg' and vice versa. (1 lbs to 0.453592 kg)

- **User Story #4:** You can convert 'mi' to 'km' and vice versa. (1 mi to 1.60934 km)

- **User Story #5:** All incoming units should be accepted in both upper and lower case, but should be returned in both the initUnit and returnUnit in lower case, except for liter, which should be represented as an uppercase 'L'

- **User Story #6:** If the unit of measurement is invalid, returned will be 'invalid unit'.

- **User Story #7:** If the number is invalid, returned will be 'invalid number'.

- **User Story #8:** If both the unit and number are invalid, returned will be 'invalid number and unit'.

- **User Story #9:** You can use fractions, decimals or both in the parameter (ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.

- **User Story #10:** Your return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in the format '{initNum} {initUnitString} converts to {returnNum} {returnUnitString}' with the result rounded to 5 decimals.

- **User Story #11:** All of the 16 following `ConvertHandler` unit tests are complete and passing:

  - `ConvertHandler` should correctly read a whole number input.
  - `ConvertHandler` should correctly read a decimal number input.
  - `ConvertHandler` should correctly read a fractional input.
  - `ConvertHandler` should correctly read a fractional input with a decimal.
  - `ConvertHandler` should correctly return an error on a double-fraction (i.e. `3/2/3`).
  - `ConvertHandler` should correctly default to a numerical input of `1` when no numerical input is provided.
  - `ConvertHandler` should correctly read each valid input unit.
  - `ConvertHandler` should correctly return an error for an invalid input unit.
  - `ConvertHandler` should return the correct return unit for each valid input unit.
  - `ConvertHandler` should correctly return the spelled-out string unit for each valid input unit.
  - `ConvertHandler` should correctly convert `gal` to `L`.
  - `ConvertHandler` should correctly convert `L` to `gal`.
  - `ConvertHandler` should correctly convert `mi` to `km`.
  - `ConvertHandler` should correctly convert `km` to `mi`.
  - `ConvertHandler` should correctly convert `lbs` to `kg`.
  - `ConvertHandler` should correctly convert `kg` to `lbs`.

- **User Story #12:** All of the 5 following functional tests for the `GET /api/convert` application route are complete and passing:
  - A valid input such as `10L` on `GET` request to `/api/convert` should return a successful conversion object.
  - A valid unit input with no number such as `mi` on `GET` request to `/api/convert` should default the number value to `1` and return a successful conversion object.
  - An invalid unit input such as `32kilogramameters` on `GET` request to `/api/convert` should return the string `'invalid unit'`.
  - An invalid number input such as `3/10/2kg` on `GET` request to `/api/convert` should return the string `'invalid number'`.
  - An invalid number AND unit input such as `3/10/2kilogramameters` on `GET` request to `/api/convert` should return the string `'invalid number and unit'`.

### Project Writeup:

The first Free Code Camp: Quality Assurance Project is a simple Metric / Imperial Converter API. Users can:

- Request conversion of a unit by submitting the form on the app home page, or by sending a GET request to `/api/convert?input=<INPUT>` with the desired number and unit to convert (e.g. `/api/convert?input=10L`). Users can convert values between the following units:
  - "kg" ⇄ "lbs"
  - "km" ⇄ "mi"
  - "gal" ⇄ "L"

Two test suites have been written for the app:

- `tests/1_unit-tests.js` contains unit tests for the methods of the `ConvertHandler` class.
- `tests/2_functional-tests.js` contains functional tests of the application routes (`/` and `/api/convert`).

### Project Files:

- `server.js` - the main entry point of the application, an express web server handling the routes defined in the specification.

- `/routes/api.js` - contains the major API routes for the express web app.

- `/controllers/convertHandler.js` - contains the `ConvertHandler` class, with methods to aid conversion of a given input string to the appropriate new value and unit.

- `public/` - contains static files for the web app (stylesheet, logo, favicons etc), served by express using `express.static()`.

- `views/` - contains the single html page for the web app, `index.html`, which is served by express on `GET` requests to `/`.

- `tests/` - contains the test suites for the application.

### Usage:

Requires Node.js / NPM in order to install required packages. After downloading the repo, install required dependencies with:

`npm install`

A development mode (with auto server restart on file save), can be started with:

`npm run dev`

The application can then be viewed at `http://localhost:3000/` in the browser.

To start the server without auto-restart on file save:

`npm start`

# Metric-Imperial Converter Boilerplate

The initial boilerplate for this app can be found at https://github.com/freeCodeCamp/boilerplate-project-metricimpconverter/

Instructions for building the project can be found at https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter
