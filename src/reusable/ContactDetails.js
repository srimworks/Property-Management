import React from "react";
import "../styles/contactDetails.css";
import { IMAGES } from "../utils/images";

const ContactDetails = ({ name, contact, propertyCode, price ,close}) => {
  return (
    <div className="outer-container">
      <div className="contact-details-card">
        <div className="close-icon-container">
          <img src={IMAGES.CLOSE_ICON} alt="Close Icon" onClick={()=>close(false)} />
        </div>
        <img src={IMAGES.CALL_ICON} alt="Call Icon" className="call-icon"/>
        <h3>Contact Details</h3>
        <div className="details-conatiner">
          <p>Name - Mahal Teja</p>
          <p>Mobile - +91 9876543210</p>
          <p>Location - Kukatpally</p>
        </div>
        <button className="secondary-btn">Call Now</button>
      </div>
    </div>
  );
};

export default ContactDetails;
