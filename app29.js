const { nextTick } = require("node:process");

//FUNCTION IS MICRO TASK TOO;

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

console.log("start");

fn1();

console.log("middle");

fn2();

console.log("end");

/*
  start
  // macr:
  // setTimeout(console.log(fn1 setTimeout), Promise, 1000)
  middle
  fn2 Promise
  // micr:
  // Promise(setTimout(fn2 setTimeout))
  end
  // start micr
  // macr:
  // setTimout(fn2 setTimeout)
  // setTimeout(console.log(fn1 setTimout), Promise, 1000)
  // start macr
  fn2 setTimeout
  // start micr:
  fn1 setTimeout
  fn1 Promise
*/


console.log('--------------')
console.log("start");

fn1();

console.log("middle");

fn2();

console.log("end");
