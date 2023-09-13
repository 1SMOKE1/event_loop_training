console.log(1);

setTimeout(() => console.log(2));

Promise.reject(3).catch(console.log);

new Promise(resolve => setTimeout(resolve)).then(() => console.log(4));

Promise.resolve(5).then(console.log);

console.log(6);

setTimeout(() => console.log(7),0);

/*
  Итог:
    1
    6
    3
    5
    7
    2
    4
  Результат:
    1
    6
    3
    5
    2
    4
    7

  у 4 регается макро и микро задача
  тоесть в момент выполнения макро задач, вылезет микро
  и мы выполним микро (обработаем промис и получим 4, а после продолжим выполнять макро 7)
*/
