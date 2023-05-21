import React from 'react';

const Header = ({ course }) => (
  <header>
    <h1>{course}</h1>
  </header>
);

const Part = ({ part: { name, exercises } }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Total = ({ exercises1, exercises2, exercises3, exercises4 }) => (
  <strong>
    total of {exercises1 + exercises2 + exercises3 + exercises4} exercises
  </strong>
);

function Course({ course }) {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        exercises1={course.parts[0].exercises}
        exercises2={course.parts[1].exercises}
        exercises3={course.parts[2].exercises}
        exercises4={course.parts[3].exercises}
      />
    </div>
  );
}

export default Course;
