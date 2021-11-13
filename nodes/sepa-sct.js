

module.exports = function(RED) {
    function SepaNode(config) {
        RED.nodes.createNode(this,config);
       
        this.initname = config.initname;
        this.initiban = config.initiban;
        this.initbic = config.initbic;
        var node = this;

        node.status({});

        node.on('input', function(msg) {
            const SepaSCT = require('../lib/sepaSCT');
            

            try {
              let name = (msg.hasOwnProperty("initname")) ? msg.initname : config.initname;
              let iban = (msg.hasOwnProperty("initiban")) ? msg.initiban : config.initiban;
              let bic =  (msg.hasOwnProperty("initbic")) ? msg.initbic : config.initbic;

              var x = new SepaSCT(name, iban, bic);

              x.messagetype = config.messagetype;
              x.msgId = (msg.hasOwnProperty("msgid")) ? msg.msgid : config.msgid;
              x.batchBooking = (msg.hasOwnProperty("batchbooking")) ? msg.batchbooking : config.batchbooking;
              x.executiondate = (msg.hasOwnProperty("executiondate")) ? msg.executiondate : config.executiondate;


              msg.tx.forEach( tx => {
                try {
                  x.newTx(tx.name, tx.iban, tx.amount, tx.purpose, tx.id);
                } catch (err) {
                  node.error(err);
                  node.status({fill:"red",shape:"dot",text:err});
                }
                
              });

              msg.payload = x.getMsgAsXmlString();
              this.send(msg);
              node.status({fill:"blue",shape:"ring",text:x.getTxCt() + ' transactions, ' + x.getTxSum() + ' EUR'});

            } catch (err) {
              node.error(err);
              node.status({fill:"red",shape:"dot",text:err});
            }           
            
        });
    }
    RED.nodes.registerType("sepa-sct",SepaSctNode);
}
