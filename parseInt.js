import {test} from './arrayForTesting.js';

/*
  parseInt()
  Number.parseInt()

  parseInt() === Number.parseInt(); true
  методы равны

  Метод 1-вым параметром принимает строку,
  или любое другое значение и возвращает число.

  Втормы необязательным аргументом метод принимает -
  radix систему исчеслений в которую будет переведено число

  radix может быть от 2 до 36, в ином случае ответ будет NaN
  Если radix отсутствует (undefined или 0), то radix = 10;
  Если radix отсутствует (undefined или 0), и значение является
  кодовой парой начинающейся 0х или 0Х, то предполагается, что 
  radix = 16;


*/

// function roughScale(x, base) {
//   const parsed = Number.parseInt(x, base);
//   if (Number.isNaN(parsed)) {
//     return 0;
//   }
//   return parsed * 100;
// }

// console.log(roughScale(' 0xF', 16));
// // Expected output: 1500

// console.log(roughScale('321', 2));
// // Expected output: 0

test(parseInt);

/*
  typeof: string, value: abs, result: NaN 

  typeof: string, value: 0123, result: 123 
  
  typeof: string, value: 123, result: 123
  
  typeof: string, value: abs123, result: NaN
  
  typeof: number, value: 123, result: 123
  
  typeof: number, value: 0.23, result: 0
  
  typeof: number, value: Infinity, result: NaN
  
  typeof: number, value: NaN, result: NaN
  
  typeof: boolean, value: false, result: NaN
  
  typeof: object, value: null, result: NaN
  
  typeof: object, value: Sat Sep 16 2023 12:09:46 GMT+0300 (Москва, стандартное время), result: NaN
  
  typeof: object, value: [object Map], result: NaN 
  
  typeof: object, value: [object Set], result: NaN
  
  typeof: object, value: [object Set], result: NaN
*/  