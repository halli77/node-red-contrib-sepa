

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
            
            //var x = new SepaSDD('initName', 'DE00123456781234567890', 'MARKDEFFXXX', 'DE66ZZZ00000704165', 'CORE', 'RCUR');

            try {
              let name = (msg.hasOwnProperty("initname")) ? msg.initname : config.initname;
              let iban = (msg.hasOwnProperty("initiban")) ? msg.initiban : config.initiban;
              let bic =  (msg.hasOwnProperty("initbic")) ? msg.initbic : config.initbic;
              let creditorid = (msg.hasOwnProperty("creditorid")) ? msg.creditorid : config.creditorid;
              let localinstrument = (msg.hasOwnProperty("localinstrument")) ? msg.localinstrument : config.localinstrument;
              let sequencetype = (msg.hasOwnProperty("sequencetype")) ? msg.sequencetype : config.sequencetype;
              var x = new SepaSDD(name, iban, bic, creditorid, localinstrument, sequencetype);

              // x.messagetype = config.messagetype;
              x.msgId = (msg.hasOwnProperty("msgid")) ? msg.msgid : config.msgid;
              x.batchBooking = (msg.hasOwnProperty("batchbooking")) ? msg.batchbooking : config.batchbooking;
              x.executiondate = (msg.hasOwnProperty("executiondate")) ? msg.executiondate : config.executiondate;

              //x.newTx("Creditor 2", "DE00123456781234567890", 2.22, 'purpose 2', 'mref2', '2021-02-02', 'id 2');

              msg.tx.forEach( tx => {
                try {
                  x.newTx(tx.name, tx.iban, tx.amount, tx.purpose, tx.mdtid, tx.mdtdate, tx.id);
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
    RED.nodes.registerType("sepa-sdd",SepaSddNode);
}
