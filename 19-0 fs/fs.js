// 编码问题  buffer 不支持gbk
 let fs = require('fs')
 let path = require('path')

//  let buffer = fs.readFileSync(path.join(__dirname, './1.txt'), 'utf8')
//  console.log(buffer)


 // 使用iconv-lite  进行文字转码

/**
 * 1)读取
 * 默认读取出来时buffer
 * 不能读取过大文件，可能淹没用户内存
 * 
 * 2)写入
 * 默认会将内容转换成utf8,tostring
 * 如果文件不存在会创建文件，存在则清空文件
 * 
 */
fs.readFile(path.join(__dirname, './1.txt'), function(err,data) {
  if(err){
    return console.log(err)
  }
  console.log(data) // 读完后将文件写进去
  fs.writeFile(path.join(__dirname, './2.txt'),data, function(err) {

  })
})

