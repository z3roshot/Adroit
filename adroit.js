'use strict';

var command = require('./lib/command'),
	eventstore = require('./lib/eventstore'),
	projection = require('./lib/projection'),
	storage = require('./lib/storage');

var q = require('q'),
	uuid = require('node-uuid');

/**
 * Entry point for Adroit
 * To specify redis or riak data pass in as config object
 * config.redisConfig = { ... }
 * config.riakConfig = { ... }
 * @param config
 */

exports.adroit = function(config){
	require('./lib/redis').init(config.redisConfig);
	require('./lib/riak').init(config.riakConfig);
};

exports.queueCommand = command.queueCommand;

exports.saveAndPublishEvent = storage.saveAndPublishEvent;

exports.loadUI = projection.loadUI;
exports.createUI = projection.createUI;
exports.updateUI = projection.updateUI;

exports.loadAggregate = loadAggregate;

function loadAggregate(aggregateId, loadFunc){
	var deferred = q.deferred();

	eventstore.getEventStream(aggregateId)
	.then(function(stream){
		var aggregate = loadFunc(stream.events);
		aggregate.stream = stream;
		deferred.resolve(aggregate);
	})
	.then(function(err){
		deferred.reject(err);
	});

	return deferred.promise;
}

exports.newId = function(){
	return uuid.v4();
};