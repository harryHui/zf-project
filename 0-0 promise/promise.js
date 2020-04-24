let PENDING = 'PENDING'
let RESOLVE = 'RESOLVE'
let REJECT = 'REJECT'

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.success = undefined
    this.reason = undefined
    this.successFn = []
    this.failFn = []

    let resolve = (success) => {
      if (this.status === PENDING) {
        this.success = success
        this.status = RESOLVE
        this.successFn.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECT
        this.failFn.forEach(fn => fn())
      }
    }
    try{
      executor(resolve,reject)
    }catch(err) {
      reject(err)
    }
  }

  then(onfulfilled, onrejected) {
    if (this.status === RESOLVE) {
      onfulfilled(this.success)
    }
    if (this.status === REJECT) {
      onrejected(this.reason)
    }
    if (this.status === PENDING) {
      this.successFn.push(() => {
        onfulfilled(this.success)
      })
      this.failFn.push(() => {
        onrejected(this.reason)
      })
    }
  }
}

module.exports = Promise