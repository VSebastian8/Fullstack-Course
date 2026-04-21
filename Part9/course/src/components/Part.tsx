import { type CoursePart } from "../types";
interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>
            <i>{part.description}</i>
          </p>
        </>
      );
    case "group":
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>project exercises {part.groupProjectCount}</p>
        </>
      );
    case "background":
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>
            <i>{part.description}</i>
          </p>
          <p>submit to {part.backgroundMaterial}</p>
        </>
      );
    case "special":
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>
            <i>{part.description}</i>
          </p>
          <p>requirements: {part.requirements.join(", ")}</p>
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
