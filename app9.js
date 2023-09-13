const {nextTick} = require('node:process');

const fn1 = () => {
  Promise((resolve) => {
    console.log("fn1 Promise before fulfield");
    resolve();
    console.log("fn1 Promise after fullfield");
  }).then(() => console.log("fn1 promise end"));
};

const fn2 = () => {
  console.log("fn2 setTimeout(Promise), 2000");
  setTimeout(
    () =>
      new Promise((resolve) => {
        console.log("fn2 Promise before fulfield");
        resolve();
        console.log("fn2 Promise after fulfield");
      }).then(() => console.logo("fn2 promise end")),
    2000
  );
};

const generator = function* () {
  console.log("gen-1");
  yield;
  yield;
  console.log("gen-1.1");
};

const fn3 = () => {
  console.log("setTimeout");
  setTimeout(() => {
    console.log("setTimeout");
    Promise.resolve().then(() =>
      setTimeout(() => console.log("setTimeout 2 in fn3"))
    );
  });
};


console.log('start')

fn2()
fn3()
fn1()

console.log('middle')

nextTick(fn3());
const generator1 = generator();
generator1.next();
generator1.next();
fn1()
fn2()
console.log('end')

/*
// Итог:
  start
  fn2 setTimeout(Promise), 2000
  // macr: setTimeout(Promise), 2000
  setTimeout
  // macr: setTimeout(Promise), 2000, setTimeout(Promise(setTimeout))
  // micr: Promise(fn1 promise end)
  fn1 Promise before fulfield
  fn1 Promise after fulfield
  middle
  // micr: Promise(fn1 promise end), fn3
  gen-1
  // micr: Promise(fn1 Promise end), fn3, Promise(fn1 Promise end)
  fn2 setTimeout(Promise), 2000
  // macr: setTimeout(Promise), 2000, setTimeout(Promise(setTimeout)), setTimeout(Promise), 2000
  end
  // Start micr
  fn1 promise end
  setTimeout
  // macr: setTimeout(Promise), 2000, setTimeout(Promise(setTimeout)), setTimeout(Promise), 2000,  setTimeout(Promise)
  fn1 promise end
  // micr clear
  // 
  

// Результат
*/