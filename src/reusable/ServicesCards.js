import React from "react";
import "../styles/Home.css";

const ServicesCards = ({ heading, cards }) => {
  return (
    <div className="services-outer-container">
      <div className="services-conatiner">
        <h1 className="services-heading">{heading}</h1>
        <div className="services-card-conatiner">
          {cards.map((item, index) => {
            return (
              <div key={index} className="service-card">
                <img src={item.img} alt="icon" />
                <h2 className="service-card-text">{item.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesCards;
