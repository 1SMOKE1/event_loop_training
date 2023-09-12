const { nextTick } = require("node:process");

//FUNCTION IS MICRO TASK TOO;

const microTask1 = () => console.log("Micro Task 1");

const microTask2 = () => {
  new Promise(() => {
    console.log("create promise");
  }).then(console.log("Micro Task 2"));
};

const microTask3 = () => {
  Promise.resolve().then(() =>
    setTimeout(() => console.log("Micro Task3 Timeout"))
  );
};

const macroTask1 = () => {
  setTimeout(() => console.log("Macro Task1"));
};

const macroTask2 = () => {
  setTimeout(() => console.log("Macro Task2"));
};

const macroTask3 = () => {
  setTimeout(() => console.log("Macro Task3"));
};

nextTick(macroTask2);
macroTask1();
macroTask3();

microTask3();
nextTick(microTask2);
microTask1();

/* 
  Заполняется стек Макро задач:
  nextTick(macroTask2), macroTask1(), macroTask3();
  После чего macroTask2 переносится в конец стека вызова макрозадач:
  macroTask1(), macroTask3(), macroTask2();

  Заполняется стек Микро задач:
  microTask3(), nextTick(microTask2), microTask1();
  После чего microTask1 переносится в конец стека вызова микрозадач:
  microTask3(), microTask1(), microTask2();

  Высший приоритет всегда у Микрозадач.

  Потому 1 будет вызвана функция microTask3();
  Которая в свою очередь добавит Макрозадачу в конец стека вызовов макрозадач
  Теперь стек макрозадач будет иметь такой вид:
  macroTask1(), macroTask3(), macroTask2(), SetTimeout('Micro Task3 Timeout');

  После 2 будет выполнена функция microTask1();
  По итогу будет выведено:

  MicroTask1

  После 3 будет выполнена функция microTask2();
  По итогу будет выведено:

  create promise
  MicroTask2

  После стек Микрозадач будет пуст
  (Если будет событие клика на мыш, от слушателя или смены положения от слушателя.
   То данная микро задача будет выполнена в данный момент очереди).
  И мы перейдем к выполнению стека Макрозадач.

  После 4 будет выполнена функкция macroTask1();
  по итогу будет выведено:

  MacroTask1

  После 5 будет выполнена функция macroTask3();
  по итогу будет выведено:

  MacroTask3

  После 6 будет выполнена функция macroTask2();
  по итогу будет выведено:

  MacroTask2

  После 7 будет выполнена функция SetTimeout('Micro Task3 Timeout') из стека МАКРО тасков;
  
  MicroTask3 Timeout
  
  Итог:
    // SetTimeout(microTask3 Timeout)
    MicroTask1
    create promise
    MicroTask2
    MacroTask1
    MacroTask3
    MacroTask2
    MicroTask3 TimeOut
*/
