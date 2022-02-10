import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  // Set filers to whatever value we select from the dropdown
  function handleChangeType(type) {
    setFilters({ type: type })
  }

  // Fetching from the api depending on what the filter value is
  // Then sending pets to PetBrowser 
  function handleFindPetsClick() {
    if (filters.type !== "all") {
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
      .then(res => res.json())
      .then(data => setPets(data))
    } else {
      fetch('http://localhost:3001/pets')
      .then(res => res.json())
      .then(data => setPets(data))
    }
  }

  // Handle adopt pet function
  function handleAdoptPet(id) {
   const updatedPets = pets.map((pet) => {
     return pet.id === id ? {...pet, isAdopted: true } : pet;
   })
   setPets(updatedPets)
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
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
