import { test } from "./arrayForTesting.js";

/*
  Number.isSafeInteger()
  
  Эта функция полезна, когда вам нужно убедиться,
  что целое число, с которым вы работаете, не выходит
  за пределы допустимого диапазона, который может
  быть представлен наиболее точно в JavaScript.

  Это может быть важно, например, при выполнении
  арифметических операций или при сохранении чисел
  в формате с плавающей запятой,
  чтобы избежать потери точности.

*/

// console.log(Number.isSafeInteger(3)); // true
// console.log(Number.isSafeInteger(2 ** 53)); // false
// console.log(Number.isSafeInteger(2 ** 53 - 1)); // true
// console.log(Number.isSafeInteger(NaN)); // false
// console.log(Number.isSafeInteger(Infinity)); // false
// console.log(Number.isSafeInteger("3")); // false
// console.log(Number.isSafeInteger(3.1)); // false
// console.log(Number.isSafeInteger(3.0)); // true

test(Number.isSafeInteger)

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

  typeof: object; value: Sat Sep 16 2023 07:56:24 GMT+0300 (Москва, стандартное время) => result: false

  typeof: object; value: [object Map] => result: false

  typeof: object; value: [object Set] => result: false

  typeof: object; value: [object Set] => result: false
*/