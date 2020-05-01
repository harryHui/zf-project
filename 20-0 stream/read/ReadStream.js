let EventEmitter = require('events')
let fs = require('fs')
class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'r'
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.start = options.start || 0
    this.end = options.end || undefined
    this.offset = this.start
    this.autoClose = options.autoClose || true
    // 状态 是否需要继续读取 flowing
    this.flowing = false
    // 1、默认先回打开文件 open 事件
    this.open()
    // 2、监控用户的data事件 有，开始读取 emit data
    this.on('newListener', (type) => {
      this.flowing = true
      if (type === 'data') {
        this.read()
      }
    })
    // 3、当前flowing 为 true  继续读取

    // 4、如果读取不到内容 出发end事件和close

  }

  destroy(err) { // 主要负责销毁当前可读流
    if (err) { // 触发错误
      this.emit('error', err)
    }
    if (this.autoClose) { // 如果文件已经打开，则需要关闭
      if(typeof fs === 'number') {
        fs.close(this.fd, () => {
          this.emit('close')
        })
      }
    }
  }

  pause() {
    this.flowing = false
  }

  resume() {
    if(!this.flowing) {
      this.flowing= true
      this.read()
    }
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.destroy(err)
      } 
      this.fd = fd // 文件打开了
      this.emit('open', this.fd)
    })
  }

  // 通过发布订阅在解耦合
  read() {
    if(typeof this.fd !== "number"){
      return this.once('open', this.read)
    }
    // 这里不能使用同一个buffer 数组是引用类型的，如果后面更改了值，前面使用的值也会发生变化
    let buffer = Buffer.alloc(this.highWaterMark)
    fs.read(this.fd, buffer,0, this.highWaterMark, this.offset, (err, byteRead) => {  // byteRead从文件中读取的实际字节数
      if (err) return this.destroy()
      this.offset += byteRead
      if (byteRead < this.highWaterMark) { // 读取完就终止
        return this.emit('end')
      } else {
        this.emit('data', buffer.slice(0, byteRead)) // 把读取到的文件发射出去
      }
      if (this.flowing) { // 流动模式继续读取
        this.read()
      }
    })
  }
}

module.exports = ReadStream