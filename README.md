# node-red-contrib-thingspeak42
A multi-field ThingSpeak node for Node-Red

You can find source code and more information here:

- GitHub:  https://github.com/clough42/node-red-contrib-thingspeak42
- NpmJS:  https://www.npmjs.com/package/node-red-contrib-thingspeak42
- Node-Red:  http://flows.nodered.org/node/node-red-contrib-thingspeak42

ThingSpeak channels can be configured with multiple fields, but often
data sources (like MQTT) only send one property per message.  This causes
issues when trying to populate ThingSpeak for two reasons: the data ends
up being sparse, with empty field values in most records, and it's also easy to violate
ThingSpeak's 15-second rate limit for channel updates.

This node solves both of these problems.

When data arrives, it is stored for a configurable period of time and then
posted all at once.  This allows you to use data sources
that post one property at a time with multi-field ThingSpeak channels.
This is especially useful with devices that use the
[Homie convention](https://github.com/marvinroger/homie), which posts each property as a separate message.

## Settings

- `Name` - The name to display for this node.  Leave blank to use the default.
- `Delay` - The delay before posting data, in seconds.  When the first matching
message arrives, the timer is started.  As subsequent messages arrive and are matched,
the data is stored.  When the time expires, all of the stored data is posted to
ThingSpeak and the stored data is cleared.  The next matching topic will start the
timer again.
- `Topic 1` - The incoming message topic for channel Field 1.  When a message
with this topic arrives, the value of the payload is stored and the timer is started.
When the timer expires, this stored value is posted as Field 1.  If another message
with this topic arrives before the timer expires, the stored value will be
overwritten and the new value will be sent when the timer expires instead.  Subsequent
messages do not reset the timer.  If you do not wish to publish data for Field 1,
leave this configuration item blank.
- `Topic 2` - Same as above, except for channel Field 2.
- `Topic 3` - Same as above, except for channel Field 3.
- `Topic 4` - Same as above, except for channel Field 4.
- `Topic 5` - Same as above, except for channel Field 5.
- `Topic 6` - Same as above, except for channel Field 6.
- `Topic 7` - Same as above, except for channel Field 7.
- `Topic 8` - Same as above, except for channel Field 8.
- `API URL` - The URL of the ThingSpeak server.  If you are using the official
hosted site, you can use the default:  https://thingspeak.com
- `API Key` - This is the Write API Key for your ThingSpeak channel.  You can
obtain it from the web site.  (Required)

## Error Handling

All errors posting data to ThingSpeak are caught and posted to the
Node-Red error handler, so you can add an error handler to your flow to
handle them.

## Logging

The node logs when it matches a topic, stores a value and ultimately
posts the data to ThingSpeak.  Please note that the API key is removed
from the URL and replaced with "XXXXXXXXXX" in the log messages to
avoid leaking sensitive data.  The real API key is used for the actual
ThingSpeak transaction.

## Status

While it is running, the node displays its status:

- `ready` - The node is waiting for data messages to arrive.
- `data queued, waiting...` - A message with a matching topic has arrived, the
data is stored and the node is waiting for the timeout to expire before
posting it to ThingSpeak.
- `uploading data...` - The data is currently being uploaded to ThingSpeak.
If everything is working, this message is displayed only briefly and
may not be visible.