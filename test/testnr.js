const sepaBASE = require('../lib/sepaBASE');
const sepaSCT = require('../lib/sepaSCT');

const assert = require('assert').strict;


var should = require("should");
var helper = require("node-red-node-test-helper");
var sctNode = require("../nodes/sepa-sct.js");

helper.init(require.resolve('node-red'));

describe('sepa-sct Node', function () {

  beforeEach(function (done) {
      helper.startServer(done);
  });

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "sepa-sct", name: "sepa-sct" }];
    helper.load(lowerNode, flow, function () {
      var n1 = helper.getNode("n1");
      try {
        n1.should.have.property('name', 'lower-case');
        done();
      } catch(err) {
        done(err);
      }
    });
  });


});