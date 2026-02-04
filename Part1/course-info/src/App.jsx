const Header = () => {
  //  Header takes care of rendering the name of the course
  const course = "Half Stack application development";
  return <h1>{course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.ex}
    </p>
  );
};

const Content = (props) => {
  // Content renders the parts and their number of exercises
  return (
    <>
      {props.parts.map((part, i) => (
        <Part key={i} name={part} ex={props.exercises[i]} />
      ))}
    </>
  );
};

const Total = (props) => {
  // Total renders the total number of exercises
  return <p>Total number of exercises: {props.total_exercises}</p>;
};

const App = () => {
  const parts = [
    "Fundamentals of React",
    "Using props to pass data",
    "State of a component",
  ];
  const exercises = [10, 7, 14];

  return (
    <div>
      <Header />
      <Content parts={parts} exercises={exercises} />
      <Total total_exercises={exercises.reduce((acc, x) => acc + x, 0)} />
    </div>
  );
};

export default App;
