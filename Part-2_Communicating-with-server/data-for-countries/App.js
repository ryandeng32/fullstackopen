import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
const App = () => {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [shown, setShown] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
    console.log(filter);
    setShown(
      data.filter((country) =>
        country.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  let display;
  if (shown.length >= 10) {
    display = "Too many matches, specify another filter";
  } else if (shown.length > 1) {
    display = (
      <div>
        {shown.map((country) => (
          <div key={country.name}>
            {country.name}
            <button onClick={() => setFilter(country.name)}>show</button>
          </div>
        ))}
      </div>
    );
  } else if (shown.length === 1) {
    display = <Country country={shown[0]} />;
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilter} />
      </div>
      <div>{display}</div>
    </div>
  );
};

export default App;
