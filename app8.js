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


console.log(generator.next()); // sync, генерирует { value: 2, done: false }
console.log(generator.next(), 'here'); // sync, генерирует { value: 3, done: true }

console.log('end')

/*
  Итог:
    start
    middle
    end
    Макро-событие, генерирует { value: 1, done: false },
    Макро-событие, генерирует { value: 2, done: false },
    Макро-событие, генерирует { value: 3, done: false },
    Через 1 секунду
    "Timeout callback"
    Макро-событие, генерирует { value: undefined, done: false }

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
