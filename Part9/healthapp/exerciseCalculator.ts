interface CmdArgs {
  target: number;
  exerciseHours: number[];
}
const parseArguments = (args: string[]): CmdArgs => {
  if (args.length < 3)
    throw new Error("Not enough arguments, provide target value");

  if (args.length < 4)
    throw new Error("Not enough arguments, provide nonempty array");

  if (args.slice(2).some((arg) => isNaN(Number(arg)))) {
    throw new Error("Provided values were not numbers!");
  } else {
    return {
      target: Number(args[2]),
      exerciseHours: args.slice(3).map(Number),
    };
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface RatingDesc {
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const calculateExercises = (
  exerciseHours: number[],
  target: number,
): Result => {
  const average: number =
    exerciseHours.reduce((acc, x) => acc + x, 0) / exerciseHours.length;
  let ratingDesc: RatingDesc =
    average >= target
      ? {
          rating: 3,
          ratingDescription: "you achieved your goal",
        }
      : average >= target / 2
        ? {
            rating: 2,
            ratingDescription: "not too bad but could be better",
          }
        : {
            rating: 1,
            ratingDescription: "you should have exercised more",
          };
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((n) => n > 0).length,
    success: average >= target,
    ...ratingDesc,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, exerciseHours } = parseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateExercises;
