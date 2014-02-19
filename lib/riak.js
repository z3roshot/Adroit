'use strict';

var riakjs = require('riak-js');

var port, host;

exports.init = function(config){
	port = config.port;
	host = config.host;
};

exports.getRiakClient = function(){
	if(port && host){
		return riakjs.getClient({host: host, port: port});
	}

	return riakjs.getClient({});
};