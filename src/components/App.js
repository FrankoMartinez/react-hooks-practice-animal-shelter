import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangeType(event) {
    setFilters(event.target.value)
  }

  function handleFindPetsClick(searchedPet) {
    console.log(pets)
    if (searchedPet.type === "All") {
      fetch("http://localhost:3001/pets")
      .then(res => res.json())
      .then(data => setPets(data))
      return pets
    } else {
      fetch(`http://localhost:3001/pets/?type=${searchedPet.type}`)
      .then(res => res.json())
      .then(data => setPets(data))
      return pets
    }
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} onFindPetsClick={handleFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
