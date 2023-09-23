console.log('script start');

const interval = setInterval(() => {
  console.log('setInterval')
}, 0)

setTimeout(() => {
  console.log('setTimeout 1')
  Promise.resolve().then(() => {
    console.log('promise 3')
  }).then(() => {
    console.log('promise 4')
  }).then(() => {
    setTimeout(() => {
      console.log('setTimeout 2')
      Promise.resolve().then(() => {
        console.log('promise 5')
      }).then(() => {
        console.log('promise 6')
      }).then(() => {
        clearInterval(interval)
      })
    }, 0)
  })
}, 0)

Promise.resolve().then(() => {
  console.log('promise 1');
}).then(() => {
  console.log('promise 2');
})

/*
  Итог:
    script start
    // macr + setInterval(() => console.log('setInterval'))
    // macr + setTimeout(() => consle.log('setTimeout 1'), ...)
    // micr start
    promise 1
    promise 2
    // new tick
    setInterval
    setTimeout 1
    // micr + Promise(() => console.log('promise 3'), console.log('promise 4'))
    promise 3 
    promise 4
    // macr + setTimeout(() => console.log('setTimeout 2'))
    // new tick
    setInterval
    setTimeout 2
    promise 5
    promise 6
  Результат:
    script start
    promise 1
    promise 2
    setInterval
    setTimeout 1
    promise 3
    promise 4
    setInterval
    setTimeout 2
    promise 5
    promise 6
*/