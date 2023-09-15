import { arrayForTesting } from "./arrayForTesting.js";

/*
  Поскольку оба оператора проверки на равенство, == (en-US) и === (en-US),
  вычисляются в false при проверке, что NaN и есть NaN,
  появляется необходимость в функции Number.isNaN().

  В отличие от глобальной функции isNaN(), Number.isNaN() не имеет проблемы
  принудительного преобразования параметра в число. Это значит, что в него
  безопасно передавать значения, которые обычно превращаются в NaN, но на
  самом деле NaN не являются. Также это значит, что метод возвращает true
  только для числовых значений, имеющих значение NaN.

  Number.isNaN(NaN); // true
  Number.isNaN(Number.NaN); // true
  Number.isNaN(0 / 0); // true; just zero devide on zero return NaN
  Number.isNaN(5 / 0); // Infinity => false

  // При использовании глобальной функции isNaN() это всё будет true
  Number.isNaN("NaN"); // false
  Number.isNaN(undefined); // false
  Number.isNaN({}); // false
  Number.isNaN("blabla"); // false

  // А это всё в любом случае будет false
  Number.isNaN(true);
  Number.isNaN(null);
  Number.isNaN(37);
  Number.isNaN("37");
  Number.isNaN("37.37");
  Number.isNaN("");
  Number.isNaN(" ");
*/

for(const item of arrayForTesting){
  // typeof item === 'number' && isNaN(item)
  console.log(`typeof: ${typeof item}; value: ${item} => changedValue: ${Number.isNaN(item)} // isNaN called with Number Object`);
 // isNaN до проверки, ппытается приобразовать свой аргумент в число
  console.log(`typeof: ${typeof item}; value: ${item} => changedValue: ${isNaN(item)} // just isNaN\n`)
}

/*
  typeof: string; value: abs => changedValue: false // isNaN called with Number Object
  typeof: string; value: abs => changedValue: true // just isNaN

  typeof: string; value: 0123 => changedValue: false // isNaN called with Number Object
  typeof: string; value: 0123 => changedValue: false // just isNaN

  typeof: string; value: 123 => changedValue: false // isNaN called with Number Object
  typeof: string; value: 123 => changedValue: false // just isNaN

  typeof: string; value: abs123 => changedValue: false // isNaN called with Number Object
  typeof: string; value: abs123 => changedValue: true // just isNaN

  typeof: number; value: 123 => changedValue: false // isNaN called with Number Object
  typeof: number; value: 123 => changedValue: false // just isNaN

  typeof: number; value: 0.23 => changedValue: false // isNaN called with Number Object
  typeof: number; value: 0.23 => changedValue: false // just isNaN

  typeof: number; value: Infinity => changedValue: false // isNaN called with Number Object
  typeof: number; value: Infinity => changedValue: false // just isNaN

  typeof: number; value: NaN => changedValue: true // isNaN called with Number Object
  typeof: number; value: NaN => changedValue: true // just isNaN

  typeof: boolean; value: false => changedValue: false // isNaN called with Number Object
  typeof: boolean; value: false => changedValue: false // just isNaN

  typeof: object; value: null => changedValue: false // isNaN called with Number Object
  typeof: object; value: null => changedValue: false // just isNaN

  typeof: object; value: Fri Sep 15 2023 22:10:47 GMT+0300 (Москва, стандартное время) => changedValue: false // isNaN called with Number Object
  typeof: object; value: Fri Sep 15 2023 22:10:47 GMT+0300 (Москва, стандартное время) => changedValue: false // just isNaN

  typeof: object; value: [object Map] => changedValue: false // isNaN called with Number Object
  typeof: object; value: [object Map] => changedValue: true // just isNaN

  typeof: object; value: [object Set] => changedValue: false // isNaN called with Number Object
  typeof: object; value: [object Set] => changedValue: true // just isNaN

  typeof: object; value: [object Set] => changedValue: false // isNaN called with Number Object
  typeof: object; value: [object Set] => changedValue: true // just isNaN
*/