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

const Total = ({ parts }) => (
  <strong>
    total of{' '}
    {parts.reduce((acc, cur) => {
      return acc + cur.exercises;
    }, 0)}{' '}
    exercises
  </strong>
);

const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
