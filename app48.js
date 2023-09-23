console.log("Начало скрипта");

setTimeout(() => {
  console.log("Первый setTimeout (1000 мс)");
}, 1000);

Promise.resolve().then(() => {
  console.log("Первая микрозадача (выполняется после первого setTimeout)");
});

setTimeout(() => {
  console.log("Второй setTimeout (500 мс)");
}, 500);

process.nextTick(() => {
  console.log("process.nextTick (выполняется после второго setTimeout)");
});

queueMicrotask(() => {
  console.log("queueMicrotask (выполняется после process.nextTick)");
});

Promise.resolve().then(() => {
  console.log("Вторая микрозадача (выполняется после process.nextTick)");
});

console.log("Конец скрипта");
/*

  РЕШИЛ

  Итог:
    Начало скрипта
    // timer + Первый setTimetout (1000 мс), 1000
    // promise + Первая микрозадача (выполняется после первого setTimeout)
    // timer 
    // + Первый setTimeout (1000 мс), 1000
    // + Второй setTimeout (500 мс), 500
    // nt process.nextTick (выполняется после второго setTimeout)
    // promise 
    // + Первая микрозадача (выполняется после первого setTimeout)
    // + queueMicrotask (выполняется после process.nextTick)
    // + Вторая микрозадача (выполняется после process.nextTick)
    Конец скрипта
    process.nextTick (выполняется после второго setTimeout)
    Первая микрозадача (выполняется после первого setTimeout)
    queueMicrotask(выполняется после process.nextTick)
    Вторая микрозадача (выполняется после process.nextTick)
    Второй setTimeout (500мс), 500
    Первый setTimeout (1000мс), 1000
  Результат:
    Начало скрипта
    Конец скрипта
    process.nextTick (выполняется после второго setTimeout)  
    Первая микрозадача (выполняется после первого setTimeout)
    queueMicrotask (выполняется после process.nextTick)      
    Вторая микрозадача (выполняется после process.nextTick)  
    Второй setTimeout (500 мс)
    Первый setTimeout (1000 мс)
*/