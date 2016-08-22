module.exports = function(RED) {
    function ThingSpeak42Node(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        node.delay = config.delay;
        node.topics = [
            config.topic1,
            config.topic2,
            config.topic3,
            config.topic4,
            config.topic5,
            config.topic6,
            config.topic7,
            config.topic8
            ];
        node.channel = config.channel;
        node.apiKey = config.apiKey;

        clearStoredValues();

        function clearStoredValues() {
            node.values = [ null, null, null, null, null, null, null, null ];
        };

        function storeValue(index, value) {
            node.values[index] = value;
        };

        function getValue(index) {
            return node.values[i];
        }

        this.on('input', function(msg) {
            for(i=0; i < node.topics.length; i++) {
                if( msg.topic == node.topics[i] ) {
                    this.log("Found topic " + i);
                    storeValue(i, msg.payload);
                }
            }

            node.log("Stored values: ");
            for(i=0; i < node.topics.length; i++) {
                node.log("  " + i + ": " + getValue(i));
            }
        });

        this.on('close', function() {

        });
    };

    RED.nodes.registerType("thingspeak42",ThingSpeak42Node, {
        credentials: {
            channel: {type: "text"},
            apiKey: {type: "password"}
        }
    });
};