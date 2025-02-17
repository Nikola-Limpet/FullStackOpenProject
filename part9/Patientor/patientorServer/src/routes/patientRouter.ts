import express, { Response } from 'express';
import patientsService from '../services/patientsService';
import { Patients } from '../types';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();


router.get('/', (_req, res: Response<Patients[]>) => {
  res.json(patientsService.getAllPatients())
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient)
    res.json(addedPatient);

  } catch (e: unknown) {
    let errorMessages = 'Something went wrong';
    if (e instanceof Error) {
      errorMessages += 'Error: ' + e.message;
    }
    res.status(400).send(errorMessages);
  }
});

export default router;