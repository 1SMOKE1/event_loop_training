console.log(1);

setTimeout(() => console.log(2));

Promise.reject(3).catch(console.log);

new Promise((resolve) => setTimeout(resolve)).then(() => console.log(4));

Promise.resolve(5).then(console.log);

console.log(6);

setTimeout(() => console.log(7), 0);

/*
  Итог:
    1
    6
    3
    5
    2
    4
    7
  Результат:
    1
    6
    3
    5
    2
    4
    7
*/
