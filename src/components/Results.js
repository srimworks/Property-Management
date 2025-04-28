import React, { useState } from "react";
import "../styles/Results.css";
import SideFilters from "../reusable/SideFilters";
import { FILTER_DATA } from "../utils/constant";
import SearchResultsCard from "../reusable/SearchResultsCard";

const Results = () => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleChange = (id, value) => {
    if (selectedFilters[id] && selectedFilters[id].includes(value)){
      const updatedFilters={
        ...selectedFilters,
        [id]:[...selectedFilters[id].filter(item=>item!==value)]
      }

      setSelectedFilters(updatedFilters)
      console.log(selectedFilters)
      return 
    }


    if (selectedFilters[id]) {
      const updatedFilters = {
        ...selectedFilters,
        [id]: [...selectedFilters[id], value],
      };
      setSelectedFilters(updatedFilters);
      console.log(updatedFilters);
    } else {
      const updatedFilters = {
        ...selectedFilters,
        [id]: [value],
      };
      setSelectedFilters(updatedFilters);
      console.log(updatedFilters);
    }
  };
  console.log(selectedFilters);
  return (
    <div className="outlet-render-filter">
      <div className="filter-overall-container">
        <h2 className="filters-heading">Filters</h2>
        <div className="filters-contianer">
          {FILTER_DATA.map((item) => (
            <SideFilters
              key={item.id}
              filter={item}
              handleChange={handleChange}
              selectedFilters={selectedFilters}
            />
          ))}
        </div>
        
      </div>
      <div className="filter-cards-container">
          <SearchResultsCard/>
          <SearchResultsCard/>
          <SearchResultsCard/>
        </div>
    </div>
  );
};

export default Results;
