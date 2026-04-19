import express from "express";
const app = express();

import calculateBmi from "./bmiCalculator.ts";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight))
    res.send({
      error: "malformatted parameters",
    });
  else
    res.send({
      height,
      weight,
      bmi: calculateBmi(height, weight),
    });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
