'use strict';

var eventstore = require('./eventstore'),
	q = require('q');

exports.loadAggregate = function loadAggregate(aggregateId, loadFunc){
	var deferred = q.defer();

	eventstore.getEventStream(aggregateId)
	.then(function(stream){
		var aggregate = loadFunc(aggregateId, stream.events);
		aggregate.stream = stream;
		deferred.resolve(aggregate);
	})
	.then(function(err){
		deferred.reject(err);
	});

	return deferred.promise;
}