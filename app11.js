const {nextTick} = require('node:process');

function async1() {
  console.log('async1 start');
  async2().then(() => {
    console.log('async1 end');
  });
}

function async2() {
  return new Promise((resolve) => {
    resolve();
    console.log('async2');
  })
}

function* generate() {
  console.log('generate-1')
  yield;
  console.log('generate-1.2')
}

function* generate2() {
  console.log('generate-2')
  yield;
  console.log('generate-2.2')
}

console.log('script start');

nextTick(() => {
  setTimeout(function () {
    console.log('setTimeout');
    }, 0)
  }
);

const generator1 = generate();
generator1.next();
generator1.next();

nextTick(async1);

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

nextTick(() => console.log('script end'));
const generator2 = generate2();
generator2.next();
generator2.next();

/* 
  Итог:
    // micr
    // macr
    script start +
    // micr: setTimeout(setTimeout)
    generate-1 +
    generate-1.2 +
    // micr: setTimeout(setTimeout), async1()
    promise 1 +
    generate-2 +
    generate-2.2 +
    // micr: setTimeout(setTimeout), async1(), then(() => promise2)
    // micr: setTimeout(setTimeout), async1(), then(() => promise2), script end
    // macr: setTimeout(setTimeout),
    async1 start +
    async 2 +
    // micr: then(() => promise2), script end, then(() => async1 end)
    script end
    promise2 + 
    async1 end
  Результат:
    script start
    generate-1
    generate-1.2
    promise1
    generate-2
    generate-2.2
    async1 start
    async2
    script end
    promise2
    async1 end
    setTimeout
*/