// const sepaSDD = require('../lib/sepaSDD');
// const should = require("should");
const helper = require("node-red-node-test-helper");
const sddNode = require("../nodes/sepa-sdd.js");

helper.init(require.resolve('node-red'));

describe('sepa-sdd node ...', function () {

  beforeEach(function (done) {
      helper.startServer(done);
  });

  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "sepa-sdd", name: "my sepa sdd node" }];
    helper.load(sddNode, flow, function () {
      var n1 = helper.getNode("n1");
      try {
        n1.should.have.property('name', 'my sepa sdd node');
        done();
      } catch(err) {
        done(err);
      }
    });
  });


});