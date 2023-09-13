const { nextTick } = require("node:process");


function* generate() {
  console.log('generate-1')
  yield;
  console.log('generate-1.2')
}

console.log('start')

new Promise((resolve) => {
  resolve();
  console.log('create promise after res')
}).then(() => console.log('ok 2'))

const generator1 = generate();
nextTick(() => generator1.next());
setTimeout(() => {
  generator1.next();
}, 0)

nextTick(() => Promise.resolve().then(() => console.log('ok')));



console.log('end');

/*
 Итог:
  start
  create promise after res
  // micr: then(() => console.log(ok 2))
  // micr: then(() => console.log(ok 2)), generator1.next()
  // macr: (generator1.next(), 0)
  // micr: then(() => console.log(ok 2)), generator1.next(), Promise.resolve.then(() => console.log(ok))  
  end
  ok 2
  generate-1
  ok
  generate-1.2
 Результат:
  start
  create promise after res
  end
  generate-1
  ok 2
  ok
  generate-1.2
  Ошибка приоритетности Микроасков через nextTick
   // micr: then(() => console.log(ok 2)), nextTick(generator1.next()), Promise.resolve.then(() => console.log(ok))  
   // micr: generator1.next(), ok2, ok
*/

