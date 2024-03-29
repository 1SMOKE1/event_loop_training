const {nextTick} = require('node:process');

function async1() {
  console.log('async1 start');
  async2().then(() => {
    console.log('async1 end');
  });
}

function async2() {
  return new Promise((resolve) => {
    resolve();
    console.log('async2');
  })
}

function* generate() {
  console.log('generate-1')
  yield;
  console.log('generate-1.2')
}

function* generate2() {
  console.log('generate-2')
  yield;
  console.log('generate-2.2')
}

console.log('script start');


setTimeout(function () {
  console.log('setTimeout');
}, 0)


const generator1 = generate();
nextTick(() => generator1.next());
generator1.next();

async1()

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

console.log('script end')
const generator2 = generate2();
nextTick(() => generator2.next());
generator2.next();

/* 
  nextTick(Иммет высший приоритет, среди микрозадач)

  // sync
  // micr nt
  // micr
  // macr
  Итог:
    script start
    // macr (console.log(setTimeout), 0)
    // micr nt: generator1.next(), 
    generate-1
    async1 start
    async 2
    // micr nt: generator1.next(), generator2.next(),
    // micr:  console.log(async1 end), promise2
    promise 1
    script end
    generate-2
    generate-1.2
    generate-2.2
    async1 end
    promise2
    // macr (console.log(setTimeout), 0)
    setTimeout
  Результат:
    + script start
    + generate-1  
    + async1 start
    + async2      
    + promise1    
    + script end  
    + generate-2  
    + generate-1.2
    + generate-2.2
    + async1 end  
    + promise2    
    + setTimeout 
*/