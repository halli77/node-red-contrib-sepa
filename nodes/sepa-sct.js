
module.exports = function(RED) {
    function SepaSctNode(config) {
        RED.nodes.createNode(this,config);

        this.name = config.name;
        this.topic = config.topic;
        this.initname = config.initname;
        this.initiban = config.initiban;
        this.initbic = config.initbic;
        this.messagetype = config.messagetype;
        this.msgid = config.msgid;
        this.batchbooking = config.batchbooking;
        this.executiondate = config.executiondate;



        var node = this;

        node.status({});

        node.on('input', function(msg) {
            const SepaSCT = require('../lib/sepaSCT');

            this.topic = (msg.hasOwnProperty("topic")) ? msg.topic : config.topic;
            this.initname = (msg.hasOwnProperty("initname")) ? msg.initname : config.initname;
            this.initiban = (msg.hasOwnProperty("initiban")) ? msg.initiban : config.initiban;
            this.initbic =  (msg.hasOwnProperty("initbic")) ? msg.initbic : config.initbic;
            this.messagetype = (msg.hasOwnProperty("messagetype")) ? msg.messagetype : config.messagetype;
            this.msgid = (msg.hasOwnProperty("msgid")) ? msg.msgid :config.msgid;
            this.batchbooking = (msg.hasOwnProperty("batchbooking")) ? msg.batchbooking : config.batchbooking;
            this.executiondate = (msg.hasOwnProperty("executiondate")) ? msg.executiondate : config.executiondate;
            this.createddatetime = (msg.hasOwnProperty("createddatetime")) ? msg.createddatetime : "";


            try {
                var x = new SepaSCT(this.initname, this.initiban, this.initbic);

                x.messagetype = this.messagetype;
                if (this.msgid !== "") {
                    x.messageId = this.msgid;
                }
                
                x.batchBooking = this.batchbooking;
                if (this.executiondate !== "") {
                    x.execDate = this.executiondate;
                }
                if (this.createddatetime !==  "") {
                    x.createdDateTime = this.createddatetime;
                } 

                msg.tx.forEach( tx => {
                    try {
                    x.newTx(tx.name, tx.iban, tx.amount, tx.purpose, tx.id);
                    } catch (err) {
                    node.error(err);
                    node.status({fill:"red",shape:"dot",text:err});
                    }
                    
                });

                msg.payload = x.getMsgAsXmlString();
                msg.numberOfTx = x.getNumberOfTx;
                msg.totalSumOfTx = x.getTotalSumOfTx;
                msg.payload_md5 = x.getMsgHash;
                
                this.send(msg);
                node.status({fill:"blue",shape:"ring",text:x.getNumberOfTx + ' transactions, ' + x.getTotalSumOfTx + ' EUR'});

                } catch (err) {
                    node.error(err);
                    node.status({fill:"red",shape:"dot",text:err});
                }           
            
        });
    }
    RED.nodes.registerType("sepa-sct",SepaSctNode);
}
