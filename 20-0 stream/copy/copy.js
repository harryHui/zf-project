let fs = require('fs')
let path = require('path')
let {Transform} = require('stream')

fs.createReadStream(path.resolve(__dirname, './1.txt')).pipe(fs.createWriteStream(path.resolve(__dirname, './2.txt')))


// let rs = fs.createReadStream(path.resolve(__dirname, './1.txt'), {
//   highWaterMark:4
// })


// let ws = fs.createWriteStream(path.resolve(__dirname, './2.txt'), {
//   highWaterMark:1
// })


// // 先读取 江都区的结果写入进去
// rs.on('data', function (data) {
//   console.log(data)
//   let flag = ws.write(data)
//   if (!flag) {
//     // 超过预期，停止存放
//     rs.pause()
//   }
// })

// ws.on('drain', () => {
//   rs.resume()
// })

// 监听用户输入 fd 从3开始 0标准输入 1标准输出 2错误输出
// process.stdin.on('data', function(data) {
//   // console.log(data)
//   // 等价console.log(),往输入里面写
//   process.stdout.write(data)
// })

// process.stdin.pipe(process.stdout)



// 实现输入的是小写字母，输出的是大写字母
// class Mytransform extends Transform {
//   _transform(chunk,encoding,clearBuffer) {
//     this.push(chunk.toString().toUpperCase())
//     clearBuffer()
//   }
// }

// let mytransform = new Mytransform

// process.stdin.pipe(mytransform).pipe(process.stdout)


/**
 * 四种流  
 * 
 * 读  on('data') on('end')
 * 写 write end 
 * 双工
 * 转化流
 * 
 */


//  父类怎么调用子类的方法

class Parent {
  read() {
    this._read()
  }
}

class Children extends Parent {
  _read() {
    console.log("_read")
  }
}

let test = new Children
test.read()