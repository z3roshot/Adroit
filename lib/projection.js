'use strict';

var q = require('q');



var riak = require('./riak').getRiakClient();


exports.createUI = function(viewName, viewId, data){
	var deferred = q.defer();

	riak.save(viewName, viewId, data, null, function(err){
		if(err){
			deferred.reject(err);
		}
		else{
			deferred.resolve(true);
		}
	});

	return deferred.promise;
};

exports.updateUI = function(viewName, viewId, data){
	var deferred = q.defer();

	riak.save(viewName, viewId, data, null, function(err){
		if(err){
			deferred.reject(err);
		}
		else{
			deferred.resolve(true);
		}
	});

	return deferred.promise;
};

exports.loadUI = function(viewName, viewId){
	var defer = q.defer();

	riak.get(viewName, viewId, null, function(err, ui){
		if(err){
			defer.reject(err);
		}
		else{
			defer.resolve(ui);
		}
	});

	return defer.promise;
};

