

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}
;
export type DiagnosesNoLatin = Pick<Diagnoses, 'code' | 'name'>;

export interface PatientsAllField {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export type Patients = Exclude<PatientsAllField, 'ssn'>;

export type NewPatients = Omit<PatientsAllField, 'id'>;
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}