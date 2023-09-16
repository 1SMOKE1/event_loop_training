/*
  Number.prototype.toPrecision()

  данный метод возвращает строку, представляющую объект Number
  с указаной точностью

  Number.toPrecision([precision])

  precision - необязятелльный параметр, который указывает
  на кол-во чисел, которые будут выведены, после операции.
  тоесть 5.5757.toPercision(2) вернет '5.5', так же данный
  метод округляет число к наименьшему целому числу, 
  если нужно показывать только целую часть числа
*/

var numObj = 5.123456;

console.log(numObj.toPrecision()); // выведет '5.123456'
console.log(numObj.toPrecision(5)); // выведет '5.1235'
console.log(numObj.toPrecision(2)); // выведет '5.1'
console.log(numObj.toPrecision(1)); // выведет '5'

numObj = 0.000123;

console.log(numObj.toPrecision()); // выведет '0.000123'
console.log(numObj.toPrecision(5)); // выведет '0.00012300'
console.log(numObj.toPrecision(2)); // выведет '0.00012'
console.log(numObj.toPrecision(1)); // выведет '0.0001'

// Обратите внимание, что если заданного количества разрядов
// недостаточно для точного отображения целой части числа,
// значение может быть возвращено в экспоненциальной записи.
console.log((1234.5).toPrecision(2)); // выведет '1.2e+3'