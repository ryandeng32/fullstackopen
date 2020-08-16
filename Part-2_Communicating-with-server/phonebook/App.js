import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import server from "./services/server";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState([]);
  useEffect(() => {
    server.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNewNum = (e) => {
    setNewNum(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let duplicate = false;
    persons.forEach((item) => {
      if (item.name === newName) {
        duplicate = true;
        const result = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        );
        if (result) {
          const personObject = {
            name: newName,
            number: newNum,
          };
          server
            .update(item.id, personObject)
            .then((newPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== item.id ? person : newPerson
                )
              );
            })
            .catch((err) => {
              setMessage([
                `Information of ${newName} has already been removed from server`,
                1,
              ]);
              setTimeout(() => setMessage([]), 5000);
            });
        }
      }
    });
    if (!duplicate) {
      const personObject = {
        name: newName,
        number: newNum,
      };
      server.create(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
      });
      setMessage([`Added ${newName}`, 0]);
      setTimeout(() => setMessage([]), 5000);
    }
    setNewName("");
    setNewNum("");
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const deletePerson = (name, id) => {
    const result = window.confirm(`Delete ${name} ?`);
    if (result) {
      server.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };
  const shown = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <PersonForm
        onSubmit={onSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNum={newNum}
        handleNewNum={handleNewNum}
      />
      <h2>Numbers</h2>
      {shown.map((person) => (
        <Person
          key={person.name}
          person={person}
          deletePerson={() => deletePerson(person.name, person.id)}
        />
      ))}
    </div>
  );
};

export default App;
