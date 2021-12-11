const sepaSCT = require('../lib/sepaSCT');
//const assert = require('assert').strict;
const should = require("should");
const helper = require("node-red-node-test-helper");
const sctNode = require("../nodes/sepa-sct.js");

helper.init(require.resolve('node-red'));

describe('sepa-sct node ...', function () {

  beforeEach(function (done) {
      helper.startServer(done);
  });

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "sepa-sct", name: "sepa-sct" }];
    helper.load(sctNode, flow, function () {
      var n1 = helper.getNode("n1");
      try {
        n1.should.have.property('name', 'sepa-sct');
        done();
      } catch(err) {
        done(err);
      }
    });
  });


});