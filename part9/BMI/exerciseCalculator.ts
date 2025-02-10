interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(target: number, data: number[]): Results {
  const periodLength = data.length;
  const trainingDays = data.filter(day => day > 0).length;
  const average = data.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'great job';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to work harder';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

if (process.argv.length < 4) {
  console.log('Please provide the target and at least one day of exercise data');
  process.exit(1);
}

const target = Number(process.argv[2]);
const data = process.argv.slice(3).map(Number);

import { isNotNumber } from "./utils";
if (isNotNumber(target) || isNotNumber(data)) {
  console.log('input should be number  ')
  process.exit(1);
}
console.log(calculateExercises(target, data));  