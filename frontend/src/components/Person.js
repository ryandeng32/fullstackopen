import React, { Fragment } from "react";

const Person = ({ person, deletePerson }) => {
  const { name, number } = person;
  return (
    <Fragment>
      <p key={name}>
        {name} {number}
        <button onClick={deletePerson}>delete</button>
      </p>
    </Fragment>
  );
};

export default Person;
