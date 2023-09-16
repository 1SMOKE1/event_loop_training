/*
  Number.prototype.toExponential()

  numObj.toExponential([fractionDigits])

  Данный метод возвращает строку, 
  представляющую объект Number в экспоненциальной записи

  Параметры

  fractionDigits - необязательный параметр. 
  Целое число, определяющее кол-во цифр после десятичной запятой.

  По уиолчанию используется столько цифр, сколько необходимо для указания 
  единичного числа (1).

  fractionDigits - RangeError, значения между 0 и 20 включительно будут пораждатть
  исключегте RangeError

  если метод вызывается на объекте, не являющимся объектом Number.
*/

var numObj = 77.1234;

console.log(numObj.toExponential()); // выведет 7.71234e+1
console.log(numObj.toExponential(4)); // выведет 7.7123e+1
console.log(numObj.toExponential(2)); // выведет 7.71e+1
console.log((77.1234).toExponential()); // выведет 7.71234e+1
console.log((77).toExponential()); // выведет 7.7e+1
// console.log(numObj.toExponential(-1)) // arguments must be beetwen 0 and 100
console.log(Number(null).toExponential(5)) // 0.00000e+0
console.log(Number(undefined).toExponential(4)) // NaN
console.log(Number(false).toExponential(2)) // 0.00e+0