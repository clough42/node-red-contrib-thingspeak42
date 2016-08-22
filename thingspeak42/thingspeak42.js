module.exports = function(RED) {
    function ThingSpeak42Node(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            //msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("thingspeak42",ThingSpeak42Node, {
        credentials: {
            channelNumber: {type: "text"},
            apiKey: {type: "password"}
        }
    });
};