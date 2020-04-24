function EventEmitter(params) {
  // 通过做Object.create(null),我们可以显式指定null作为它的原型。所以它绝对没有属性
  this._events = Object.create(null)
}

EventEmitter.prototype.on = function (eventName, callBack) {
  // 默认先去已经订阅好的结果中拿到callbacks 如果没有默认是[]
  if (!this._events) this._events = Object.create(null)
  let callbacks = this._events[eventName] || []
  callbacks.push(callBack) // 把当前的callback 放在数组中
  this._events[eventName] = callbacks
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  let callbacks = this._events[eventName] || []
  callbacks.forEach(fn => {
    fn(...args)
  })
}

module.exports = EventEmitter