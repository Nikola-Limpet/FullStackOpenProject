import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { calculatorBmi } from './bmiCalculator';
import { calculator, Operation } from './calculator';
import { calculateExercises, Results } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Fullstack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const weight = req.query.weight ? Number(req.query.weight) : undefined;
  const height = req.query.height ? Number(req.query.height) : undefined;

  if (weight === undefined || isNaN(weight) || height === undefined || isNaN(height)) {
    return res.status(400).send({
      error: "malformatted parameters"
    });
  }
  const bmi = calculatorBmi(weight, height);
  return res.send({
    weight,
    height,
    bmi
  });
});

app.post('/calculate', (req: Request, res: Response) => {
  const { val1, val2, op } = req.body;

  if (!val1 || isNaN(Number(val1))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  if (!val2 || isNaN(Number(val2))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  if (!op) {
    return res.status(400).send({ error: 'missing operation' });
  }

  const operation = op as Operation;
  const result = calculator(Number(val1), Number(val2), operation);
  return res.send({ result });
});

app.post('/exercises', (req: Request, res: Response) => {
  try {
    const { target, daily_exercises } = req.body;

    const targetNum = target as Results['target'];
    const daily_exercisesNum: number[] = daily_exercises;

    const calculate = calculateExercises(targetNum, daily_exercisesNum);

    return res.send({ calculate });
  } catch (e) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});