# Adroit

### Installation
```bash
npm install adroit
```

### Before you begin
This library suggests an architecture based on CQRS technique of writing software with a focus on Domain Driven Design (DDD). If you are unfamiliar with these concepts, you should read about them before trying to use this library.

Currently Adroit uses [Riak](http://basho.com/riak/) to serve the read model and [Redis](http://redis.io/) for an event store as well as a message bus (using [node-rmq](https://github.com/z3roshot/node-rmq)).

## Usage

### Getting a reference to the Adroit object
```javascript
var adroit = require('adroit');
```

### Initialization
Note that if you do not initialize, adroit will assume you have riak and/or redis running with default settings on localhost.

Adroit uses [node-redis](https://github.com/mranney/node_redis) and [riak-js](https://github.com/mostlyserious/riak-js). Look at those projects if you want to see how they work.

```javascript
adroit.adroit({
  riakConfig: {
    host: 'host.of.riak.instance',
    port: 8098 // or whatever port you use
  },
  redisConfig: {
    host: 'host.of.redis.instance',
    port: 6379, // or whatever port you use
    options: {
      ...
    }
  }
});
```

### Command Queueing
```javascript
var data = {
  commandName: 'doThingsAndStuff',
  otherFields: goHere
};
adroit.queueCommand(data)
```

### Aggregate aka Aggregate Root
adroit.loadAggregate reconstitutes an aggregate via a promise. This aggregate will also have the stream object that was used to reconstitute it.

```javascript
adroit.loadAggregate(aggregateId, loadFunction)
.then(function(aggregate){
  var stream = aggregate.stream;
  ...
},
function(error){
  // Handle error here
});

```

Generally loadFunction will be defined in your aggregate object. The purpose of this function is to apply an event to your aggregate. The event stream that represents the state of your aggregate will be applied individually and the function will return your reconstituted aggregate.


### Committing an event
Once you've processed the commands and have generated one or more events that you'd like to save and publish to the message bus, you should commit your changes like this. You will need a reference to the stream object returned when you loaded the aggregate. This call returns a promise that resolves true or rejects with any error condition.

```javascript
adroit.commitEvent(stream, eventData)
.then(function(willBeTrue){
  // any post processing
},
function(error){
  // handle error
});
```

### Projection functions
These functions are intended to interact with the read model.

```javascript
adroit.loadUI(viewName, viewKey).
then(function(view){

},
function(error){

});

adroit.createUI(viewName, viewKey, data)
.then(function(willBeTrue){

},
function(error){

});

adroit.updateUI // same signature as createUI
```

### Subscriptions
Subscribing to messages on the message bus (commands, events). Channel can be "commands", "events", particular command or event names, or whatever you want. Parameter errorCallback is optional.

```javascript
adroit.subscribe(channel, callback, errorCallback);
```

### Generating IDs
As a convenience, Adroit will generate UUIDs for you if you decide ot use UUIDs for your application.

```javascript
var id = adroit.newId();
```

### License

Copyright (c) 2014 Christopher Gillis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
