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

fn2();
fn3();
fn1();

console.log("middle");

fn1();
fn3();
fn2();

console.log("end");

/*
Объяснение:
  start
  // after fn2()
  fn2 Promise
  // Micr: Promise(setTimeout)
  // after fn3()
  // Macr: setTimeout(fn3 setTimeout 1)
  // after fn1()
  // Macr: setTimeout(fn3 setTimeout 1), setTimeout(fn1 setTimeout, 1000);
  middle
  // after fn1() 2 time
  // Macr: setTimeout(fn3 setTimeout 1), setTimeout(fn1 setTimeout, 1000), setTimeout(fn1 setTimeout, 1000);
  // after fn3() 2 time
  // Macr: setTimeout(fn3 setTimeout 1), setTimeout(fn3 setTimeout 1), setTimeout(fn1 setTimeout, 1000), setTimeout(fn1 setTimeout, 1000);
  // after fn2() 2 time
  fn2 Promise
  // Micr: Promise(setTimeout), Promise(setTimeout)
  end
  // Start run Micr:
  // Macr: setTimeout(fn3 setTimeout 1), setTimeout(fn3 setTimeout 1), setTimeOut(fn2 setTimeout), setTimeOut(fn2 setTimeout), setTimeout(fn1 setTimeout, 1000), setTimeout(fn1 setTimeout, 1000);
  // Micr is clear,
  // Start run Macr:
  fn3 setTimeout 1
  fn3 Promise
  // add Promise(setTimeout(fn3 setTimeout 2)) to Micr
  // Micro: Promise(setTimeout(fn3 setTimeout 2)) 
  // Stop run Macr because Micr not empty
  // Start run Micr 
  // add setTimeout(fn3 setTimeout 2) to Macr
  // Macr: setTimeout(fn3 setTimeout 1), setTimeOut(fn2 setTimeout), setTimeOut(fn2 setTimeout), setTimeout(fn3 setTimeout 2), setTimeout(fn1 setTimeout, 1000), setTimeout(fn1 setTimeout, 1000);
  // Micr is clear
  // Start run Macr
  fn3 setTimeout 1
  fn3 Promise
  // add Promise(setTimeout(fn3 setTimeout 2)) to Micr
  // Micro: Promise(setTimeout(fn3 setTimeout 2)) 
  // Stop run Macr because Micr not empty
  // Start run Micr 
  // add setTimeout(fn3 setTimout 2) to Macr
  // Macr: setTimeOut(fn2 setTimeout), setTimeOut(fn2 setTimeout), setTimeout(fn3 setTimeout 2), setTimeout(fn3 setTimeout 2), setTimeout(fn1 setTimeout, 1000), setTimeout(fn1 setTimeout, 1000);
  // Micr is clear
  // Start run Macr
  fn2 setTimeout
  fn2 setTimeout
  fn3 setTimeout 2,
  fn3 setTimeout 2,
  // Macr: setTimeout(fn1 setTimeout, 1000), setTimeout(fn1 setTimeout, 1000)
  // then after 1 sec body of setTimeout fn1
  fn1 setTimeout
  // add Promise(fn1 Promise) to Micr
  // Stop run Macr because Micr not empty
  fn1 Promise
  // Micr is clear
  // Macr: setTimeout(fn1 setTimeout, 1000)
  // Start run Macr
  fn1 setTimeout
  // add Promise(fn1 Promise) to Micr
  // Stop run Macr because Micr not empty
  fn1 Promise
  // Micr is clear
  // end of program
Итог:
  start +
  fn2 Promise +
  middle +
  fn2 Promise +
  end +
  fn3 setTimeout 1 +
  fn3 Promise +
  fn3 setTimeout 1 +
  fn3 Promise +
  fn2 setTimeout +
  fn2 setTimeout +
  fn3 setTimeout 2 +
  fn3 setTimeout 2 +
  // after 1 sec
  fn1 setTimeout +
  fn1 Promise +
  fn1 setTimout +
  fn1 Promise +
*/

/* результат:
  start
  fn2 Promise     
  middle
  fn2 Promise     
  end
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

// Ошибка в приоритетах, появилась микро задача, значит сначала, она, потом снова Макро задача
