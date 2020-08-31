import React from "react";

const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newNum,
  handleNewNum,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>add a new</h2>
      <div>
        name:
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNum} onChange={handleNewNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
