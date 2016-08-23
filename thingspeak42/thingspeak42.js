var https = require('https');

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
        node.endpoint = config.endpoint;

        node.timeout = null;

        clearStoredValues();

        function clearStoredValues() {
            node.values = [ null, null, null, null, null, null, null, null ];
        };

        function storeValue(index, value) {
            node.log("Storing value for field " + (i+1));
            node.values[index] = value;
        };

        function getValue(index) {
            return node.values[i];
        }

        function startTimer() {
            if( node.timeout == null ) {
                node.log("Starting " + node.delay + " second timer");
                var delayMs = 1000 * node.delay;
                node.timeout = setTimeout(publishData, delayMs);
            }
        }

        function stopTimer() {
            if( node.timeout != null ) {
                clearTimeout(node.timeout);
                node.timeout = null;
            }
        }

        function publishData() {
            var url = buildThingSpeakURL();
            clearStoredValues();
            stopTimer();

            node.log("Posting to ThingSpeak: " + url.replace(node.credentials.apiKey, "XXXXXXXXXX"));
            https.get(url, function(response) {
                    if(response.statusCode == 200){
                        node.log("Posted to ThingSpeak");
                    } else {
                        node.error("Error posting to ThingSpeak: status code " + response.statusCode);
                    }
                }
            ).on('error', function(e) {
                node.error("Error posting to ThingSpeak: " + e);
            });
        }

        function buildThingSpeakURL() {
            var url = node.endpoint + "/update?api_key=" + node.credentials.apiKey;
            for( i=0; i < node.topics.length; i++ ) {
                var val = getValue(i);
                if (val != null) {
                    url = url + "&field" + (i + 1) + "=" + val;
                }
            }
            return url;
        }

        this.on('input', function(msg) {
            for(i=0; i < node.topics.length; i++) {
                if( msg.topic == node.topics[i] ) {
                    storeValue(i, msg.payload);
                    startTimer();
                }
            }
        });

        this.on('close', function() {
            stopTimer();
        });
    };

    RED.nodes.registerType("thingspeak42",ThingSpeak42Node, {
        credentials: {
            apiKey: {type: "password"}
        }
    });
};