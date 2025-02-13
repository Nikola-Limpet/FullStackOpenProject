

export interface Diagnoses {
  code: String;
  name: String;
  latin?: String;
}
;
export type DiagnosesNoLatin = Pick<Diagnoses, 'code' | 'name'>;

export interface PatientsAllField {
  id: String;
  name: String;
  dateOfBirth: String;
  ssn?: String;
  gender: Gender;
  occupation: String;
}

export type Patients = Exclude<PatientsAllField, 'ssn'>;

export type Gender = 'male' | 'female' | 'other';