// 拷贝功能 读取一点 写入一点 控制用户的可用内存

// 可以指定读取的个数 自动将数据读取出来，江都区出来的数据自己调用的写法

// 核心模块 stream 文件流 fs模块 继承stream模块

let fs = require('fs')
let path = require('path')


// 记住/a（不返回前面的绝对路径）  跟a  ./a (带前面的返回路径) 的区别

// rs是可读流， 基于事件的方式得到数据 异步解决方案 回调函数
// let rs = fs.createReadStream(path.resolve(__dirname, './1.txt'), {
let ReadStream = require('./ReadStream')
let rs = new ReadStream(path.resolve(__dirname, './1.txt'), {
  flags: 'r', // r代表的是读取 fs.open()
  highWaterMark: 2, // 以字节为单位（默认是这个参数，字节为单位）  64K
  start:0,
  end: Infinity, // 起始结束位置
  autoClose: true // 自动关闭  调用fs.close()
})


let arr = []

rs.on('open', function(fd) { // 文件打开的时候
  console.log('open', fd)
})
rs.on('data', function(data) {  // 考虑数据是二进制文件
  arr.push(data)
  console.log('-------------data')
  rs.pause()  // 暂停触发data见识
})
setInterval(() => {
  rs.resume() // 恢复的是data事件
}, 1000)
rs.on('end', function() { // 读取完成之后执行回调
  console.log(Buffer.concat(arr).toString())
})
rs.on('close', function() { // 文件关闭
  console.log('文件关闭')
})
rs.on('error', function(err) {
  console.log(err, '你文件报错了') 
})

// 控制文件流的速率  on('data) on('end')