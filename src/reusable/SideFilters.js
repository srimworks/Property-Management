import React from "react";
import "../styles/SideFilters.css";
import { formatToIndianNumber } from "../utils/constant";
import ReactSlider from "react-slider";

const SideFilters = ({ filter ,handleChange,selectedFilters}) => {
    const onChange=(value,type="checkbox")=>{
      console.log(filter.id)
        handleChange(filter.id,value ,type)
    }
  switch (filter.type) {
    case "checkbox":
      return (
        <div className="single-filter-container">
          <label className="single-filter-label">{filter.label}</label>
          <div className="filter-boxes-container">
            {filter.options.map((opt) => (
              <div className="single-check-box" key={opt.id} name={filter.id}>
                <input type="checkbox" id={opt.id}  name={filter.id} value={opt.id} checked={selectedFilters[filter.id]? selectedFilters[filter.id].includes(opt.id): false} onChange={()=>onChange(opt.id)}/>
                <label htmlFor={opt.id}>{opt.value}</label>
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
              <div className="single-check-box" key={opt.id}>
                <input type="radio" id={opt.id} name={filter.id}  value={opt.id} onChange={()=>{onChange(opt.id,"radio")}}/>
                <label htmlFor={opt.id}>{opt.value}</label>
              </div>
            ))}
          </div>
        </div>
      );
    case "range":
      const currentRange = selectedFilters[filter.id] || [filter.min, filter.max];
      return (
        <div className="single-filter-container">
          <label className="single-filter-label">{`${filter.label} : ₹${filter.min} to ₹${formatToIndianNumber(filter.max)}`}</label>
          <div className="filter-boxes-container">
             {/* min={filter.min} max={filter.max} value={filter.min} onChange={()=>{}} */}
           <ReactSlider className="range-input" min={filter.min} step={filter.step} max={filter.max} value={currentRange} onChange={(value)=>handleChange(filter.id,value,"range")} />
            <div className="range-input-fileds">
              <label className="range-input-filed">
                Min
              <input type="number" step={filter.step} value={currentRange[0]} onChange={(e)=>handleChange(filter.id,[Number(e.target.value),currentRange[1]],"range")}/>
              </label>
              <label className="range-input-filed">
                Max
              <input type="number" step={filter.step} value={currentRange[1]} onChange={(e)=>handleChange(filter.id,[currentRange[0],Number(e.target.value)],"range")}/>
              </label>
            </div>
          </div>
        </div> 
      );
  }
};

export default SideFilters;
