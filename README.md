# Adroit

### Installation
```bash
npm install adroit
```

### Before you begin
This library suggests an architecture based on CQRS technique of writing software with a focus on Domain Driven Design (DDD). If you are unfamiliar with these concepts, you should read about them before trying to use this library.

## Usage

### Aggregate aka Aggregate Root
```javascript
var adroit = require('adroit');

var aggregate = adroit.loadAggregate(aggregateId, loadFunction);

```

Generally loadFunction will be defined in your aggregate object. The purpose of this function is to apply an event to your aggregate. The event stream that represents the state of your aggregate will be applied individually and the function will return your reconstituted aggregate.

### License

Copyright (c) 2014 Christopher Gillis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
