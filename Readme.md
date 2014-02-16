
# chrome-events

  tiny wrapper for chrome events, inspired by component/events

## Installation

  Install with [component(1)](http://component.io):

    $ component install segmentio/chrome-events

## Example

```js

var events = require('chrome-events');

function App(){
  this.events = events(chrome.runtime, this);
  this.events.bind('installed');
  this.events.bind('startup');
  this.events.bind('suspend');
  this.events.bind('message');
}

App.prototype.oninstalled = function(){};
App.prototype.onstartup = function(){};
App.prototype.onsuspend = function(){};
App.prototype.onmessage = function(){};

```

## License

  MIT
