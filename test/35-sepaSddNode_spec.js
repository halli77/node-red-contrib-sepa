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




    it('should create payload by passing attributes in msg object', function (done) {
        const flow = [
            { id: "n1", type: "sepa-sdd", name: "my sepa-sdd node", wires:[["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(sddNode, flow, function () {
            const n1 = helper.getNode("n1");
            const n2 = helper.getNode("n2");
            n2.on("input", function (msg) {
                try {
                    const expectedhash = "AD796269EAA616CCB1E4804A3C0339BA".toLowerCase();
                    msg.should.have.property('payload_md5', expectedhash);
                    msg.should.have.property('topic', 'topicFromMessage');
                    done();
                } catch(err) {
                    done(err);
                }
            });

            const inputMsgObj = {
                topic: "topicFromMessage",
                messagetype: "pain.008.001.02",
                msgid: "my msg id",
                initname: "John Doe - Creditor",
                initiban: "DE12500105170648489890",
                initbic: "INGDDEFF",
                creditorid: "DE98ZZZ09999999999",
                localinstrument: "CORE",
                sequencetype: "RCUR",
                batchbooking: true,
                executiondate: "2021-12-15",
                createddatetime: "2021-12-05T09:04:35.586Z",
                tx:[
                        {name: "Debitor 1", iban: "AT483200000012345864", amount: 1.11, purpose: "purpose 1", mdtid: "mandate 1", mdtdate: "2021-01-01", id: "e2eid 1"},
                        {name: "Debitor 2", iban: "CH5604835012345678009", amount: 2.22, purpose: "purpose 2", mdtid: "mandate 2", mdtdate: "2021-02-02", id: "e2eid 2"}
                    ]
            };
            n1.receive(inputMsgObj);
        });        
    });





    it('should create payload by passing attributes in node config', function (done) {
        const flow = [
            {   id: "n1", 
                type: "sepa-sdd", 
                name: "my sepa sdd node", 
                topic: "topicFromNode",
                initname: "John Doe - Creditor",
                initiban: "DE12500105170648489890",
                initbic: "INGDDEFF",
                creditorid: "DE98ZZZ09999999999",
                localinstrument: "CORE",
                sequencetype: "RCUR",
                messagetype: "pain.008.001.02",
                msgid: "my msg id",
                batchbooking: true,
                executiondate: "2021-12-15",
                wires:[["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(sddNode, flow, function () {
            const n1 = helper.getNode("n1");
            const n2 = helper.getNode("n2");
            n2.on("input", function (msg) {
                try {
                    const expectedhash = "AD796269EAA616CCB1E4804A3C0339BA".toLowerCase();
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
                        {name: "Debitor 1", iban: "AT483200000012345864", amount: 1.11, purpose: "purpose 1", mdtid: "mandate 1", mdtdate: "2021-01-01", id: "e2eid 1"},
                        {name: "Debitor 2", iban: "CH5604835012345678009", amount: 2.22, purpose: "purpose 2", mdtid: "mandate 2", mdtdate: "2021-02-02", id: "e2eid 2"}
                    ]
            };
            n1.receive(inputMsgObj);
        });
        
        
    });





    it('should create payload by overwriting node config attributes by msg object', function (done) {
        const flow = [
            {   id: "n1", 
                type: "sepa-sdd", 
                name: "my sepa sdd node", 
                topic: "topicFromNode",
                initname: "John Doe - Creditor - node",
                initiban: "DE12500105170648489890 - node",
                initbic: "INGDDEFF - node",
                creditorid: "DE98ZZZ09999999999 - node",
                localinstrument: "CORE - node",
                sequencetype: "RCUR - node",
                messagetype: "pain.008.001.02 - node",
                msgid: "my msg id - node",
                batchbooking: false,
                executiondate: "2021-12-01",
                wires:[["n2"]] },
            { id: "n2", type: "helper" }
        ];

        helper.load(sddNode, flow, function () {
            const n1 = helper.getNode("n1");
            const n2 = helper.getNode("n2");
            n2.on("input", function (msg) {
                try {
                    const expectedhash = "AD796269EAA616CCB1E4804A3C0339BA".toLowerCase();
                    msg.should.have.property('payload_md5', expectedhash);
                    msg.should.have.property('topic', 'topicFromMessage');
                    done();
                } catch(err) {
                    done(err);
                }
            });
         
            const inputMsgObj = {
                topic: "topicFromMessage",
                messagetype: "pain.008.001.02",
                msgid: "my msg id",
                initname: "John Doe - Creditor",
                initiban: "DE12500105170648489890",
                initbic: "INGDDEFF",
                creditorid: "DE98ZZZ09999999999",
                localinstrument: "CORE",
                sequencetype: "RCUR",
                batchbooking: true,
                executiondate: "2021-12-15",
                createddatetime: "2021-12-05T09:04:35.586Z",
                tx:[
                        {name: "Debitor 1", iban: "AT483200000012345864", amount: 1.11, purpose: "purpose 1", mdtid: "mandate 1", mdtdate: "2021-01-01", id: "e2eid 1"},
                        {name: "Debitor 2", iban: "CH5604835012345678009", amount: 2.22, purpose: "purpose 2", mdtid: "mandate 2", mdtdate: "2021-02-02", id: "e2eid 2"}
                    ]
            };
            n1.receive(inputMsgObj);
        });
        
        
    });


});

