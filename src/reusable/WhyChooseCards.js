import React from "react";
import "../styles/Home.css";
import { IMAGES } from "../utils/images";

const WhyChooseCards = ({ heading, cards }) => {
  return (
    <div className="why-choose-container">
      <h1 className="why-choose-heading">{heading}</h1>
      <div className="why-choose-card-container">
        {cards.map((item, index) => {
          return (
            <div key={index} className="why-choose-card">

                <img src={item.icon} alt="icon" />
                <h2 className="why-choose-card-heading">{item.title}</h2>
                <p className="why-choose-card-body">{item.content}</p>

                <img src={IMAGES.WHY_CHOOS_SVG} className="why-choose-svg"/>
       
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyChooseCards;
