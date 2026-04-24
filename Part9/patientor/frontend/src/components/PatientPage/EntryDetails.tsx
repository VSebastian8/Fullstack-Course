import { type Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      const heartColor = (() => {
        switch (entry.healthCheckRating) {
          case 0:
            return "green";
          case 1:
            return "yellow";
          case 2:
            return "orange";
          case 3:
            return "red";
        }
      })();
      return (
        <>
          <MedicalServicesIcon />
          <FavoriteIcon style={{ color: heartColor }} />
        </>
      );
    case "Hospital":
      return (
        <>
          <LocalHospitalIcon />
          {entry.discharge.date}
          <p>
            <i>{entry.discharge.criteria}</i>
          </p>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <WorkIcon /> {entry.employerName}
          {entry.sickLeave ? (
            <p>
              {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </p>
          ) : (
            <></>
          )}
        </>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
