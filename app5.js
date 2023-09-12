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

fn2();
fn1();

console.log("middle");

fn1();
fn2();

console.log("end");

/*
Объяснение:
  start
  // Потому что код в теле промиса является синхронным, на момент его создания.
  fn2 Promise
  // Добавили промис fn2 Promise в Микростек
  // Добавилась setTimeout('fn1 setTimeout', 1000) в Макростек
  //Макростек: setTimeout('fn1 setTimeout', 1000)
  middle
  // Добавилася еще 1 setTimeout('fn1 setTimeout', 1000) в Макростек
  // Макростек: setTimeout('fn1 setTimeout', 1000), setTimeout('fn1 setTimeout', 1000)
  // Потому что код в теле промиса является синхронным, на момент его создания.
  fn2 Promise
  // Добавили еще 1 промис fn2 Promise в Микростек
  end
  // Выполняем Микро стек, єто промис с fn2, который добавляет 2 setTimeout('fn2 setTimeout') в Макро стек (незабывая в порядке задержки);
  // Макростек: setTimeout('fn2 setTimeout'), setTimeout('fn2 setTimeout'), setTimeout('fn1 setTimeout', 1000), setTimeout('fn1 setTimeout', 1000)
  
  // Микростек чист, переходим, к Макростеку.
  fn2 setTimeout
  fn2 setTimeout

  // После добавляем 2 промиса в Микро стек, но перед єтим выполняем тело setTimeout('fn1 setTimeout', 1000) 
  // и Добавляем 2 промиса Promise(fn1 Promise) в Микростек
  // Микростек: Promise(fn1 Promise), Promise(fn1 Promise)
  // через 1 sec
  fn1 setTimeout
  fn1 setTimeout
  
  // После Макростек чист, снова переходим к Микростеку
  // Микростек чист, конец программы
  fn1 Promise
  fn1 Promise


  
Итог:
  start +
  fn2 Promise +
  middle + 
  fn2 Promise +
  end +
  fn2 SetTimeout +
  fn2 SetTimeout +
  fn1 setTimeout +
  fn1 setTimeout -
  fn1 Promise -
  fn1 Promise +
*/

/* результат:
  start
  fn2 Promise   
  middle        
  fn2 Promise   
  end
  fn2 setTimeout
  fn2 setTimeout
  fn1 setTimeout
  fn1 Promise
  fn1 setTimeout
  fn1 Promise
*/

// Ошибка в приоритетах, появилась микро задача, значит сначала, она, потом снова Макро задача
