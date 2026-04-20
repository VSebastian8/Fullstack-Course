import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { NonSensitivePatient } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post("/", (_req, res) => {
  res.send("Saving a patient!");
});

export default router;
