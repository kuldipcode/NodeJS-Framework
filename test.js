const test = require('node:test');
const assert = require('node:assert').strict;
test('asynchronous passing test', async (t) => {
    // This test passes because the Promise returned by the async
    // function is settled and not rejected.
    assert.strictEqual(1, 1);
  });