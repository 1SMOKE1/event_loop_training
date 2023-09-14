const {nextTick} = require('node:process');



console.log(1);

nextTick(() => console.log(2));

Promise.reject(3).catch(console.log);

new Promise(resolve => setTimeout(resolve)).then(() => console.log(4));

setImmediate(() => Promise.resolve(5).then(console.log));

nextTick(() => console.log(6));

nextTick(() => setTimeout(() => console.log(7),0));


/*
  Итог:
    1
    2
    6
    3
    5  // ошибка после микро макро микро задачи, компилятор выполнит микро, и после верентся к макро setImmediate
    4
    7
  Результат:
    1
    2
    6
    3
    4
    5
    7

*/