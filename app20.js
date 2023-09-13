const {nextTick} = require('node:process');



console.log(1);

nextTick(() => console.log(2));

Promise.reject(3).catch(console.log);

new Promise(resolve => setTimeout(resolve)).then(() => console.log(4));

Promise.resolve(5).then(console.log);

nextTick(() => console.log(6));

setTimeout(() => console.log(7),0);


/*
  Итог:
    1
    2
    3
    5
    6
    4
    7
  Результат:
    1
    2
    6
    3
    5
    4
    7

  // Приоритет исполнения в микрозадачах, при добавлении с nextTick в первую очередь
*/