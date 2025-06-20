import React from "react";
import "../styles/NotificationCard.css";

const NotificationCard = ({title}) => {
  return (
    <div className="notifcation-card">
      <div className="profile-container">
        <img src="https://elireview.com/wp-content/uploads/2016/12/reed-profile-square.jpg" />
        <p className="notification-text">Alice</p>
      </div>
      <h3 className="notification-text-heading">{title}</h3>
      <p className="notification-text">Name: Mahal Teja</p>
      <p className="notification-text">Email: mahalteja@gmail.com</p>
      <p className="notification-text">Mobile: +91 7896543210</p>
    </div>
  );
};

export default NotificationCard;
