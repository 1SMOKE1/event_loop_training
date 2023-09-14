const { nextTick } = require("node:process");

const fn1 = () => {
  setTimeout(() => {
    console.log("fn1 setTimeout");
    Promise.resolve().then(() => console.log("fn1 Promise"));
  }, 1000);
};

const fn2 = () => {
  new Promise((resolve) => {
    console.log("fn2 Promise");
    resolve();
  }).then(() => setTimeout(() => console.log("fn2 setTimeout")));
};

const fn3 = () => {
  setTimeout(() => {
    console.log("fn3 setTimeout 1");
    new Promise((resolve) => {
      console.log("fn3 Promise");
      resolve();
    }).then(() => setTimeout(() => console.log("fn3 setTimeout 2")));
  });
};

console.log("start");

nextTick(fn2);
fn3();
fn1();

console.log("middle");

nextTick(fn1);
fn3();
fn2();

console.log("end");

/*

    

    Итог:
      + start
      // macr: 
      // setTimeout(() => {
      //  console.log("fn3 setTimeout 1")
      //  console.log("fn3 Promise")
      //  Promise(setTimeout(() => console.log("fn3 setTimeout 2")))
      // })
      // setTimeout(() => {
      //  consle.log("fn1 setTimeout")
      //  then(() => console.log("fn1 Promise")) 
      // }, 1000);
      + middle
      // macr: 
      // setTimeout(() => {
      //  console.log("fn3 setTimeout 1")
      //  console.log("fn3 Promise")
      //  Promise(setTimeout(() => console.log("fn3 setTimeout 2")))
      // })
      // setTimeout(() => {
      //  console.log("fn3 setTimeout 1")
      //  console.log("fn3 Promise")
      //  Promise(setTimeout(() => console.log("fn3 setTimeout 2")))
      // })
      // setTimeout(() => {
      //  consle.log("fn1 setTimeout")
      //  then(() => console.log("fn1 Promise")) 
      // }, 1000);
      + fn2 Promise
      + end
      + fn2 Promise // nt sync
      // macr:
      // setTimeout(() => console.log("fn3 setTimeout 2"))
      // setTimeout(() => {
      //  console.log("fn3 setTimeout 1")
      //  console.log("fn3 Promise")
      //  Promise(setTimeout(() => console.log("fn3 setTimeout 2")))
      // })
      // setTimeout(() => {
      //  console.log("fn3 setTimeout 1")
      //  console.log("fn3 Promise")
      //  Promise(setTimeout(() => console.log("fn3 setTimeout 2")))
      // })
      // setTimeout(() => {
      //  consle.log("fn1 setTimeout")
      //  then(() => console.log("fn1 Promise")) 
      // }, 1000);
      // setTimeout(() => {
      //  consle.log("fn1 setTimeout")
      //  then(() => console.log("fn1 Promise")) 
      // }, 1000);
      fn3 setTimeout 1
      fn3 Promise
      fn3 setTimeout 1
      fn3 Promise
      fn2 setTimeout
      fn2 setTimeout
      fn3 Promise
      fn3 setTimeout 2
      fn3 setTimeout 2
      fn1 setTimeout
      fn1 Promise
      fn1 setTimeout
      fn1 Promise
    Результат:
      start
      middle
      fn2 Promise     
      end
      fn2 Promise     
      fn3 setTimeout 1
      fn3 Promise     
      fn3 setTimeout 1
      fn3 Promise     
      fn2 setTimeout  
      fn2 setTimeout  
      fn3 setTimeout 2
      fn3 setTimeout 2
      fn1 setTimeout
      fn1 Promise
      fn1 setTimeout
      fn1 Promise
*/


