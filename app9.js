const {nextTick} = require('node:process');

const fn1 = () => {
  new Promise((resolve) => {
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
      }).then(() => console.log("fn2 promise end"))
    , 2000
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

nextTick(fn2)

console.log('middle')
fn3()
fn1()

const generator1 = generator();
generator1.next();
generator1.next();

console.log('end')

/*
// Итог:
  start
  // micr: fn2()
  middle
  // 
  setTimeout
  // macr: (setTimeout(console.log(setTimeout), Promise(setTimeout)) )
  // micr: fn2(), Promise(fn1 promise end)
  fn1 Promise before fulfield
  fn1 Promise after fulfield
  gen-1
  end
  // start micr:
  fn2 setTimeout(Promise), 2000
  // macr: (setTimeout(console.log(setTimeout), Promise(setTimeout)) ), setTimeout(Promise, 2000)
  fn1 promise end
  // micr clear
  // start macr:
  setTimeout
  // micr: Promise(setTimeout(setTimeout 2 in fn3))
  // stop macr - micr not empty
  // start micr
  // macr: setTimeout(setTimeout 2 in fn3) setTimeout(Promise, 2000)
  // start macr
  setTimeout 2 in fn3
  //
  fn2 Promise before fulfield
  fn2 Promise after fulfield
  here
  // micr: Promise(fn2 promise end)
  // start micr
  fn2 promise end
// Результат
  start
  middle
  setTimeout
  fn1 Promise before fulfield  
  fn1 Promise after fullfield  
  gen-1
  end
  fn2 setTimeout(Promise), 2000
  fn1 promise end
  setTimeout
  fn2 Promise before fulfield
  fn2 Promise after fulfield 
  fn2 promise end
  setTimeout 2 in fn3
*/