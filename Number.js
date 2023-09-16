import { arrayForTesting } from "./arrayForTesting.js";

/*
  new Number(value)
  Number(value)
*/

// const num1 = Number('123');
// const num2 = new Number('123');

// const fn = (n) => {
//   return Object.prototype.toString.call(n);
// }

// console.log(fn(num1));
// console.log(fn(num2));

// console.log(typeof num1, typeof num2);
// // сравнивает типы и значения;  
// console.log(num1 === num2);

/*
  Только при помощи Number(), можно явно конвертировать
  BigInt в число
  +1n; // TypeError: Cannot convert a BigInt value to a number
  0 + 1n; // TypeError: Cannot mix BigInt and other types, use explicit conversions

  Number(1n); => 1

  Если при конвертации BigInt, при помощи Number
  число будет слишком большим, 1е16 или 1-е16, 
  то можно ожидать не ожиданный результат
  в связи с потерей точности.
*/

for(const item of arrayForTesting){
  console.log(`typeof: ${typeof item}; value: ${item} => result: ${Number.isSafeInteger(item)}\n`);
}

/*
  typeof: string; value: abs => result: false

  typeof: string; value: 0123 => result: false    

  typeof: string; value: 123 => result: false     

  typeof: string; value: abs123 => result: false  

  typeof: number; value: 123 => result: true      

  typeof: number; value: 0.23 => result: false    

  typeof: number; value: Infinity => result: false

  typeof: number; value: NaN => result: false     

  typeof: boolean; value: false => result: false

  typeof: object; value: null => result: false

  typeof: object; value: Sat Sep 16 2023 09:04:47 GMT+0300 (Москва, стандартное время) => result: false

  typeof: object; value: [object Map] => result: false

  typeof: object; value: [object Set] => result: false

  typeof: object; value: [object Set] => result: false
*/