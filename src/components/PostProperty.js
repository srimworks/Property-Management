import React, { useState } from "react";
import "../styles/PostProperty.css";
import { IMAGES } from "../utils/images.js";
import { PRODUCT_ADD_DATA } from "../utils/constant.js";
import InputFeilds from "../reusable/InputFeilds.js";

const PostProperty = () => {
  const [activeFields,setActiveFields]=useState(0)

  const [productData,setProductData]=useState({})
  const LoadedPercentage=Math.round((activeFields)/PRODUCT_ADD_DATA.length * 100,0 );
  const handleInputChange = (id, value) => {
    setProductData((prev) => ({ ...prev, [id]: value }));
    console.log(productData)
  };
  

  const handleNext = () => {
    const currentFields = PRODUCT_ADD_DATA[activeFields].inputFeilds;
  
    const allValid = currentFields.every((field) => {
      if (!field.required) return true;
      return productData[field.id] !== undefined && productData[field.id] !== "" && productData[field.id] !== "Select";
    });
  
    if (!allValid) {
      alert("Please fill all required fields before continuing.");
      return;
    }
  
    if (activeFields + 1 < PRODUCT_ADD_DATA.length) {
      setActiveFields((prev) => prev + 1);
    }
  };
  
  console.log(productData)

  return (
    <div className="outlet-render-post-property">
      <div className="post-property-main-content">
        <div className="top-bar">
          <img src={IMAGES.SMALL_LOGO_ICON} alt="Small Logo" />
          <div className="progressbar-container">
            <div className="progressbar-outer">
              <div className="progressbar-inner" style={{width: `${LoadedPercentage}%`}}></div>
            </div>
            <p className="progessbar-text">{LoadedPercentage}% done</p>
          </div>
        </div>
        <div className="middle-bar-container">
          <div className="middle-side-bar">
            {PRODUCT_ADD_DATA.map((item,index) => (
              <div className={ activeFields===index?"sidebar-text-container-active":"sidebar-text-container"}  key={item.id}>
                <img src={item.icon} alt="icon" />
                <p className="sidebar-text">{item.name}</p>
              </div>
            ))}
          </div>
          <div className="middle-input-conatiner">
            <h2 className="middle-heading">{PRODUCT_ADD_DATA[activeFields].name}</h2>
            <div className="input-fields-container">
              {
                PRODUCT_ADD_DATA[activeFields].inputFeilds.map(item=>(
                  <InputFeilds key={item.id} input={item}     value={productData[item.id]}
                  onChange={handleInputChange}/>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
      {activeFields > 0 && (
    <button
      className="secondary-btn"
      onClick={() => setActiveFields((prev) => prev - 1)}
    >
      Back
    </button>
  )}
        <button className="primary-btn" onClick={()=>{ handleNext()}}>Save & Continue</button>
      </div>
    </div>
  );
};

export default PostProperty;
