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
  console.log('generate-1')
  yield 3;
  console.log('generate-1.2')
  yield ;
}

function* generate2() {
  console.log("generate-2");
  yield;
  console.log("generate-2.2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

const generator1 = generate();
console.log(generator1.next());
setTimeout(() => console.log(generator1.next()), 1000);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");
const generator2 = generate2();
generator2.next();
generator2.next();

// ошибка, код в генераторах, является синхронным
// но если yield 3; к примеру, то это Макро задача.

/*
  // sync
  // macr
  // micr
  Стек:
  // sync  script start
  // macr  setTimeout(setTimeout, 0)
  // macr  setTimeout(setTimeout, 0), generate(console.log('generate-1')), generate(console.log('generate-1.2'))
  // sync  async1 start
  // micr  Promise(console.log('async1 end'))
  // sync  console.log(promise1) //? вопрос в области выполнения
  // micr  Promise(console.log('async1 end')), Promise(console.log(promise2))
  // sync  script end
  // macr  setTimeout(setTimeout, 0), generate(console.log('generate-1')), generate(console.log('generate-1.2')), generate(console.log('generate-2')), generate(console.log('generate-2.2')) 
  Итог:
   script start
   async1 start
   promise1
   scipt end
   async1 end
   promise2
   setTimeout
   generate-1
   generate-1.2
   generate-2
   generate-2.2
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

  Исправленный стек:
    // sync  script start
    // macr  setTimeout(setTimeout, 0)
    // sync  generate-1, generate-1.2
    // sync  async1 start
    // micr  Promise(console.log('async1 end'))
    // micr  Promise(console.log('async1 end')), Promise(console.log(promise2))
    // sync  async2 
    
    Когда промис уже разрешен (resolved), он все равно может выполнять колбэки,
    переданные методу .then(), в следующем микрозадании (microtask).
    Разрешение промиса и выполнение колбэка .then() являются двумя отдельными этапами.
  
    Вызов resolve() разрешает промис, и код, находящийся после resolve(),
    выполняется в текущем теле. Это объясняет, почему "async2"
    выводится в консоль, даже если промис уже разрешен.
    // sync  promise1
    // sync  script end
    // sync  generate-2, generate-2.2
  Исправленный итог:
    script start +
    generate-1 +
    generate-1.2 +
    async1 start +
    async2 +
    promise1 +
    script end +
    generate-2 +
    generate-2.2 +
    async1 end +
    promise2 +
    setTimeout +
*/
