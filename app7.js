function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = myGenerator();



console.log(generator.next()); // Макро-событие, генерирует { value: 1, done: false }

// Пример асинхронного вызова функции-генератора с использованием setTimeout
setTimeout(() => {
  console.log("Timeout callback");
  console.log(generator.next()); // Макро-событие, генерирует { value: undefined, done: false }
}, 1000);

console.log(generator.next()); // Макро-событие, генерирует { value: 2, done: false }
console.log(generator.next(), 'here'); // Макро-событие, генерирует { value: 3, done: true }