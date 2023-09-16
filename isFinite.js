import {test} from "./arrayForTesting.js";

/*
  isFinite()

  если вызывать этот метод без объекта Number,
  то он будет пытаться привести значение аргумента 
  к числовому типу.

  Number.isFinite()
  Этот метод возвращает true только для конечных значений
  числового типа.
*/

// console.log(Number.isFinite(Infinity)); // false
// console.log(Number.isFinite(NaN)); // false
// console.log(Number.isFinite(-Infinity)); // false

// console.log(Number.isFinite(0)); // true
// console.log(Number.isFinite(2e64)); // true

// console.log(Number.isFinite('0')); // false
// если бы isFinite был вызван, без объекта  Number, то было б true


test(isFinite, '// Without Number');
console.log('====================')
test(Number.isFinite, '// With Number')

/*
 
  typeof: string, value: abs, result: false // Without Number

typeof: string, value: 0123, result: true // Without Number

typeof: string, value: 123, result: true // Without Number

typeof: string, value: abs123, result: false // Without Number

typeof: number, value: 123, result: true // Without Number

typeof: number, value: 0.23, result: true // Without Number

typeof: number, value: Infinity, result: false // Without Number

typeof: number, value: NaN, result: false // Without Number

typeof: boolean, value: false, result: true // Without Number

typeof: object, value: null, result: true // Without Number

typeof: object, value: Sat Sep 16 2023 10:15:27 GMT+0300 (Москва, стандартное время), result: true // Without Number

typeof: object, value: [object Map], result: false // Without Number

typeof: object, value: [object Set], result: false // Without Number

typeof: object, value: [object Set], result: false // Without Number

====================
typeof: string, value: abs, result: false // With Number

typeof: string, value: 0123, result: false // With Number

typeof: string, value: 123, result: false // With Number

typeof: string, value: abs123, result: false // With Number

typeof: number, value: 123, result: true // With Number

typeof: number, value: 0.23, result: true // With Number

typeof: number, value: Infinity, result: false // With Number

typeof: number, value: NaN, result: false // With Number

typeof: boolean, value: false, result: false // With Number

typeof: object, value: null, result: false // With Number

typeof: object, value: Sat Sep 16 2023 10:15:27 GMT+0300 (Москва, стандартное время), result: false // With Number

typeof: object, value: [object Map], result: false // With Number

typeof: object, value: [object Set], result: false // With Number

typeof: object, value: [object Set], result: false // With Number


*/
