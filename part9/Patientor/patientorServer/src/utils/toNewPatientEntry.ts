import { z } from 'zod';
import { Gender, NewPatients } from '../types';

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
})

export const toNewDiaryEntry = (object: unknown): NewPatients => {
  return newPatientSchema.parse(object)
}

