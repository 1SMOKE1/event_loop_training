import { arrayForTesting } from "./arrayForTesting.js";

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

for(const item of arrayForTesting){
  console.log(`/${typeof item}/ ${item} => ${isFinite(item)} // NOT from Number obj`);
  console.log(`/${typeof item}/ ${item} => ${Number.isFinite(item)} // With Number obj !!!\n`);
}

/*
 
  /string/ abs => false // NOT from Number obj
  /string/ abs => false // With Number obj !!!

  /string/ 0123 => true // NOT from Number obj
  /string/ 0123 => false // With Number obj !!!

  /string/ 123 => true // NOT from Number obj
  /string/ 123 => false // With Number obj !!!

  /string/ abs123 => false // NOT from Number obj
  /string/ abs123 => false // With Number obj !!!

  /number/ 123 => true // NOT from Number obj
  /number/ 123 => true // With Number obj !!!

  /number/ 0.23 => true // NOT from Number obj
  /number/ 0.23 => true // With Number obj !!!

  /number/ Infinity => false // NOT from Number obj
  /number/ Infinity => false // With Number obj !!!

  /number/ NaN => false // NOT from Number obj
  /number/ NaN => false // With Number obj !!!

  /boolean/ false => true // NOT from Number obj
  /boolean/ false => false // With Number obj !!!

  /object/ null => true // NOT from Number obj
  /object/ null => false // With Number obj !!!

  /object/ Fri Sep 15 2023 21:45:34 GMT+0300 (Москва, стандартное время) => true // NOT from Number obj
  /object/ Fri Sep 15 2023 21:45:34 GMT+0300 (Москва, стандартное время) => false // With Number obj !!!

  /object/ [object Map] => false // NOT from Number obj
  /object/ [object Map] => false // With Number obj !!!

  /object/ [object Set] => false // NOT from Number obj
  /object/ [object Set] => false // With Number obj !!!

  /object/ [object Set] => false // NOT from Number obj
  /object/ [object Set] => false // With Number obj !!!


*/
