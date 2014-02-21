'use strict';

var command = require('./lib/command'),
	eventstore = require('./lib/eventstore'),
	projection = require('./lib/projection'),
	storage = require('./lib/storage'),
	queue = require('./lib/queue'),
	aggregateLoader = require('./lib/aggregateloader');

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

exports.commitEvent = storage.saveAndPublishEvent;

/**
 * Projection functions
 */
exports.loadUI = projection.loadUI;
exports.createUI = projection.createUI;
exports.updateUI = projection.updateUI;

exports.subscribe = queue.subscribe;

exports.loadAggregate = aggregateLoader.loadAggregate;

exports.newId = function(){
	return uuid.v4();
};