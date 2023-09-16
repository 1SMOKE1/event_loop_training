/*
  Number.prototype.toString()

  Метод toString() возвращает строковое представление
  указанного объекта Number

  numObj.toString([radix])

  radix - необязательный параметр, котрый является числом от 2 до 36,
  определяющее основание системы исчесления, используемой для 
  представления числового значения.

  Если radix, не будет равен 2...36, то будет выброшена
  ошибка исключения RangeError

  Если параметр radix не указан, то по умолчанию его значение = 10.
*/

var count = 10;

console.log(count.toString()); // Выведет '10'
console.log((17).toString()); // Выведет '17'

var x = 6;

console.log(x.toString(2)); // Выведет '110'
console.log((249).toString(16)); // Выведет 'fe'

console.log((-10).toString(2)); // Выведет '-1010'
console.log((-0xff).toString(2)); // Выведет '-11111111'
