import express from 'express';
import { Response } from 'express';
import { Diagnoses, DiagnosesNoLatin } from '../types';
import diagnosesService from '../services/diagnosesService';
const router = express.Router();

router.get('/', (_req, res: Response<Diagnoses[]>) => {
  res.send(diagnosesService.getAllDiagnoses());
})

router.get('/non-latin', (_req, res: Response<DiagnosesNoLatin[]>) => {
  res.send(diagnosesService.getAllNonLatinDiagnoses());
})


export default router;