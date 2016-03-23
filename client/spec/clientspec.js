var {Request, Collection} = require('../request');

describe('Requests', function() {
    it('creates a request object', function() {
        var req = new Request('http://localhost', function() {});
    });
});
