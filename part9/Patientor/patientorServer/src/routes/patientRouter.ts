import express, { Response } from 'express';
import patientsService from '../services/patientsService';
import { Patients } from '../types';

const router = express.Router();


router.get('/', (_req, res: Response<Patients[]>) => {
  res.json(patientsService.getAllPatients())
})

export default router;