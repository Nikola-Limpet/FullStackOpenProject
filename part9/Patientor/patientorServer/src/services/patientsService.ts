import { Patients, Gender } from "../types";
import patients from '../../data/patients';

const getAllPatients = (): Patients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
    occupation
  }))
}


export default {
  getAllPatients
}