export const arrayForTesting = [
  'abs',
  '0123',
  '123',
  'abs123',
  123,
  0.23,
  Infinity,
  NaN,
  false,
  null,
  new Date(),
  new Map([['a', 1], ['b', 2], ['c', 3]]),
  new Set([1,1,3,4,5,6]),
  new Set([1,2,3,4,5,6]),
]

export const test = (cb, addInf = '\n') => {

  if(addInf.substring(addInf.length - 2) !== '\n'){
    addInf += '\n';
  }
  for(const item of arrayForTesting){
    console.log(`typeof: ${typeof item}, value: ${item}, result: ${cb.call(this, item)} ${addInf}`)
  }
}




