import { useEffect, useState } from "react";
import type { Entry, Diagnosis } from "../../types";
import EntryDetails from "./EntryDetails";
import diagnosesService from "../../services/diagnoses";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface Props {
  entry: Entry;
}

const Entry = ({ entry }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const allDiagnoses = await diagnosesService.getAll();
      setDiagnoses(
        allDiagnoses.filter((d) => entry.diagnosisCodes?.includes(d.code)),
      );
    };
    fetchDiagnoses();
  }, [entry]);

  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <p>{entry.date}</p>
        <p>
          <i>{entry.description}</i>
        </p>
        <EntryDetails entry={entry} />
        {diagnoses.length > 0 ? (
          <>
            <p>Diagnoses by {entry.specialist} :</p>
            <ul>
              {diagnoses.map((diagnosis) => (
                <li key={diagnosis.code}>
                  {diagnosis.code} {diagnosis.name}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Diagnosed by {entry.specialist}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Entry;
