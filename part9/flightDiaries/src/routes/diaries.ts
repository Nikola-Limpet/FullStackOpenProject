import express from 'express';
import { Response, Request, NextFunction } from 'express';
import { DiaryEntry, NewDiaryEntry, NoneSensitiveDiaryEntry } from '../types';
import { z } from 'zod';
import diaryServices from '../services/diaryServices';
import { newDiaryParser } from '../middlewares/newDiaryParser';

const router = express.Router();

router.get('/', (_req, res: Response<NoneSensitiveDiaryEntry[]>) => {
  res.send(diaryServices.getNonSensitivEntries());
});

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newDiaryParser, (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry>) => {
  const addedEntry = diaryServices.addDiary(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;