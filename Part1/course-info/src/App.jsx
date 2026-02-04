const Header = (props) => {
  //  Header takes care of rendering the name of the course
  return <h1>{props.name}</h1>;
};

const Part = (props) => {
  // Part renders a part's name and exercise count
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  // Content renders the parts and their number of exercises
  return (
    <>
      {props.parts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </>
  );
};

const Total = (props) => {
  // Total renders the total number of exercises
  return <p>Total number of exercises: {props.total_exercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total
        total_exercises={course.parts
          .map((p) => p.exercises)
          .reduce((acc, x) => acc + x, 0)}
      />
    </div>
  );
};

export default App;
