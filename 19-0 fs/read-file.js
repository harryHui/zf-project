// 先读一点，写一点

// 在代码运行时 不要同步， 刚开始的时候可以同步

let fs = require('fs')  // 不能控制读的速度，读取部分
let path = require('path')

// 手动打开文件 自己读取
// flags r r+（以读为准）  w w+（以写为准）
// chmod 改变电脑权限 rwx rwx rwx  777 (都可以读写执行) chmod -R 777
fs.open(path.join(__dirname, './1.txt'), 'r', function(err, fd) {
  // fd 文件描述符
  console.log(fd) // m默认window系统 012 被占用
  // 0 标准输入 1 标准输出 2 错误输出
  let buffer = Buffer.a
  fs.read(fd)
})

// fs 流的原理