function delay(ms) {
  return new Promise((resolve) => {
    console.log('promise 1 in delay')
    setTimeout(() => {
      console.log(`Timeout completed after ${ms}ms`);
      resolve();
    }, ms);
  });
}

function immediate() {
  return new Promise((resolve) => {
    setImmediate(() => {
      console.log('Immediate callback executed');
      resolve();
    });
  });
}

function generator() {
  return new Promise((resolve) => {
    function* generate() {
      yield 'Generator step 1';
      yield 'Generator step 2';
      yield 'Generator step 3';
    }

    const iterator = generate();
    
    const intervalId = setInterval(() => {
      const next = iterator.next();
      if (next.done) {
        clearInterval(intervalId);
        console.log('Generator completed');
        resolve();
      } else {
        console.log(next.value);
      }
    }, 1000);
  });
}

console.log('Start of the script');

delay(2000)
  .then(() => {
    console.log('Promise resolved');
    return immediate();
  })
  .then(() => {
    console.log('Immediate promise resolved');
    return generator();
  })
  .then(() => {
    console.log('All promises resolved');
  });

console.log('End of the script');

/*
  Итог:
  +Start of the script 
  +promise 1 in delay
  // timer: console.log(`Timeout completed after ${ms}ms`), 2000
  +End of the script
  // new Tick
  +Timeout completed after 2000ms
  +Promise resolved
  // timer: console.log('Immediate callback executed');
  -Immediate promise resolved
  -Immediate callback executed
  +Generator step 1
  +Generator step 2
  +Generator step 3
  +Generator completed
  +All promises resolved
  Результат:
    Start of the script
    promise 1 in delay
    End of the script
    Timeout completed after 2000ms
    Promise resolved
    Immediate callback executed
    Immediate promise resolved
    Generator step 1
    Generator step 2
    Generator step 3
    Generator completed
    All promises resolved
*/