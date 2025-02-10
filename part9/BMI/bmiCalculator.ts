// formular weight (kg) / height^2 in m

type Result = string

function calcualtorBmi(w: number, h: number): Result {
  const bmitVal = w / ((h / 100) * 2)

  switch (true) {
    case bmitVal <= 18.4:
      return 'Underweight';
    case bmitVal >= 18.5 && bmitVal <= 24.9:
      return 'Normal';
    case bmitVal >= 25.0 && bmitVal <= 39.9:
      return 'Overweight';
    case bmitVal >= 40.0:
      return 'Obese';
    default:
      return 'Invalid BMI';
  }
}


console.log(calcualtorBmi(180, 74))