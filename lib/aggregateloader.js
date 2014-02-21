'use strict';

var eventstore = require('./eventstore');

exports.loadAggregate = function loadAggregate(aggregateId, loadFunc){
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