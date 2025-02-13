import diagnoses from "../../data/diagnoses";
import { Diagnoses, DiagnosesNoLatin, } from "../types";

const getAllDiagnoses = (): Diagnoses[] => {
  return diagnoses
}

const getAllNonLatinDiagnoses = (): DiagnosesNoLatin[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name
  })
  )
}



export default {
  getAllDiagnoses,
  getAllNonLatinDiagnoses
}