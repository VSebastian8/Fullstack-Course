import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { Patient } from "../types.ts";
import { type NonSensitivePatient, NewPatientSchema } from "../types.ts";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get("/:id", (req, res: Response<Patient | undefined>) => {
  const id = req.params.id;
  res.send(patientsService.getPatients().find((p) => p.id === id));
});

router.post("/", (req, res) => {
  try {
    const newPatient = NewPatientSchema.parse(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
  res.json();
});

export default router;
