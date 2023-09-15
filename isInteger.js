import { arrayForTesting } from "./arrayForTesting.js";

/*
  Метод Number.isInteger() определяет, является ли переданное значение целым числом.

  Number.isInteger(0); // true
  Number.isInteger(1); // true
  Number.isInteger(-100000); // true
  Number.isInteger(99999999999999999999999); // true

  Number.isInteger(0.1); // false
  Number.isInteger(Math.PI); // false

  Number.isInteger(NaN); // false
  Number.isInteger(Infinity); // false
  Number.isInteger(-Infinity); // false
  Number.isInteger("10"); // false
  Number.isInteger(true); // false
  Number.isInteger(false); // false
  Number.isInteger([1]); // false

  Number.isInteger(5.0); // true
  // Потеря точности при 1e-16 и при 1e16.
  // Это значит, что все числа, имеющие более 16 символов
  // После знака запятой, или до него будут считаться true
  Number.isInteger(5.000000000000001); // false
  Number.isInteger(5.0000000000000001); // true
  Number.isInteger(4500000000000000.1); // true, because of loss of precision


*/

for(const item of arrayForTesting){
  console.log(`typeof: ${typeof item}; value:${item} => changedValue:${Number.isInteger(item)}\n`);
}

/*
  typeof: string; value:abs => changedValue:false

  typeof: string; value:0123 => changedValue:false

  typeof: string; value:123 => changedValue:false

  typeof: string; value:abs123 => changedValue:false

  typeof: number; value:123 => changedValue:true

  typeof: number; value:0.23 => changedValue:false

  typeof: number; value:Infinity => changedValue:false

  typeof: number; value:NaN => changedValue:false

  typeof: boolean; value:false => changedValue:false

  typeof: object; value:null => changedValue:false

  typeof: object; value:Fri Sep 15 2023 21:59:12 GMT+0300 (Москва, стандартное время) => changedValue:false

  typeof: object; value:[object Map] => changedValue:false

  typeof: object; value:[object Set] => changedValue:false

  typeof: object; value:[object Set] => changedValue:false
*/