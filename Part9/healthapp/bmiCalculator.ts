const calculateBmi = (height: number, weight: number): string => {
  const height_m = height / 100;
  const bmi = weight / height_m ** 2;
  if (bmi < 18.5) return "Underweight";
  else if (bmi < 25) return "Normal range";
  else return "Overweight";
};

console.log(calculateBmi(180, 74));
