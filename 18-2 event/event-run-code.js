// let EventEmitter = require('events')
// let util = require('util') // promisefy inherits 判断类型 util.types.类型校验

// function Girl() {
  
// }

// util.inherits(Girl, EventEmitter) // 实现继承公共属性

// let girl = new Girl
// girl.on('失恋', function (who) {
//   console.log('哭', who)
// })
// girl.on('失恋', function (who) {
//   console.log('逛街', who)
// })

// girl.emit('失恋', '渣男')


let EventEmitter = require('./events')
let util = require('util')

function Girl() {
  // EventEmitter.call(this)
}
util.inherits(Girl, EventEmitter)  // 先继承，再new

let girl = new Girl 

girl.on('失恋', function (who) {
  console.log('吃饭', who)
})

girl.emit('失恋', 'asd')