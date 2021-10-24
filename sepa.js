module.exports = function(RED) {
    function SepaNode(config) {
        RED.nodes.createNode(this,config);
        this.initname = config.initname;
        this.initiban = config.initiban;
        var node = this;

        node.status({fill:"red",shape:"ring",text:"not initialized"});

        node.on('input', function(msg) {
            msg.info = "mein erstes Modul :-)";
            msg.initname = node.initname;
            node.send(msg);
        });
    }
    RED.nodes.registerType("sepa",SepaNode);
}
