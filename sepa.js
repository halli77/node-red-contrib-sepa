

class SEPA {
  constructor(messagetype) {
    this.messagetype = messagetype;
    this.status = {fill:"red",shape:"ring",text:"class not initialized"};
  }

  public getStatus() {
    return this.status;
  }

  public function getStream() {
      return "die Datei";
  }

}





module.exports = function(RED) {
    function SepaNode(config) {
        RED.nodes.createNode(this,config);
        this.initname = config.initname;
        this.initiban = config.initiban;
        var node = this;

        node.status({fill:"red",shape:"ring",text:"not initialized"});

        node.on('input', function(msg) {
            var sepa = new SEPA("blubb");

            msg.info = "mein erstes Modul :-)"
            msg.stream = sepa.getStream();
            msg.initname = node.initname;
            node.status = sepa.getStatus();
            node.send(msg);
        });
    }
    RED.nodes.registerType("sepa",SepaNode);
}
