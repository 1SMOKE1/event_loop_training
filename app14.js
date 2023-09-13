const {nextTick} = require('node:process');

function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = myGenerator();

console.log('start')

console.log(generator.next()); 


setTimeout(() => {
  console.log("Timeout callback");
  nextTick(() => console.log(generator.next())); 
}, 1000);

console.log('middle')


console.log(generator.next());
nextTick(() => console.log(generator.next(), 'here'));

nextTick(() => console.log('end'));

/*
  Итог:
    start +
    {value: 1, done: false} +
    // macr: (() => console.log(Timeout callback), nextTick() => console.log(generator.next()), 1000);
    middle +
    {value: 2, done: false} +
    // micr: (console.log(generator.next, here)), (console.log(end))
    // start micr
    {value: 3, done: false} here +
    end +
    Timeout callback +
    {value undefined, done: true} +
  Результат:
    start
    { value: 1, done: false }     
    middle
    { value: 2, done: false }     
    { value: 3, done: false } here
    end
    Timeout callback
    { value: undefined, done: true }
*/