import express from 'express';
import cors from 'cors';
import diagnosesRouter from './src/routes/diagnosesRouter';
import patientsRouter from './src/routes/patientRouter';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});