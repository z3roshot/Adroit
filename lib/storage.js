'use strict';

var messageQueue = require('node-rmq'),
	async = require('async'),
	eventStore = require('./eventstore'),
	q = require('q');

exports.saveAndPublishEvent = function saveAndPublishEvent(data, stream){
	var deferred = q.defer();

	if(!stream){
		stream = eventStore.getEventStream(data[data.aggregateField]);
	}

	async.waterfall([
		function(callback){
			saveEvent(stream, data, callback);
			callback(null);
		},
		function(callback){
			publish(data, callback);
			callback(null);
		},
		function(callback){
			deferred.resolve(true);
			callback(null);
		}
	], function(err){
		if(err){
			deferred.reject(err);
		}
	});

	return deferred.promise;
};

function saveEvent(stream, data, callback){
	eventStore.saveEvent(stream, data)
	.then(
	function(){
		callback(null);
	},
	function(err){
		callback(err);
	});
}

function publish(data, callback){
	messageQueue.publish(data.eventName, data, function(err){
		callback(err);
	});
}