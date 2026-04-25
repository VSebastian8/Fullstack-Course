import { Diagnosis, FormEntry, HealthCheckRating } from "../../types";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Box,
  Chip,
  OutlinedInput,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, SyntheticEvent, useEffect } from "react";
import diagnosesService from "../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: FormEntry) => void;
}

interface RatingOption {
  value: HealthCheckRating;
  label: string;
}

const ratingOptions: RatingOption[] = Object.entries(HealthCheckRating).map(
  ([label, value]) => ({
    value: value as HealthCheckRating,
    label: `${value} - ${label}`,
  }),
);

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [patientDiagnoses, setPatientDiagnoses] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [entryType, setEntryType] = useState<
    "HealthCheck" | "OccupationalHealthcare" | "Hospital"
  >("HealthCheck");
  const [date, setDate] = useState("2022-04-17");
  const [healthRating, setHealthRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );
  const [employer, setEmployer] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Dayjs>(
    dayjs("2025-02-25"),
  );
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const allDiagnoses = await diagnosesService.getAll();
      setDiagnoses(allDiagnoses);
    };
    fetchDiagnoses();
  }, []);

  const onRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const rating = Object.values(HealthCheckRating).find((g) => g === value);
      if (rating !== undefined) {
        setHealthRating(rating);
      }
    }
  };

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      if (
        value === "HealthCheck" ||
        value === "OccupationalHealthcare" ||
        value === "Hospital"
      )
        setEntryType(value);
    }
  };

  const diagnosesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setPatientDiagnoses(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
      date,
      description,
      specialist,
      diagnosisCodes: patientDiagnoses,
    };
    switch (entryType) {
      case "HealthCheck": {
        onSubmit({
          ...baseEntry,
          type: entryType,
          healthCheckRating: healthRating,
        });
        break;
      }
      case "OccupationalHealthcare": {
        onSubmit({
          ...baseEntry,
          type: entryType,
          employerName: employer,
          sickLeave:
            startDate && endDate
              ? {
                  startDate: startDate.format("YYYY-MM-DD"),
                  endDate: endDate.format("YYYY-MM-DD"),
                }
              : undefined,
        });
        break;
      }
      case "Hospital": {
        onSubmit({
          ...baseEntry,
          type: entryType,
          discharge: {
            date: dischargeDate.format("YYYY-MM-DD"),
            criteria,
          },
        });
        break;
      }
    }
  };

  const extraFields = (() => {
    switch (entryType) {
      case "HealthCheck":
        return (
          <>
            <InputLabel>Health Rating</InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value={healthRating}
              onChange={onRatingChange}
            >
              {ratingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <TextField
              label="Employer"
              fullWidth
              value={employer}
              onChange={({ target }) => setEmployer(target.value)}
              style={{ marginBottom: 10 }}
            />
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newDate) => setStartDate(newDate)}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newDate) => setEndDate(newDate)}
            />
          </>
        );
      case "Hospital":
        return (
          <>
            <DatePicker
              label="Discharge Date"
              value={dischargeDate}
              onChange={(newDate) => setDischargeDate(newDate!)}
            />
            <TextField
              label="Criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
              style={{ marginTop: 10 }}
            />
          </>
        );
    }
  })();

  return (
    <div>
      <form onSubmit={addEntry}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <InputLabel>Entry</InputLabel>
          <Select
            label="Entry"
            fullWidth
            value={entryType}
            onChange={onEntryTypeChange}
            style={{ marginBottom: 10 }}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
          <TextField
            type="date"
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            style={{ marginBottom: 10, marginTop: 10 }}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            style={{ marginBottom: 10 }}
          />
          {extraFields}
          <InputLabel style={{ marginTop: 10 }}>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={patientDiagnoses}
            onChange={diagnosesChange}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {diagnoses.map((diag) => (
              <MenuItem key={diag.code} value={diag.code}>
                {`${diag.code} - ${diag.name}`}
              </MenuItem>
            ))}
          </Select>
          <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
            <Grid size="auto">
              <Button
                color="secondary"
                variant="contained"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid size="auto">
              <Button type="submit" variant="contained">
                Add
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </form>
    </div>
  );
};

export default AddEntryForm;
