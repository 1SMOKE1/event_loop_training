// Using setTimeout to simulate an asynchronous operation
console.log("Start of the script");

setTimeout(() => {
  console.log("Inside setTimeout 1 (after 1000ms)");
}, 1000);

// Using a Promise to simulate another asynchronous operation
const promiseExample = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved after 2000ms");
  }, 2000);
});

promiseExample.then((result) => {
  console.log(result);
});

// Using process.nextTick to schedule a function to run in the next tick
process.nextTick(() => {
  console.log("Inside process.nextTick (executed before Promises)");
});

// Using microtasks (Promise.resolve) to schedule another asynchronous operation
Promise.resolve().then(() => {
  console.log("Inside a microtask (executed after Promises)");
});

console.log("End of the script");


/*
  Итог:
    +Start of the script
    // timer + console.log('Inside setTimeout 1 (after 1000ms)), 1000
    // promise + setTimeout(() => resolve('Promise resolved after 2000ms'), 2000)
    +End of the script
    +Inside process.nextTick (executed before Promises)
    +Inside a microTask (executed after Promises)
    +Inside setTimeout 1 after(1000ms)
    +Promise resolved after 2000ms
  Результат:
    Start of the script
    End of the script
    Inside process.nextTick (executed before Promises)
    Inside a microtask (executed after Promises)      
    Inside setTimeout 1 (after 1000ms)
    Promise resolved after 2000ms
*/
