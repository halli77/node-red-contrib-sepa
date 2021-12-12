
module.exports = function(RED) {
    function SepaSddNode(config) {
        RED.nodes.createNode(this,config);
        
        this.name = config.name;
        this.topic = config.topic;
        this.initname = config.initname;
        this.initiban = config.initiban;
        this.initbic = config.initbic;
        this.creditorid = config.creditorid;
        this.messagetype = config.messagetype;
        this.messageid = config.messageid;
        this.batchbooking = config.batchbooking;
        this.executiondate = config.executiondate;
        this.sequencetype = config.sequencetype;

        var node = this;
        node.status({});

        node.on('input', function(msg) {
            const SepaSDD = require('../lib/sepaSDD');
        
            this.topic = (msg.hasOwnProperty("topic")) ? msg.topic : config.topic;
            this.initname = (msg.hasOwnProperty("initname")) ? msg.initname : config.initname;
            this.initiban = (msg.hasOwnProperty("initiban")) ? msg.initiban : config.initiban;
            this.initbic =  (msg.hasOwnProperty("initbic")) ? msg.initbic : config.initbic;
            this.messagetype = (msg.hasOwnProperty("messagetype")) ? msg.messagetype : config.messagetype;
            this.messageid = (msg.hasOwnProperty("messageid")) ? msg.messageid :config.messageid;
            this.batchbooking = (msg.hasOwnProperty("batchbooking")) ? msg.batchbooking : config.batchbooking;
            this.executiondate = (msg.hasOwnProperty("executiondate")) ? msg.executiondate : config.executiondate;
            this.createddatetime = (msg.hasOwnProperty("createddatetime")) ? msg.createddatetime : "";
            
            this.creditorid = (msg.hasOwnProperty("creditorid")) ? msg.creditorid : config.creditorid;
            this.localinstrument = (msg.hasOwnProperty("localinstrument")) ? msg.localinstrument : config.localinstrument;
            this.sequencetype = (msg.hasOwnProperty("sequencetype")) ? msg.sequencetype : config.sequencetype;




            try {
                var x = new SepaSDD(this.initname, 
                                    this.initiban, 
                                    this.initbic, 
                                    this.creditorid, 
                                    this.localinstrument, 
                                    this.sequencetype
                                    );

                x.messagetype = this.messagetype;
                x.batchBooking = this.batchbooking;

                if (this.messageid !== "") {
                    x.messageId = this.messageid;
                }
                                
                if (this.executiondate !== "") {
                    x.execDate = this.executiondate;
                }
                if (this.createddatetime !==  "") {
                    x.createdDateTime = this.createddatetime;
                } 
                
                
                msg.tx.forEach( tx => {
                    try {
                        x.newTx(tx.name, tx.iban, tx.amount, tx.purpose, tx.mdtid, tx.mdtdate, tx.id);
                    } catch (err) {
                        node.error(err);
                        node.status({fill:"red",shape:"dot",text:err});
                    }
                });

                msg.payload = x.getMsgAsXmlString();
                msg.payload_md5 = x.getMsgHash;
                msg.numberOfTx = x.getNumberOfTx;
                msg.totalSumOfTx = x.getTotalSumOfTx;

                msg.topic = this.topic;
                msg.name = this.name;
                
                this.send(msg);
                node.status({fill:"blue",shape:"ring",text:x.getNumberOfTx + ' transactions, ' + x.getTotalSumOfTx + ' EUR'});

            } catch (err) {
                node.error(err);
                node.status({fill:"red",shape:"dot",text:err});
            }           
            
        });
    }
    RED.nodes.registerType("sepa-sdd",SepaSddNode);
}
