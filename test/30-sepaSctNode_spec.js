//const sepaSCT = require('../lib/sepaSCT');
// const should = require("should");
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
        const flow = [{ id: "n1", type: "sepa-sct", name: "my sepa sct node" }];
        helper.load(sctNode, flow, function () {
        const n1 = helper.getNode("n1");
        try {
            n1.should.have.property('name', 'my sepa sct node');
            done();
        } catch(err) {
            done(err);
        }
        });
    });



    it('should accept full set of attributes from msg', function (done) {
        const flow = [
            { id: "n1", type: "sepa-sct", name: "my sepa sct node", wires:[["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(sctNode, flow, function () {
            const n1 = helper.getNode("n1");
            const n2 = helper.getNode("n2");
            n2.on("input", function (msg) {
                try {
                    msg.should.have.property('numberOfTx', 2);
                    msg.should.have.property('totalSumOfTx', 3.57);
                    done();
                } catch(err) {
                    done(err);
                }
            });

            const inputMsgObj = {
                topic: "topicFromMessage",
                messagetype: "pain.001.001.03",
                initname: "John Doe - Debitor",
                initiban: "DE12500105170648489890",
                initbic: "INGDDEFF",
                batchbooking: true,
                executiondate: "2021-12-06",
                tx:[
                        {name: "Creditor 1", iban: "AT483200000012345864", amount: 1.23, purpose: "sct1", id: "e2e-id 1"},
                        {name: "Creditor 2", iban: "CH5604835012345678009", amount: 2.34, purpose: "sct2", id: "e2e-id 2"}
                    ]
            };
            n1.receive(inputMsgObj);
        });        
    });



    it('should create xml-string in msg.payload with given hash value', function (done) {
        const flow = [
            { id: "n1", type: "sepa-sct", name: "my sepa sct node", wires:[["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(sctNode, flow, function () {
            const n1 = helper.getNode("n1");
            const n2 = helper.getNode("n2");
            n2.on("input", function (msg) {
                try {
                    const expectedhash = "955C7FF478664E68FBECEAB99387E3C9".toLowerCase();
                    msg.should.have.property('payload_md5', expectedhash);
                    done();
                } catch(err) {
                    done(err);
                }
            });

            const inputMsgObj = {
                topic: "topicFromMessage",
                messagetype: "pain.001.001.03",
                msgid: "my msg id",
                initname: "John Doe - Debitor",
                initiban: "DE12500105170648489890",
                initbic: "INGDDEFF",
                batchbooking: true,
                executiondate: "2021-12-15",
                createddatetime: "2021-12-05T09:04:35.586Z",
                tx:[
                        {name: "Creditor 1", iban: "AT483200000012345864", amount: 1.11, purpose: "purpose 1", id: "id 1"},
                        {name: "Creditor 2", iban: "CH5604835012345678009", amount: 2.22, purpose: "purpose 2", id: "id 2"}
                    ]
            };
            n1.receive(inputMsgObj);
        });
        
        
    });


});


