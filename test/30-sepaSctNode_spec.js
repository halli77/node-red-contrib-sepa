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





    it('should create payload by passing attributes in msg object', function (done) {
        const flow = [
            { id: "n1", type: "sepa-sct", name: "my sepa-sct node", wires:[["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(sctNode, flow, function () {
            const n1 = helper.getNode("n1");
            const n2 = helper.getNode("n2");
            n2.on("input", function (msg) {
                try {
                    const expectedhash = "955C7FF478664E68FBECEAB99387E3C9".toLowerCase();
                    msg.should.have.property('payload_md5', expectedhash);
                    msg.should.have.property('topic', 'topicFromMessage');
                    done();
                } catch(err) {
                    done(err);
                }
            });

            const inputMsgObj = {
                    topic: "topicFromMessage",
                    messagetype: "pain.001.001.03",
                    messageid: "my msg id",
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




    it('should create payload by passing attributes in node config', function (done) {
        const flow = [
            {   id: "n1", 
                type: "sepa-sct", 
                name: "my sepa sct node", 
                topic: "topicFromNode",
                initname: "John Doe - Debitor",
                initiban: "DE12500105170648489890",
                initbic: "INGDDEFF",
                messagetype: "pain.001.001.03",
                messageid: "my msg id",
                batchbooking: true,
                executiondate: "2021-12-15",
                wires:[["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(sctNode, flow, function () {
            const n1 = helper.getNode("n1");
            const n2 = helper.getNode("n2");
            n2.on("input", function (msg) {
                try {
                    const expectedhash = "955C7FF478664E68FBECEAB99387E3C9".toLowerCase();
                    msg.should.have.property('payload_md5', expectedhash);
                    msg.should.have.property('topic', 'topicFromNode');
                    done();
                } catch(err) {
                    done(err);
                }
            });

            const inputMsgObj = {
                createddatetime: "2021-12-05T09:04:35.586Z",
                tx:[
                        {name: "Creditor 1", iban: "AT483200000012345864", amount: 1.11, purpose: "purpose 1", id: "id 1"},
                        {name: "Creditor 2", iban: "CH5604835012345678009", amount: 2.22, purpose: "purpose 2", id: "id 2"}
                    ]
            };
            n1.receive(inputMsgObj);
        });      
    });





    it('should create payload by overwriting node config attributes by msg object', function (done) {
        const flow = [
            {   id: "n1", 
                type: "sepa-sct", 
                name: "my sepa sct node", 
                topic: "topicFromNode",
                initname: "John Doe - Debitor - node",
                initiban: "DE12500105170648489890 - node",
                initbic: "INGDDEFF - node",
                messagetype: "pain.001.001.03 - node",
                messageid: "my msg id - node",
                batchbooking: false,
                executiondate: "2021-12-01",
                wires:[["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(sctNode, flow, function () {
            const n1 = helper.getNode("n1");
            const n2 = helper.getNode("n2");
            n2.on("input", function (msg) {
                try {
                    const expectedhash = "955C7FF478664E68FBECEAB99387E3C9".toLowerCase();
                    msg.should.have.property('payload_md5', expectedhash);
                    msg.should.have.property('topic', 'topicFromMessage');
                    done();
                } catch(err) {
                    done(err);
                }
            });

            const inputMsgObj = {
                topic: "topicFromMessage",
                messagetype: "pain.001.001.03",
                messageid: "my msg id",
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

