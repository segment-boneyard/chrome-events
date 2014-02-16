
/**
 * Module dependencies.
 */

var debug = require('debug')('chrome-events');
var camelcase = require('to-camel-case');
var uppercase = require('capitalize');

/**
 * Expose `Events`
 */

module.exports = Events;

/**
 * Initialize a new `Events`.
 *
 * @param {Object} target
 * @param {Object} receiver
 * @api public
 */

function Events(target, receiver){
  if (!(this instanceof Events)) return new Events(target, receiver);
  this.receiver = receiver;
  this.target = target;
  this.methods = {};
}

/**
 * Bind `event` with optional `method`
 *
 * @param {String} event
 * @param {String} method
 * @api private
 */

Events.prototype.bind = function(event, method){
  method = method || 'on' + spaces(event);
  event = normalize(event)
  if (!this.target[event]) throw new Error('unknown event ' + event);
  if (!this.receiver[method]) throw new Error('missing method ' + method);
  var fn = this.methods[method] = this.receiver[method].bind(this.receiver);
  debug('bind %s %s', event, method);
  this.target[event].addListener(fn);
  return this;
};

/**
 * Unbind `event`, `method` or `event` or all.
 *
 * @param {String} event
 * @param {String} method
 * @api private
 */

Events.prototype.unbind = function(event, method){
  var keys;

  if (1 < arguments.length) {
    event = normalize(event)
    var fn = this.methods[method];
    if (!target[event]) throw new Error('unknown event ' + event);
    if (!fn) throw new Error('listener ' + method + ' not found');
    target[event].removeListener(fn);
    debug('unbind %s %s', event, method);
    this.methods[method] = null;
    return this;
  }

  if (1 == arguments.length) {
    this.unbind(event, 'on' + spaces(event));
    return this;
  }

  keys = Object.keys(this.methods);
  keys.forEach(this.unbind.bind(this, event));
  return this;
};

/**
 * Normalize event name.
 *
 * @param {String} event
 * @return {String}
 * @api private
 */

function normalize(event){
  return 'on' + uppercase(camelcase(event));
}

/**
 * Remove spaces from `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function spaces(str){
  return str.trim().replace(/ +/g, '');
}
