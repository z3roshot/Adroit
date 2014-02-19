'use strict';

var messageQueue = require('node-rmq');

module.exports = {
	queueCommand: function(c) {
		messageQueue.publish(c.commandName, c);
	}
};