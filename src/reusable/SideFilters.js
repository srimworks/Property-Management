import React from "react";
import "../styles/SideFilters.css";

const SideFilters = ({ filter ,handleChange,selectedFilters}) => {
    const onChange=(value)=>{
        handleChange(filter.id,value)
    }
  switch (filter.type) {
    case "checkbox":
      return (
        <div className="single-filter-container">
          <label className="single-filter-label">{filter.label}</label>
          <div className="filter-boxes-container">
            {filter.options.map((opt) => (
              <div className="single-check-box" key={opt} name={filter.id}>
                <input type="checkbox" id={opt}  name={filter.id} value={opt} checked={selectedFilters[filter.id]? selectedFilters[filter.id].includes(opt): false} onChange={()=>onChange(opt)}/>
                <label htmlFor={opt}>{opt}</label>
              </div>
            ))}
          </div>
        </div>
      );
    case "radio":
      return (
        <div className="single-filter-container">
          <label className="single-filter-label">{filter.label}</label>
          <div className="filter-boxes-container">
            {filter.options.map((opt) => (
              <div className="single-check-box" key={opt}>
                <input type="radio" id={opt} name={filter.id}  value={opt} onChange={()=>{onChange(opt)}}/>
                <label htmlFor={opt}>{opt}</label>
              </div>
            ))}
          </div>
        </div>
      );
    case "range":
      return (
        <div className="single-filter-container">
          <label className="single-filter-label">{`${filter.label} : ₹${filter.min} to ₹${filter.max/100000}Lacs`}</label>
          <div className="filter-boxes-container">
             {/* min={filter.min} max={filter.max} value={filter.min} onChange={()=>{}} */}
           <input type="range" className="range-input"/>
          </div>
        </div>
      );
  }
};

export default SideFilters;
