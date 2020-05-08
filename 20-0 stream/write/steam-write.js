let fs = require('fs')
let path = require('path')

let ws = fs.createWriteStream(path.resolve(__dirname, './2.txt'), {
  highWaterMark: 1, // 期望的个数
})

// 只能写string  buffer
let flag = ws.write('hello')
ws.write('wrold')
ws.write('zf')

// 异步并发，转成异步串行  开始的时候是使用数组，后面是使用链表

ws.end('world') // 关闭文件  fs.close => write + close
// ws.end('world') // 不能在end之后再调用write



// function write() {
//   whiel(condition) {

//   }
// }

// write()

// for(let i = 0 ; i< 10; i++) { // 这样写会占用10个内存 每次都会new一个buffer
//   ws.write(i + '')
// }



// buffer  是指缓冲（用于规整化每次读取数据的尺寸）
// cache  是指缓存（用于减少重复读取数据时的开销）