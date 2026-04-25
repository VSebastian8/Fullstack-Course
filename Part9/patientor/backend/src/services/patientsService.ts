import patientsData from "../../data/patients.ts";
import type {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from "../types.ts";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patient: Patient): Entry => {
  const id = uuid();
  const newEntry: Entry = {
    id,
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addEntry,
};
