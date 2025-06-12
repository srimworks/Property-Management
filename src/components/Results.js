import React, { useState } from "react";
import "../styles/Results.css";
import SideFilters from "../reusable/SideFilters";
import { FILTER_DATA } from "../utils/constant";
import SearchResultsCard from "../reusable/SearchResultsCard";
import { Link } from "react-router-dom";
import { IMAGES } from "../utils/images.js";

const Results = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const resetFilters = () => {
    setSelectedFilters({});
  };

  const handleShowFilter = () => {
    setShowFilters(!showFilters);
  };
  const handleChange = (id, value,type) => {
    if (type==="radio"){
      setSelectedFilters({...selectedFilters,[id]:value})
      return
    } 
    if (type==="range"){
      setSelectedFilters({...selectedFilters ,[id]:value})
      return
    }
    if (selectedFilters[id] && selectedFilters[id].includes(value)) {
      const updatedFilters = {
        ...selectedFilters, 
        [id]: [...selectedFilters[id].filter((item) => item !== value)],
      };

      setSelectedFilters(updatedFilters);
      console.log(selectedFilters);
      return;
    }

    if (selectedFilters[id]) {
      const updatedFilters = {
        ...selectedFilters,
        [id]: [...selectedFilters[id], value],
      };
      setSelectedFilters(updatedFilters);
      console.log(updatedFilters);
    } else {
      // console.log(id)
      const updatedFilters = {
        ...selectedFilters,
        [id]: [value],
      };
      setSelectedFilters(updatedFilters);
      console.log(updatedFilters)
    }
  };
  console.log(selectedFilters);
  return (
    <div className="outlet-render-filter">
      <div
        className={
          showFilters
            ? "filter-overall-container-mobile"
            : "filter-overall-container"
        }
      >
        <div className="filter-overall-container-inner">
        <img src={IMAGES.CLOSE_ICON} className="close-icon" alt="Close Icon" onClick={()=>setShowFilters(false)} />
        <h2 className="filters-heading">Filters</h2>
        <div className="reset-container" onClick={resetFilters}>
          <span className="material-symbols-reset">replay</span>
          <p className="reset-text">Reset</p>
        </div>
        <div className="filters-contianer">
          {FILTER_DATA.map((item) => (
            <SideFilters
              key={item.id}
              filter={item}
              handleChange={handleChange}
              selectedFilters={selectedFilters}
            />
          ))}
          <button className="secondary-btn" onClick={handleShowFilter}>
            Submit
          </button>
        </div>
        </div>
      </div>

      <div className="filter-cards-container">
        <button
          className="secondary-btn"
          id="filters-btn"
          onClick={handleShowFilter}
        >
          Filters
        </button>
          <SearchResultsCard />
          <SearchResultsCard />
          <SearchResultsCard />
      </div>
    </div>
  );
};

export default Results;
