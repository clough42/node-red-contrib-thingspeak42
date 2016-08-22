# node-red-contrib-thingspeak42
A ThingSpeak node for Node-Red

This node posts data to a multi-field ThingSpeak channel.  It can post data immediately to a single field or
it can aggregate multiple messages over a period of time and post them all at once to multiple fields in the
channel.

This is particularly useful if your sensor devices use a framework like Homie that sends multiple messages
for different properties of the same sensor node.
