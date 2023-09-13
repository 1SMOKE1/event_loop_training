const {nextTick} = require('node:process');

function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = myGenerator();

console.log('start')

nextTick(() => console.log(generator.next())); 


setTimeout(() => {
  console.log("Timeout callback");
  nextTick(() => console.log(generator.next())); 
}, 1000);

new Promise((resolve) => {
  console.log('create promise')
  resolve();
}).then(() => console.log('promise resolved'))

nextTick(() => console.log('middle'))


console.log(generator.next());
console.log(generator.next(), 'here');

console.log('end');

/*
  Итог:
    start
    // micr: console.log(generator.next())
    // macr: (console.log(Timeoutcallback), nextTick(console.log(generator.next()), 1000);
    create promise
    // В ПОРЯДКЕ ЗАДЕРЖКИ
    // macr: then(() => console.log(promise resolved)), (console.log(Timeoutcallback), nextTick(console.log(generator.next()), 1000)
    // micr: console.log(generator.next()), console.log(middle)
    {value: 1, done: false}
    {value: 2, done: false} here
    end
    // start micr:
    {value: 3, done false}
    middle
    // start macr
    promise resolved
    Timeout callback
    {value: undefined, done: true}
  Результат:
    start
  create promise
  { value: 1, done: false }
  { value: 2, done: false } here
  end
  { value: 3, done: false }
  middle
  promise resolved
  Timeout callback
  { value: undefined, done: true }

*/