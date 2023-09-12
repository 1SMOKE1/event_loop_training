const { nextTick } = require("node:process");

//FUNCTION IS MICRO TASK TOO;

const microTask1 = () => console.log("Micro Task 1");

const microTask2 = () => {
  new Promise(() => {
    console.log("create promise");
  }).then(console.log("Micro Task 2"));
};

const microTask3 = () => {
  console.log('Micro Task3')
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

nextTick(microTask2);
microTask1();
microTask3();

macroTask1();
macroTask3();

/*
Итог:
 microTask1(); => MicroTask 1;
 microTask3(); => MicroTask3;
 // add SetTimeout(Micro Task3 Timeout);
 microTask2(); => create promise, Micro Task 2;
 macroTask1(); => Macro Task1
 macroTask3(); => Macro Task3
 macroTask2(); => Macro Task2
 // run setTimeOut(Micro Task3 Timeout) => Micro Task3 Timeout
*/
