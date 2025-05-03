import React from "react";
import "../styles/SearchResultsCard.css";
// import { IMAGES } from '../utils/images'
import { IMAGES } from "../utils/images";

const ProfileActivityCards = () => {
  return (
    <div className="search-results-card">
      <div className="sr-card-top">
        <div className="sr-top-image">
          <img src={IMAGES.SEARCHRESULTS_IMAGE} alt="Image" />
        </div>
        <div className="sr-top-content">
          <div className="sr-top-price">
            <h2 className="sr-card-price">₹ 25,000</h2>
            {/* <img src={IMAGES.SHARE_ICON} /> */}
          </div>
          <div className="sr-card-details">
            <p className="sr-card-details-type">
              1 BHK Independent Builder Floor
            </p>
            {/* <p className='sr-card-details-location'> for rent in kukatpally</p> */}
          </div>

          <div className="sr-card-bottom-left">
            <img src={IMAGES.AVATAR} />
            <div className="sr-card-b-left-content">
              <h3 className="sr-card-b-left-heading">Housing Partner</h3>
              <p className="sr-card-b-left-body">Owner</p>
              {/* <p className='sr-card-b-left-body'>5 days ago</p> */}
            </div>
          </div>
          <div className="sr-card-bottom-right">
            {/* <button className="secondary-btn">View more details</button> */}
            <p>Phone Number</p>
            <h2>7799480509</h2>
            <button className="primary-btn">Share Feedback</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileActivityCards;
