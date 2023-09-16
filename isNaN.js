import { test } from "./arrayForTesting.js";

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

console.log('// typeof item === \'number\' && isNaN(item)');
test(Number.isNaN, '// isNaN called with Number Object');
console.log('// isNaN до проверки, ппытается приобразовать свой аргумент в число')
test(isNaN, '// just isNaN')
/*
    // typeof item === 'number' && isNaN(item)
    typeof: string, value: abs, result: false // isNaN called with Number Object     

    typeof: string, value: 0123, result: false // isNaN called with Number Object    

    typeof: string, value: 123, result: false // isNaN called with Number Object     

    typeof: string, value: abs123, result: false // isNaN called with Number Object  

    typeof: number, value: 123, result: false // isNaN called with Number Object     

    typeof: number, value: 0.23, result: false // isNaN called with Number Object    

    typeof: number, value: Infinity, result: false // isNaN called with Number Object

    typeof: number, value: NaN, result: true // isNaN called with Number Object      

    typeof: boolean, value: false, result: false // isNaN called with Number Object

    typeof: object, value: null, result: false // isNaN called with Number Object

    typeof: object, value: Sat Sep 16 2023 10:31:58 GMT+0300 (Москва, стандартное время), result: false // isNaN called with Number Object

    typeof: object, value: [object Map], result: false // isNaN called with Number Object

    typeof: object, value: [object Set], result: false // isNaN called with Number Object

    typeof: object, value: [object Set], result: false // isNaN called with Number Object

    // isNaN до проверки, ппытается приобразовать свой аргумент в число
    typeof: string, value: abs, result: true // just isNaN

    typeof: string, value: 0123, result: false // just isNaN

    typeof: string, value: 123, result: false // just isNaN

    typeof: string, value: abs123, result: true // just isNaN

    typeof: number, value: 123, result: false // just isNaN

    typeof: number, value: 0.23, result: false // just isNaN

    typeof: number, value: Infinity, result: false // just isNaN

    typeof: number, value: NaN, result: true // just isNaN

    typeof: boolean, value: false, result: false // just isNaN

    typeof: object, value: null, result: false // just isNaN

    typeof: object, value: Sat Sep 16 2023 10:31:58 GMT+0300 (Москва, стандартное время), result: false // just isNaN

    typeof: object, value: [object Map], result: true // just isNaN

    typeof: object, value: [object Set], result: true // just isNaN

    typeof: object, value: [object Set], result: true // just isNaN
*/  