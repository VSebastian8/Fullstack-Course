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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
