

module.exports = function(RED) {
    function SepaNode(config) {
        RED.nodes.createNode(this,config);
       
        this.initname = config.initname;
        this.initiban = config.initiban;
        this.initbic = config.initbic;
        var node = this;

        node.status({});

        node.on('input', function(msg) {
            const SepaXML = require('./sepaXML');
            var x = new SepaXML(config.messagetype);
            x.initName = (msg.hasOwnProperty("initname")) ? msg.initname : config.initname;
            x.initIBAN = (msg.hasOwnProperty("initiban")) ? msg.initiban : config.initiban;
            x.initBIC = (msg.hasOwnProperty("initbic")) ? msg.initbic : config.initbic;
            x.msgId = (msg.hasOwnProperty("msgid")) ? msg.msgid : config.msgid;
            x.batchBooking = (msg.hasOwnProperty("batchbooking")) ? msg.batchbooking : config.batchbooking;
            x.executiondate = (msg.hasOwnProperty("executiondate")) ? msg.executiondate : config.executiondate;
          
            msg.tx.forEach( (tx) => {
              x.newTx(tx.name, tx.iban, tx.amount, tx.purpose, tx.id);
            });

            msg.payload = x.getMsgAsJson();
            this.send(msg);
            node.status({fill:"blue",shape:"ring",text:x.txCount + ' transactions, ' + x.txSum + ' EUR'});
        });
    }
    RED.nodes.registerType("sepa",SepaNode);
}
