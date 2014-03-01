'use strict';

var command = require('./lib/command'),
	eventstore = require('./lib/eventstore'),
	projection = require('./lib/projection'),
	storage = require('./lib/storage'),
	queue = require('./lib/queue'),
	aggregateLoader = require('./lib/aggregateloader');

var q = require('q'),
	uuid = require('node-uuid'),
	_ = require('lodash');

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
exports.loadUI = function loadUI(viewName, viewId){
	var deferred = q.defer();
	projection.exists(viewName, viewId)
	.then(function(result){
		if(result){
			projection.loadUI(viewName, viewId)
			.then(function(data){
				deferred.resolve(data);
			},
			function(err){
				deferred.reject(err);
			});
		}
		else{
			deferred.resolve({});
		}


	});

	return deferred.promise;
}

exports.createUI = projection.createUI;
exports.updateUI = projection.updateUI;

exports.subscribe = function(channel, callback, errCallback){
	errCallback = errCallback || _.noop;


	queue.subscribe(channel, callback, errCallback);
}

exports.loadAggregate = function loadAggregate(aggregateId, loadFunc){
	if(!_.isFunction(loadFunc)){
		loadFunc = getDefaultLoadFunc(loadFunc)
	}

	aggregateLoader.loadAggregate(aggregateId, loadFunc);
}

exports.newId = function(){
	return uuid.v4();
};

function getDefaultLoadFunc(map){
	return function defaultLoadFromHistory(id, events){
		return _.reduce(events, function(aggregate, event){
			return map[event.payload.eventName](aggregate, event.payload);
		}, { id: id });
	};
}