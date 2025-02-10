// formula weight (kg) / height^2 in m

type Result = string

function calculatorBmi(w: number, h: number): Result {
  const bmiVal = w / ((h / 100) ** 2)

  switch (true) {
    case bmiVal <= 18.4:
      return 'Underweight';
    case bmiVal >= 18.5 && bmiVal <= 24.9:
      return 'Normal';
    case bmiVal >= 25.0 && bmiVal <= 39.9:
      return 'Overweight';
    case bmiVal >= 40.0:
      return 'Obese';
    default:
      return 'Invalid BMI';
  }
}


console.log(calculatorBmi(Number(process.argv[2]), Number(process.argv[3])))