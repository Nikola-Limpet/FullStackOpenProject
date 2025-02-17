import { Gender, NewPatients } from "../types";

// {
//   "id": "d2773336-f723-11e9-8f0b-362b9e155667",
//   "name": "John McClane",
//   "dateOfBirth": "1986-07-09",
//   "ssn": "090786-122X",
//   "gender": "male",
//   "occupation": "New york city cop"
// },

const toNewPatient = (object: unknown): NewPatients => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatients = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    };
    return newPatient;
  }
  throw new Error('Incorrect or missing object');
}


const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
}
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
}
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}
const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
}

const isGender = (params: string): params is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(params);
}

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
}


export default toNewPatient;