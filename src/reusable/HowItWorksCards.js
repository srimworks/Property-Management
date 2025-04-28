import React from "react";

const HowItWorksCards = ({ heading, cards }) => {
  return (
    <div className="how-it-works-container">
      <h1 className="how-it-works-heading">{heading}</h1>
      <div className="how-it-works-card-container">
        {cards.map((item, index) => {
          return (
            <div key={index} className="how-card">
              <img src={item.icon} alt="icon" />
              <div className="how-card-content">
                <h2 className="how-card-heading">{item.title}</h2>
                <p className="how-card-body">{item.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItWorksCards;
