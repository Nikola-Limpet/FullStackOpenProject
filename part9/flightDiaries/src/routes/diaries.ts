import express from 'express';
import { Response } from 'express';
import { NoneSensitiveDiaryEntry } from '../types';
import diaryServices from '../services/diaryServices';

const router = express.Router();

router.get('/', (_req, res: Response<NoneSensitiveDiaryEntry[]>) => {
  res.send(diaryServices.getNonSensitivEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;