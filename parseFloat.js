import {test} from './arrayForTesting.js';

/*
  Number.parseFloat()

  Метод, который используется для выделения чисел 
  из строки с плавающей запятой.

  Number.parseFloat() === parseFloat();

  функционал из метода parseFloat();  
  из глобальной области видимости
  совпадает с функционалом при вызове
  из объекта Number;


*/

// function circumference(r) {
//   if (Number.isNaN(Number.parseFloat(r))) {
//     return 0;
//   }
//   return parseFloat(r) * 2.0 * Math.PI;
// }

// console.log(circumference('4.567abcdefgh'));
// // Expected output: 28.695307297889173

// console.log(circumference('abcdefgh'));
// // Expected output: 0

// for(const item of arrayForTesting){
//   console.log(`typeof: ${typeof item}, value: ${item}, result: ${item}`)
// }

test(parseFloat)

/*
  typeof: string, value: abs, result: NaN 
  
  typeof: string, value: 0123, result: 123
  
  typeof: string, value: 123, result: 123
  
  typeof: string, value: abs123, result: NaN        
  
  typeof: number, value: 123, result: 123
  
  typeof: number, value: 0.23, result: 0.23
  
  typeof: number, value: Infinity, result: Infinity 
  
  typeof: number, value: NaN, result: NaN
  
  typeof: boolean, value: false, result: NaN        
  
  typeof: object, value: null, result: NaN
  
  typeof: object, value: Sat Sep 16 2023 10:41:06 GMT+0300 (Москва, стандартное время), result: NaN
  
  typeof: object, value: [object Map], result: NaN
  
  typeof: object, value: [object Set], result: NaN
  
  typeof: object, value: [object Set], result: NaN
*/