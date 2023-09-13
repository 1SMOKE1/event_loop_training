const {nextTick} = require('node:process')

const fn1 = () => {
  new Promise((resolve) => {
    console.log('fn1 tick 1');
    resolve();
    console.log('fn1 tick 2');
  }).then(() => setTimeout(() => console.log('fn1 promise => timeout')))
}

const fn2 = () => {
  console.log('fn2 start tick')
  setTimeout(() => {
    console.log('fn2 tick 1, delay 1000')
  }, 1000)
  setTimeout(() => {
    console.log('fn2 tick 2, delay 500')
  }, 500)
  setTimeout(() => {
    console.log('fn2 tick 3, delay 0')
  }, 0)
}

const generator = function* (){
  console.log('gen tick 1');
  yield;
  console.log('gen tick 2');
}

const fn3 = () => {
  console.log('fn3 here')
}
const generator1 = generator();

console.log('start')

fn2()
generator1.next()
nextTick(() => fn3())
fn1()
generator1.next()
console.log('end')


/*
  Итог:
    + start
    + fn2 start tick
    // macr: fn2 tick 3, delay 0, fn2 tick 2, delay 500, fn2 tick 1, delay 1000
    + gen tick 1
    + fn1 tick 1
    + fn1 tick 2
    // micr: setTimeout(console.log(fn1 promise => timeout))
    // micr: console.log(fn3 here), setTimeout(console.log(fn1 promise => timeout))
    + gen tick 2
    + end
    + fn3 here
    // macr: fn2 tick 3, delay 0, fn1 promise => timeout, fn2 tick 2, delay 500, fn2 tick 1, delay 1000
    + fn2 tick 3, delay 0
    + fn1 promise => timeout
    + fn2 tick 2, delay 500
    + fn2 tick 1, delay 1000
  Результат:
    fn2 start tick
    gen tick 1
    fn1 tick 1
    fn1 tick 2
    gen tick 2
    end
    fn3 here
    fn2 tick 3, delay 0
    fn1 promise => timeout
    fn2 tick 2, delay 500
    fn2 tick 1, delay 1000
*/

