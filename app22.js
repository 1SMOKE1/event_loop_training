const { nextTick } = require("process");


function* generate() {
  console.log('generate-1')
  yield;
  console.log('generate-1.2')
}

console.log('start')

const generator1 = generate();
generator1.next();
setTimeout(() => {
  generator1.next();
}, 0)

nextTick(() => Promise.resolve().then(() => console.log('ok')));

new Promise((resolve) => {
  resolve();
  console.log('create promise after res')
}).then(() => console.log('ok 2'))

console.log('end');

/*
 Итог:
  start
  generate-1
  // macr: generator1.next()
  // micr: Promise.resolve().then(() => console.log('ok'));
  // micr: Promise.resolve().then(() => console.log('ok'));, then(() => consle.log('ok 2'));
  create promise after res
  end
  ok
  ok 2
  
 Результат:
  start
  generate-1
  create promise after res
  end
  ok 2
  ok
  generate-1.2

  Вывод nextTick, ставит в саммый конец очереди микрозадач
*/

