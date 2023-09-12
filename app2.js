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
Объяснение:
  start
  // add cb ('fn2 Promise') to MacroStack 
  middle
  // add cb to MicroStack 
  end
  // start run MicroStack 
  fn2 Promise
  // add cb ('fn2 setTimeout') to MacroStack
  // MacroStack looksLike: setTimeout(fn2 setTimeout), setTimeout(fn1 setTimeout)
  
  // MicroTask is clear run MacroTasks by their transition queue
  fn2 setTimeout
  // after 1 sec
  fn1 setTimeout
  fn1 Promise 

Итог:
  start
  middle
  end
  fn2 Promise
  fn2 setTimeout
  fn1 setTimeout
  fn1 Promise
*/

/* результат:
  Потому что при создании промиса, код внутри него является СИНХРОННЫМ.


  start
  middle
  fn2 Promise
  end
  fn2 setTimeout
  fn1 setTimeout
  fn 1 Promise
*/
