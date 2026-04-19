import express from "express";
import type { Request, Response } from "express";
import calculateBmi from "./bmiCalculator.ts";
import calculateExercises from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight))
    res.status(400).send({ error: "malformatted parameters" });
  else res.send({ height, weight, bmi: calculateBmi(height, weight) });
});

app.post("/exercises", (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if (!target || !daily_exercises)
    return res.status(400).send({
      error: "parameters missing",
    });
  if (!Array.isArray(daily_exercises))
    return res.status(400).send({
      error: "malformatted parameters",
    });
  const exerciseHours = daily_exercises.map(Number);
  if (isNaN(Number(target)) || exerciseHours.some(isNaN))
    return res.status(400).send({
      error: "malformatted parameters",
    });
  return res.send(calculateExercises(exerciseHours, Number(target)));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
