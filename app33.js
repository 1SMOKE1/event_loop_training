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
  nextTick(() => console.log('inside nextTick setTimeout'))
})  



const generator1 = generate();
generator1.next();
nextTick(() => generator1.next());

nextTick(() => async1());




new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

queueMicrotask(() => console.log('queueMicrotask'))


const promise = new Promise(function (resolve) {
  console.log("promise3");
  resolve();
})

nextTick(() => {
  promise.then(function () {
    console.log("promise4");
  });
})

console.log('here')

console.log("script end");
const generator2 = generate2();
generator2.next();
generator2.next();


/*
  Итог:
  s1  + script start 
  s1  + generate-1 
  s1  + promise1 
  // micr: 
  // then(() => console.log('promise2'));
  // queueMicrotask(() => console.log('queueMicrotask'))
  s1  + promise3
  s1  + here 
  s1  + script end
  s1  + generate-2
  s1  + generate-2.2
  nt1 s  + inside nextTick setTimeout
  nt1 s + generate-1.2
  nt1 s + async1 start
  nt1 s + async2
  // micr:
  // then(() => console.log('promise2'));
  // queueMicrotask(() => console.log('queueMicrotask'))
  // async1 end
  // promise4
    queueMicrotask
    promise 4
    promise2
    immediate
    setTimeout 1
    setTimeout 2
    setTimeout 3
  Результат:
    script start
    generate-1
    promise1
    promise3
    here
    script end
    generate-2
    generate-2.2
    inside nextTick setTimeout
    generate-1.2
    async1 start
    async2
    promise2
    queueMicrotask
    async1 end
    promise4
    immediate
    setTimeout 1
    setTimeout 2
    setTimeout 3

  // Должен был быть promise2 вместо async1 end, потому что он был добавлен на первой итерации
*/