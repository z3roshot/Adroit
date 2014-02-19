'use strict';

var redis = require('./redis'),
	eventstore = require('eventstore'),
	esRedis = require('eventstore.redis'),
	q = require('q');

var redisClient = redis.getRedisClient({});

var publisher = {
	evt: redis.createClient(),
	publish: function(evt) {
		var msg = JSON.stringify(evt, null, 4);

		publisher.evt.publish('events', msg);
	}
};

var es = eventstore.createStore();

es.configure(function(){
	es.use(redisClient);
	es.use(publisher);
	es.use(esRedis.createStorage());
}).start();

exports.getEventStream = getEventStream;

exports.saveEvent = saveEvent;

function getEventStream(aggregateId) {
	var defer = q.defer();

	es.getEventStream(aggregateId, function(error, stream){
		if(error){
			defer.reject(error);
		}
		else{
			defer.resolve(stream);
		}
	});

	return defer.promise;
}

function saveEvent(stream, newEvent){
	var defer = q.defer();

	stream.addEvent(newEvent);
	stream.commit(function(err, stream){
		if(err){
			defer.reject(err);
		}
		else{
			defer.resolve(stream);
		}
	});

	return defer.promise;
}