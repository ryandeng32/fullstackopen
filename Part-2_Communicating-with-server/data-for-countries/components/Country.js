import React from "react";

const Country = (country) => {
  const { name, capital, population, languages, flag } = country.country;
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={flag} height="100" width="100" alt="flag" />
    </div>
  );
};
export default Country;
