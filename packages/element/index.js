if (process.env.NODE_ENV == 'production') {
  module.exports = require('./dist/element.cjs.prod.js');
} else {
  module.exports = require('./dist/element.cjs.js');
}
