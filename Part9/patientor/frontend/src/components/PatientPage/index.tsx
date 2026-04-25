import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import { FormEntry, type Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import Entry from "./Entry";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@mui/material";
import axios from "axios";

const PatientPage = () => {
  const match = useMatch("patients/:id");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: FormEntry) => {
    try {
      if (!patient) return;
      console.log(values);
      const entry = await patientService.addEntry(patient.id, values);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </>
  );
};
export default PatientPage;
