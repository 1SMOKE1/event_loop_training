const { nextTick } = require("node:process");

function async1() {
  console.log("async1 start");
  async2().then(() => {
    console.log("async1 end");
  });
}

function async2() {
  return new Promise((resolve) => {
    resolve();
    console.log("async2");
  });
}

function* generate() {
  console.log("generate-1");
  yield;
  console.log("generate-1.2");
}

function* generate2() {
  console.log("generate-2");
  yield;
  console.log("generate-2.2");
}

console.log("script start");

nextTick(() => {
  setTimeout(function () {
    console.log("setTimeout");
  }, 0);
});

const generator1 = generate();
nextTick(() => generator1.next());
generator1.next();

async1();

nextTick(() =>
  new Promise(function (resolve) {
    console.log("promise1");
    resolve();
  }).then(function () {
    console.log("promise2");
  })
);

console.log("script end");
const generator2 = generate2();
generator2.next();
nextTick(() => generator2.next());

/* 
  Итог:
    script start +
    // micr: (setTimeout(console.log(setTimeout)))
    // micr: (setTimeout(console.log(setTimeout))), (console.log(generator1.next()))
    generate-1 +
    async1 start +
    async2 +
    // macr: then(() => console.log(async1 end))
    // micr: (setTimeout(console.log(setTimeout))), (console.log(generator1.next())), Promise(console.log(promise1)).then(() => console.log(promise2))
    script end + 
    generate-2 +
    // micr: (setTimeout(console.log(setTimeout))), (generator1.next()), Promise(console.log(promise1)).then(() => console.log(promise2)), generator2.next()
    // macr: (console.log(setTimeout), 0), then(() => console.log(async1 end))
    generate-1.2+
    promise1+
    // macr: (console.log(setTimeout), 0), then(() => console.log(async1 end)), then(() => console.log(promise2))
    generate-2.2+
    //micr clear
    setTimeout -
    async1 end -
    promise2 -
  Результат:
    script start
    generate-1
    async1 start
    async2
    script end
    generate-2
    generate-1.2
    promise1
    generate-2.2
    async1 end
    promise2
    setTimeout  
  Исправленный результат:
    // 
    async1 end +
    promise2 +
    setTimeout +
*/
