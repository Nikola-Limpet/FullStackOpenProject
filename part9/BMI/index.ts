import express from 'express';
import { calculatorBmi } from './bmiCalculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack!')
})

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || !height) {
    res.send({
      error: "malformatted parameters"
    })
  }
  const bmi = calculatorBmi(weight, height);
  res.send({
    weight,
    height,
    bmi
  })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});