import React, { useState } from "react";
import "../styles/CheckEmi.css";
import { EMI_PLANS } from "../utils/constant";
import { IMAGES } from "../utils/images.js";

const CheckEmi = ({close}) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (phone.trim().length === 10) {
      alert(`Thank you! We will contact you at ${phone}`);
    } else {
      alert("Please enter a valid 10-digit phone number.");
    }
  };
  const calculateEMI=(principal, annualInterestRate, tenureYears)=> {
  const monthlyRate = annualInterestRate / 12 / 100; 
  const tenureMonths = tenureYears * 12; 

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  return Math.round(emi); 
}
  return (
    <div className="checkemi-outer-container">
      <div className="checkemi-inner-container">
        <h2>EMI Plan Options</h2>
        <img src={IMAGES.CLOSE_ICON} alt="close-icon" className="icon-close" onClick={()=>close(false)}/>
        <div className="emi-table">
          <div className="emi-table-header">
            <div>Loan Amount</div>
            <div>Tenure</div>
            <div>Interest Rate</div>
            <div>EMI</div>
            <div>Total Payable</div>
          </div>
         
            <div className="emi-table-row" >
              <div>5 cr</div>
              <div>30 years</div>
              <div>7.85%</div>
              <div>{(calculateEMI(50000000,7.85,30)/100000).toFixed(2)}Lacs</div>
              <div>{(5+(5*0.0785)).toFixed(2)} Cr</div>
            </div>
      
        </div>
        <div className="phone-input-section">
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />
          <input
            type="email"
            placeholder="Enter your email Address"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />
          <button onClick={handleSubmit} className="primary-btn">I'm Interested</button>
        </div>
      </div>
    </div>
  );
};

export default CheckEmi;
