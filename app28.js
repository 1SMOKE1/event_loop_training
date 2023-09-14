(() => {
  console.log("start");
  p = Promise.resolve(10);
  setTimeout(() => {
      console.log("timeout 1 fired");
  }, 0);
  p.then(v => console.log("p resolved to " + v));
  setTimeout(() => {
      console.log("timeout 2 fired");
  }, 0);

  let rf = 0;
  np = new Promise((resolve, reject) => {
      console.log("np's creator callback called");
      rf = resolve;
  });
  np.then(v => console.log("np resolved to " + v));
  console.log("1. np's rf = ", rf);
  setTimeout(() => {
      console.log("timeout 3 fired");
      console.log("2. np's rf = ", rf);
  }, 0);
  p.then(v => {
      console.log("p resolved again to " + v);
      rf(v*v);
  })
  console.log("somethings to be done here.");
})()

/*
  Итог:
    + console.log(start)
    // macr: setTimeout(() => console.log('timeout 1 fired'), 0)
    // micr: p.then((v) => console.log('p resolved to ' + v));
    // macr: 
    // setTimeout(() => console.log('timeout 1 fired'), 0)
    // setTimeout(() => console.log('timeout 2 fired'), 0)
    + console.log("np's creator callback called");
    // micr
    // p.then((v) => console.log('p resolved to '  + v));
    // np.then((v) => console.log('np resolved to ' + v));
    + console.log("1. np's rf = ", rf); // function
    // macr:
    // setTimeout(() => console.log('timeout 1 fired'), 0)
    // setTimeout(() => console.log('timeout 2 fired'), 0)
    // setTimeout(() => {
    //  console.log("timeout 3 fired");
    //  console.log("2. np's rf = ", rf);
    // }, 0);
    // micr
    // p.then((v) => console.log('p resolved to '  + v));
    // np.then((v) => console.log('np resolved to ' + v));
    // p.then((v) => {
    //    console.log('p resolved again to ' + v)
    //    rf(v * v);
    //});
    + console.log('somethings to be done here.')
    // start run micr
    + console.log('p resolved to ' + 10)
    - console.log('np resolved to ' + undefined);
    + console.log('p resolved again to ' + 10)
    // start run macr
    console.log('timeout 1 fired')
    console.log('timeout 2 fired')
    console.log("np's creator callback called");
    console.log('timeout 3 fired');
    console.log("2. np's rf = ", 100);

  Результат:
*/