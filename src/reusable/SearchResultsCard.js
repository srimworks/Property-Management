import React, { useState } from "react";
import "../styles/SearchResultsCard.css";
// import { IMAGES } from '../utils/images'
import { IMAGES } from "../utils/images";
import ContactDetails from "./contactDetails";
import { Link } from "react-router-dom";
const SearchResultsCard = () => {
  const [showContact,setShowContact]=useState(false)

  const handleShowContact=()=>{
    if(localStorage.getItem("user")){
      setShowContact(true)
    }
    else{
      window.location.hash="login"
    }
  }
  return (
    <div className="search-results-card">
      <div className="sr-card-top">
        <div className="sr-top-image">
          <img src={IMAGES.PROPERTY_IMAGE_1} alt="Image" />
        </div>
        <div className="sr-top-content">
          <div className="sr-top-price">
            <h2 className="sr-card-price">₹ 25,000</h2>
            <img src={IMAGES.SHARE_ICON} />
          </div>
          <div className="sr-card-details">
            <p className="sr-card-details-type">{"3 BHK Flat -"}</p>
            <p className="sr-card-details-location"> for rent in kukatpally</p>
          </div>
          <div className="sr-card-amenities">
            <div className="sr-card-amenity">
              <img src={IMAGES.PROJECT_ICON} alt="Icon" />
              <div className="sr-card-amenity-content">
                <p className="sr-card-amenity-heading">PROJECT NAME</p>
                <p className="sr-card-amenity-body">Lodha Meridian Super</p>
              </div>
            </div>
            <div className="sr-card-amenity">
              <img src={IMAGES.FURNISHING_ICON} alt="Icon" />
              <div className="sr-card-amenity-content">
                <p className="sr-card-amenity-heading">FURNISHING</p>
                <p className="sr-card-amenity-body">Fully Furnished</p>
              </div>
            </div>
            <div className="sr-card-amenity">
              <img src={IMAGES.BUILTUP_AREA_ICON} alt="Icon" />
              <div className="sr-card-amenity-content">
                <p className="sr-card-amenity-heading">BUILT UP AREA</p>
                <p className="sr-card-amenity-body">2214 sq.ft</p>
              </div>
            </div>
          </div>
          <div className="sr-card-special-highlights">
            <h3 className="sr-card-special-heading">Special Highlights</h3>
            <div className="sr-card-special-body">
              <div className="sr-card-special">
                <img src={IMAGES.SELECTED_ICON} alt="Icon" />
                <p className="sr-card-special-text">Close to Hospital</p>
              </div>
              <div className="sr-card-special">
                <img src={IMAGES.SELECTED_ICON} alt="Icon" />
                <p className="sr-card-special-text">Close to Mall</p>
              </div>
              <div className="sr-card-special">
                <img src={IMAGES.SELECTED_ICON} alt="Icon" />
                <p className="sr-card-special-text">Close to Movie Theater</p>
              </div>
            </div>
          </div>

          <p className="sr-card-desc">
            Write few lines about your property something which is special and
            ma
          </p>
        </div>
      </div>
      <div className="sr-card-bottom">
        <div className="sr-card-bottom-left">
          <img src={IMAGES.AVATAR} />
          <div className="sr-card-b-left-content">
            <h3 className="sr-card-b-left-heading">MK HOMES</h3>
            <p className="sr-card-b-left-body">Housing Prime Agent</p>
            <p className="sr-card-b-left-body">5 days ago</p>
          </div>
        </div>
        <div className="sr-card-bottom-right">
          <Link to="/single-product-page">
          <button className="secondary-btn">View more details</button>
          </Link>
          <button className="primary-btn" onClick={handleShowContact}>Contact Seller</button>
        </div>
      </div>
      {showContact && <ContactDetails close={setShowContact} />}
    </div>
  );
};

export default SearchResultsCard;
