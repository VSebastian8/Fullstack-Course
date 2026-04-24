import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import { type Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import Entry from "./Entry";

const PatientPage = () => {
  const match = useMatch("patients/:id");
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const id = match?.params.id;
    if (id) {
      const fetchPatient = async () => {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      };
      void fetchPatient();
    }
  }, [match]);
  if (!patient) return <div>loading</div>;
  const genderIcon = (() => {
    switch (patient.gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      case "other":
        return <TransgenderIcon />;
    }
  })();
  return (
    <>
      <h2>
        {patient.name} {genderIcon}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {patient.dateOfBirth ? (
        <p>date of birth: {patient.dateOfBirth}</p>
      ) : (
        <></>
      )}
      <h4>entries</h4>
      {patient.entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
};
export default PatientPage;
