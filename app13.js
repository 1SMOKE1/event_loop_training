const {nextTick} = require('node:process');

function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = myGenerator();

console.log('start')

console.log(generator.next()); // sync , генерирует { value: 1, done: false }

// Пример асинхронного вызова функции-генератора с использованием setTimeout
setTimeout(() => {
  console.log("Timeout callback");
  console.log(generator.next()); // sync, генерирует { value: undefined, done: false }
}, 1000);

console.log('middle')


nextTick(() => console.log(generator.next())); // sync, генерирует { value: 2, done: false }
console.log(generator.next(), 'here'); // sync, генерирует { value: 3, done: true }

nextTick(() => console.log('end'));

/*
  Итог:
    start+
    {value: 1, done false}+
    // macr: (console.log("Timeout callback"), console.log(generator.next()), 1000)
    middle +
    // micr: console.log(generator.next());
    {value: 2, done false, here} +
    // micr: console.log(generator.next());, console.log(end);
    // start run Micr:
    {value: 3, done false} +
    end +
    // start run Macr:
    Timeout callback + 
    {value: undefined, done: true} +
  Результат:
    start
    { value: 1, done: false }     
    middle
    { value: 2, done: false } here
    { value: 3, done: false }     
    end
    Timeout callback
    { value: undefined, done: true }
*/