const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => (
  <p>
    <b>total of {props.total} exercises</b>
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total
      total={course.parts.reduce((acc, part) => acc + part.exercises, 0)}
    />
  </div>
);

export default Course;
