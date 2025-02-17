import { Patients, Gender, PatientsAllField, NewPatients } from "../types";
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
// import data from "../../data/diagnoses";

const getAllPatients = (): Patients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
    occupation
  }))
}

const addPatient = (data: NewPatients): PatientsAllField => {
  const newPatient = {
    id: uuidv4(),
    ...data,
    ssn: data.ssn || ''
  }
  patients.push(newPatient);
  return newPatient;
}
export default {
  getAllPatients,
  addPatient
}