import { test } from "./arrayForTesting.js";

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

test(Number, '// Number')

/*
  typeof: string, value: abs, result: NaN // Number

  typeof: string, value: 0123, result: 123 // Number
  
  typeof: string, value: 123, result: 123 // Number
  
  typeof: string, value: abs123, result: NaN // Number
  
  typeof: number, value: 123, result: 123 // Number
  
  typeof: number, value: 0.23, result: 0.23 // Number
  
  typeof: number, value: Infinity, result: Infinity // Number
  
  typeof: number, value: NaN, result: NaN // Number
  
  typeof: boolean, value: false, result: 0 // Number
  
  typeof: object, value: null, result: 0 // Number
  
  typeof: object, value: Sat Sep 16 2023 10:39:41 GMT+0300 (Москва, стандартное время), result: 1694849981088 // Number
  
  typeof: object, value: [object Map], result: NaN // Number
  
  typeof: object, value: [object Set], result: NaN // Number
  
  typeof: object, value: [object Set], result: NaN // Number
*/