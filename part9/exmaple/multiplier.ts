
const multiplicator = (a: number, b: number, op: Operation): Result => {
  if (op === 'multiply') {
    return a * b
  } else if (op === 'add') {
    return a + b
  } else if (op === 'divide') {
    if (b === 0) return 'can\'t divide 0!'
    return a / b
  }
}


multiplicator(1, 2, 'divide')

type Operation = 'multiply' | 'add' | 'divide';

type Result = string | number;

