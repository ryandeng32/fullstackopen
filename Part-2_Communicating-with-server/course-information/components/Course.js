import React, { Fragment } from "react";

export default ({ course }) => {
  const parts = course.parts;
  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );

  return (
    <Fragment>
      <h2>{course.name}</h2>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <strong>total of {total} exercises</strong>
    </Fragment>
  );
};
