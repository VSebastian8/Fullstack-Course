import diagnosesData from "../../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[];

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
