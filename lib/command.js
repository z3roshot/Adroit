'use strict';

var messageQueue = require('node-rmq');

module.exports = {
	queueCommand: function(c) {
		var deferred = q.defer();

		messageQueue.publish(c.commandName, c, function(err){
			if(err){
				deferred.reject(err);
			}
			else{
				deferred.resolve(true);
			}
		});

		return deferred.promise;
	}
};