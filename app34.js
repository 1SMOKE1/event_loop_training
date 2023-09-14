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

setImmediate(() => console.log("immediate"));

setTimeout(() => {
  console.log("setTimeout 1");
}, 4);

setTimeout(function () {
  console.log("setTimeout 2");
}, 6);

setTimeout(function () {
  console.log("setTimeout 3");
}, 100);

console.log("inside nextTick setTimeout");

const generator1 = generate();
generator1.next();
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

nextTick(() => queueMicrotask(() => console.log("queueMicrotask")));

const promise = new Promise(function (resolve) {
  console.log("promise3");
  resolve();
});

promise.then(function () {
  console.log("promise4");
});

nextTick(() => 
  promise.then(function () {
    console.log("promise4");
  })
)

console.log("here");

nextTick(() => console.log("script end"));
const generator2 = generate2();
nextTick(() => generator2.next());
generator2.next();

/*
  Итог:
    script start
    inside nextTick setTimeout
    generate-1
    generate-1.1
    async1 start
    async2
    promise3
    here
    generate-2
    promise1
    script end
    generate-2.2
    async1 end // micr
    promise4 // micr
    promise2 // micr nt
    queueMicrotask // micr nt
    promise4 // micr nt
    setTimeout 1
    immediate
    setTimeout 2
    setTimeout 3
  Результат:
    script start
    inside nextTick setTimeout
    generate-1
    generate-1.2
    async1 start
    async2
    promise3
    here
    generate-2
    promise1
    script end
    generate-2.2
    async1 end
    promise4
    promise2
    queueMicrotask
    promise4
    immediate
    setTimeout 1
    setTimeout 2
    setTimeout 3


*/
