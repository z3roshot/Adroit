'use strict';

var redis = require('redis');

var port, host, options;

exports.init = function(config){
	config = config || {};
	port = config.port;
	host = config.host;
	options = config.options;
};

exports.getRedisClient = function(){
	return redis.createClient(port, host, options);
};