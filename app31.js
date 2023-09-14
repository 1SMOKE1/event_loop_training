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

setTimeout(function () {
  console.log("setTimeout 1");
}, 0);

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



console.log('here')





console.log("script end");
const generator2 = generate2();
generator2.next();
generator2.next();

/* 
  Итог:
    + script start
    // macr 1: 
    // setTimeout(console.log('setTimeout')) 
    + generate-1
    + generate-1.2
    + async1 start
    + async2
    // micr 1: 
    // then(() => console.log('async1 end'))
    + promise1 
    // mirc 1:
    // then(() => console.log('async1 end'))
    // then(() => console.log('promise2'))
    + script end
    + generate-2
    + generate-2.2
    // start micr 1
    + async1 end
    + promise2
    // start macr 1
    + setTimeout
  Результат:
    script start
    generate-1  
    generate-1.2
    async1 start
    async2      
    promise1    
    script end  
    generate-2  
    generate-2.2
    async1 end  
    promise2    
    setTimeout  

=======================

nextTick(() =>
  new Promise(function (resolve) {
    console.log("promise1");
    resolve();
  }).then(function () {
    console.log("promise2");
  })
);

  Итог: 
    + script start
    // macr 1: setTimeout(console.log('setTimeout'))
    + generate-1
    + generate-1.2
    + async1 start
    + async2
    // micr 1: then(() => console.log("async1 end"))
    // micr 2: new Promise(function (resolve) {
    //           console.log("promise1");
    //           resolve();
    //        }).then(function () {
    //          console.log("promise2");
    //        })
    + script end
    + generate-2
    + generate-2.2
    async1 end
    setTimeout
    promise1 // sync code !!!
    // micr 3: then(() => promise2)
    promise2
  Результат:
    script start
    generate-1
    generate-1.2
    async1 start
    async2
    script end
    generate-2
    generate-2.2
    promise1
    async1 end
    promise2
    setTimeout

    // nextTick поставил себя в самое начало текущего цикла микро событий
    Исправленный итог:
      + script start
      // macr 1: setTimeout(console.log('setTimeout'))
      + generate-1
      + generate-1.2
      + async1 start
      + async2
      // micr 1: 
      //        new Promise(function (resolve) {
      //           console.log("promise1");
      //           resolve();
      //        }).then(function () {
      //          console.log("promise2");
      //        })
      //        then(() => console.log("async1 end"))
      + script end
      + generate-2
      + generate-2.2
      promise1 // sync code !!! (nextTick)
      async1 end // 1 в порядке очереди micr
      promise2 // 2 так как был добавлен после выполнения (nextTick)
      setTimeout
      
  ==========
  nextTick(() => console.log("script start"));
  nextTick(() => generator1.next());
  nextTick(() => {
    new Promise(function (resolve) {
      console.log("promise1");
      resolve();
    }).then(function () {
      console.log("promise2");
    });
    console.log('here')
  });

  // Если я правильно понимаю, то функция nextTick будет вызвана
  // после выполнения синхронного кода, и перед выполнением
  // микро задач
   
  Итог:
  // macr 1: setTimeout(console.log('setTimeout'))
  generate-1
  async1 start
  async2
  // micr 1: 
  // then(() => consle.log('async1 end'))
  script end
  generate-2
  generate-2.2
  // Выполняется nextTick code
  script start
  generate-1.2
  promise1
  // Тут была ошибка с порядком выполнения!!!!!
  // micr 1: 
  // then(() => console.log('async1 end'))  
  // в конец очереди, благодаря nextTick
  // then(() => console.log('promise 2'))
  here
  // start micr1:
  async1 end
  promise2

  setTimeout
  Результат:
    generate-1
    async1 start
    async2
    script end
    generate-2
    generate-2.2
    script start
    generate-1.2
    promise1
    here
    async1 end
    promise2
    setTimeout

  =============================
      nextTick(() => console.log("script start"));
      nextTick(() => generator1.next());
      nextTick(async1);
      nextTick(() => {
        new Promise(function (resolve) {
          console.log("promise1");
          resolve();
        }).then(function () {
          console.log("promise2");
        });
        console.log('here')
      });

    Итог:
      generate-1
      script end
      generate-2
      generate-2.2
      script start
      generate-1.2
      ascyn1 start
      async2
      promise1
      here
      async1 end
      promise2
      setTimeout
    Результат:
      script end
      generate-2
      generate-2.2
      script start
      generate-1.2
      async1 start
      async2
      promise1
      here
      async1 end
      promise2
      setTimeout

================================
queueMicrotask(() => console.log('queueMicrotask'))
nextTick(() => console.log("script start"));
nextTick(() => generator1.next());
nextTick(async1);

    Итог:
      generate-1
      promise1
      here
      script end
      generate-2
      generate-2.2
      script start
      generate-1.2
      async1 start
      async2
      queueMicrotask
      async1 end
      promise2
      setTimeout
    Результат:
      generate-1
      promise1
      here
      script end
      generate-2
      generate-2.2
      script start
      generate-1.2
      async1 start
      async2
      queueMicrotask
      promise2
      async1 end
      setTimeout

      Выходит, что nextTick, условно делает новый цикл
      при котором промисы, попадают в конец очереди промисов
      (если с верху в низ по порядку, то в самый низ);
*/
