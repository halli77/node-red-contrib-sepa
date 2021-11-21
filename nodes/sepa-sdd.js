

module.exports = function(RED) {
    function SepaSddNode(config) {
        RED.nodes.createNode(this,config);
       
        this.initname = config.initname;
        this.initiban = config.initiban;
        this.initbic = config.initbic;
        this.creditorid = config.creditorid;
        this.sequencetype = config.sequencetype;
        var node = this;

        node.status({});

        node.on('input', function(msg) {
            const SepaSDD = require('../lib/sepaSDD');
            

            try {
              let name = (msg.hasOwnProperty("initname")) ? msg.initname : config.initname;
              let iban = (msg.hasOwnProperty("initiban")) ? msg.initiban : config.initiban;
              let bic =  (msg.hasOwnProperty("initbic")) ? msg.initbic : config.initbic;
              let creditorid = (msg.hasOwnProperty("creditorid")) ? msg.creditorid : config.creditorid;
              let sequencetype = (msg.hasOwnProperty("sequencetype")) ? msg.sequencetype : config.sequencetype;
              var x = new SepaSDD(name, iban, bic, creditorid, sequencetype);

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
    RED.nodes.registerType("sepa",SepaSddNode);
}
