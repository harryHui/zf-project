let fs = require('fs')

// fs.readFile('./age.txt', 'utf8', function (err, data) {
  
// })

function read(...args) {
  return new Promise((reslove, reject) => {
    fs.readFile(...args, function (err, data) {
      if(err) reject(arr)
      reslove(data)
    })
  })
}


read('./name.txt', 'utf8').then(data => {
  console.log(data)
}, function(err) {
  console.log(err)
})