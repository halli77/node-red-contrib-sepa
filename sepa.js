

class sepaXML {
  constructor(messagetype) {
    this.messagetype = messagetype;
    this.status = {fill:"red",shape:"ring",text:"class not initialized"};
  }

  public function getStatus() {
    return this.status;
  }

  public function getStream() {
      return "die Datei";
  }

}


var sepaxml = new sepaXML("blubb");




module.exports = function(RED) {
    function SepaNode(config) {
        RED.nodes.createNode(this,config);
        this.initname = config.initname;
        this.initiban = config.initiban;
        var node = this;

        node.status({fill:"red",shape:"ring",text:"not initialized"});

        node.on('input', function(msg) {


            msg.info = "mein erstes Modul :-)"
            msg.stream = sepaxml.getStream();
            msg.initname = node.initname;
            node.status = sepaxml.getStatus();
            node.send(msg);
        });
    }
    RED.nodes.registerType("sepa",SepaNode);
}
