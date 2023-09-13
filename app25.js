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

nextTick(() => console.log('ok 3'))

new Promise((resolve) => {
  resolve();
  console.log('create promise after res')
}).then(() => console.log('ok 4'))

nextTick(() => console.log('ok 5'))

const generator1 = generate();
nextTick(() => generator1.next());
setTimeout(() => {
  generator1.next();
}, 0)

new Promise((resolve) => resolve()).then(() => console.log('ok'));

console.log('end');

/*
 Итог:
    + start
    + create promise after res
    // micr: nextTick(console.log(ok 3)), console.log(ok 2)
    // micr: nextTick(console.log(ok 3)), console.log(ok 4), console.log(ok 2)
    + create promise after res
    + end //
    // micr: nextTick(console.log(ok 5)), nextTick(console.log(ok 3)), console.log(ok 4), console.log(ok 2)
    // micr: nextTick(generator1.next(), console.log(ok 5), console.log(ok 3)), console.log(ok 4), console.log(ok 2)
    // macr: generator1.next()
    // micr: nextTick(console.log(ok), generator1.next, console.log(ok 5), console.log(ok 3)), console.log(ok 4), console.log(ok 2)
    ok
    generate-1
    ok 5
    ok 3
    ok 4
    ok 2
    generate-1.2 
 Результат:
    start
    create promise after res
    create promise after res
    end
    ok 3
    ok 5
    generate-1
    ok 2
    ok 4
    ok
    generate-1.2
 nextTick кидает всегда в начало очереди, по ее порядку в очередь микрозадач
*/

