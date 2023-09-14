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
queueMicrotask(() => console.log('queueMicrotask'))

console.log("script start");

setImmediate(() => console.log('immediate'))

setTimeout(() => {
  console.log("setTimeout 1");
}, 4);



nextTick(() => {

  setTimeout(function () {
    console.log("setTimeout 2");
  },6);

  setTimeout(function () {
    console.log("setTimeout 3");
  }, 100);

  console.log('inside nextTick setTimeout')
})  



const generator1 = generate();
generator1.next();
nextTick(() => generator1.next());

nextTick(async1);




new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

nextTick(() => {
  new Promise(function (resolve) {
    console.log("promise3");
    resolve();
  }).then(function () {
    console.log("promise4");
  });
  console.log('inside nextTick for promise')
})


console.log('here')





console.log("script end");
const generator2 = generate2();
generator2.next();
generator2.next();


/*
  Итог:
    script start
    generate-1
    promise1
    here
    script end
    generate-2
    generate-2.2
    inside nextTick setTimeout
    generate-1.2
    async1 start
    async2
    promise3
    inside nextTick for promise
    queueMicrotask
    promise2
    async1 end
    promise 4
    setTimeout 1
    setTimeout 2
    setTimeout 3
  Результат:
*/