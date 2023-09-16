/*
  Number.prototype.valueOf()

  Метод valueOf() возвращает примитивное значение объекта Number

  Этот метод обычно вызывается внутренними механизмами движка JavaScript, а не явно в коде.
*/

const num1 = Number(10);
const num2 = new Number(10);
const num3 = Number(10).valueOf(); // приводит к примитиву

// сравниваються value && typeof двух значений
// тут у num1 будет typeof 'number', а у num2 будет typeof 'object'
console.log(num1 === num2); // false
// тут после использования метода valueOf, тип у num3 будет равен 'number'
// что по итогу даст true, потому что будет совпадение и по типам и по значению.
console.log(num1 === num3); // true

