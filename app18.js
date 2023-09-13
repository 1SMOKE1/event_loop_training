console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);

/*
  Итог:
    1 + // sync
    7 + // sync
    3 + // micr
    5 + // micr
    2 + // macr
    6 + // macr
    4 + // micr macr
  Результат:
    1
    7
    3
    5
    2
    6
    4
*/