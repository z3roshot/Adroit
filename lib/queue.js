'use strict';

var queue = require('node-rmq');

exports.subscribe = subscribe;

function subscribe(channel, callback, errorCallback){
	queue.subscribe(channel, callback, function(err){
		errorCallback(err);
	});
}