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
nextTick(fn3)
fn1()
generator1.next()
console.log('end')
// fn3()

/*
  Итог:
    start + 
    fn2 start tick + 
    //macr: (fn2 tick 3, delay 0), (fn2 tick 2, delay 500), (fn2 tick 1, delay 1000)
    gen tick 1 + 
    // micr: (fn3 here)
    // micr: (fn3 here), Promise(fn1 tick 1, fn2 tick 2, setTimeout(fn1 promise => timeout))
    gen tick 2
    end
    // start run micr
    fn3 here
    fn1 tick 1
    fn2 tick 2
    // macr: (fn2 tick 3, delay 0), (fn2 tick 2, delay 500), (fn2 tick 1, delay 1000), (fn1 promise => timeout)
    fn2 tick3, delay 0
    fn2 tick2, delay 500
    fn2 tick1, delay 1000
    fn1 promise => setTimeout
  Результат:
    start
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

  Ипсправленный результат:
    start + 
    fn2 start tick + 
    //macr: (fn2 tick 3, delay 0), (fn2 tick 2, delay 500), (fn2 tick 1, delay 1000)
    gen tick 1 + 
    // micr: (fn3 here)
    // micr: (fn3 here), Promise(fn1 tick 1, fn2 tick 2, setTimeout(fn1 promise => timeout))
    gen tick 2
    fn1 tick 1  // ОШИБКА ОБА СИНХРОННЫЕ
    fn2 tick 2  // ОШИБКА ОБА СИНХРОННЫЕ
    end
    // start run micr
    fn3 here

    // macr: (fn2 tick 3, delay 0), (fn2 tick 2, delay 500), (fn2 tick 1, delay 1000), (fn1 promise => timeout)
    fn2 tick3, delay 0
    fn1 promise => setTimeout // ОШИБКА МИНИМАЛЬНАЯ ЗАДЕРЖКА 4 МС
    fn2 tick2, delay 500
    fn2 tick1, delay 1000

*/

