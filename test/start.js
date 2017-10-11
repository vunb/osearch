/**
 * Import specs
 * @private
 */
const path = require('path');
const dir = '../test/specs/';
[
  'osearch',
].forEach((script) => {
  require(path.join(dir, script));
});