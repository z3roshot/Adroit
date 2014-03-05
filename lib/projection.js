'use strict';

var q = require('q');

var riak = require('./riak');

exports.createUI = function creatUI(viewName, viewId, data){
	var deferred = q.defer();
	var riakClient = riak.getRiakClient();

	data.id = viewId;

	riakClient.save(viewName, viewId, data, null, function(err){
		if(err){
			deferred.reject(err);
		}
		else{
			deferred.resolve(true);
		}
	});

	return deferred.promise;
};

exports.updateUI = function updateUI(viewName, viewId, data){
	var deferred = q.defer();
	var riakClient = riak.getRiakClient();

	riakClient.save(viewName, viewId, data, null, function(err){
		if(err){
			deferred.reject(err);
		}
		else{
			deferred.resolve(true);
		}
	});

	return deferred.promise;
};

exports.loadUI = function loadUI(viewName, viewId){
	var deferred = q.defer();
	var riakClient = riak.getRiakClient();

	riakClient.get(viewName, viewId, null, function(err, ui){
		if(err){
			deferred.reject(err);
		}
		else{
			deferred.resolve(ui);
		}
	});

	return deferred.promise;
};

exports.exists = function exists(viewName, viewId){
	var deferred = q.defer();
	var riakClient = riak.getRiakClient();

	riakClient.exists(viewName, viewId, null, function(err, result){
		if(err){
			deferred.reject(err);
		}
		else{
			deferred.resolve(result);
		}
	});

	return deferred.promise;
};