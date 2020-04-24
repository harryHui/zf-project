let Promise = require('./promise')
let action = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('resolve执行')
  }, 1000)
})


console.log(action, '666')
// action.then(res => {
//   console.log(res, '得到返回结果')
// }, err => {
//   console.log(err, '返回失败')
// })