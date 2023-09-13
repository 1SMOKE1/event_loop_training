const {nextTick} = require('node:process');

console.log('start')
new Promise((resolve) => {
  console.log('before res');
  resolve();
  console.log('after res');
}).then(() => console.log('promise ok'))
nextTick(() => console.log('middle'));
console.log('end')

/* Итог:
    start
    before res
    after res
    end
    promise ok 
    middle

  Результат:
    start
    before res
    after res 
    end       
    middle    
    promise ok

  Исправленный результат:

    start
    before res
    after res 
    end       
    middle // Потому что это микро задача, а then() макро задача, потому middle отработает первее
    promise ok 
*/