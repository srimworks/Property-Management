import React, { useState } from "react";
import "../styles/SingleProductPage.css";
import { IMAGES } from "../utils/images";
import GoogleMap from "../reusable/GoogleMap";
import { Link } from "react-router-dom";
import SuggestionCard from "../reusable/SuggestionCard";
import CheckEmi from "../reusable/CheckEmi";

const SingleProductPage = () => {
  const [showEmi,setShowEmi]=useState(false)

  return (
    <div className="outlet-render">
      <div className="product-hero-section">
        <div className="breadcrumbs-container">
          <p className="breadcrumbs">
            Home / Hyderabad/Kukatpally/apartment in Kukatpally/ 1BHK for rent
          </p>
          <p className="breadcrumbs">Last updated: Feb 15, 2025</p>
        </div>
        <div className="listing-info">
          <div className="listing-details">
            <div className="listing-title-conatiner">
              <h3 className="listing-title">1 BHK for Rent</h3>
              <img src={IMAGES.SHARE_ICON} alt="Share Icon" />
            </div>
            <p className="breadcrumbs">Fully Furnished 585.00 sq.ft</p>
            <p className="breadcrumbs">Road No.3 KPHB Phase 3</p>
          </div>
          <div className="price-info">
            <h4 className="price-info-heading">₹ 25,000</h4>
            <p className="breadcrumbs">added 5 days ago</p>
            <button className="primary-btn">Contact</button>
          </div>
        </div>
        <div className="product-image-container">
          <div className="image-1"></div>
          <div className="images-container">
            <div className="image-2"></div>
            <div className="image-3"></div>
          </div>
        </div>
      </div>
      <div className="property-highlights">
        <div className="property-single-section">
          <h2 className="property-heading">Property Highlights</h2>
          <div className="property-highlights-details">
            <div className="property-highlight-item">
              <img src={IMAGES.SELECTED_ICON} alt="Selected icon" />
              <p>Close to Hospital</p>
            </div>
            <div className="property-highlight-item">
              <img src={IMAGES.SELECTED_ICON} alt="Selected icon" />
              <p>Close to Mall</p>
            </div>
            <div className="property-highlight-item">
              <img src={IMAGES.SELECTED_ICON} alt="Selected icon" />
              <p>Close to Movie Theater</p>
            </div>
          </div>
        </div>
        <div className="property-single-section">
          <div className="property-address-container-with-icon">
            <img src={IMAGES.PROPERTY_LOCATION} alt="Icon" />
            <div className="property-address-container">
              <p>Property Location</p>
              <h3>Ayyappa society, Sri Rama Colony, Madhapur, Hyderabad</h3>
            </div>
          </div>
          <div className="around-property-section">
            <h3>Around This Property</h3>
            <div className="around-this-container">
              <div className="around-this-card">
                <div className="around-this-card-heading">School</div>
                <div className="around-this-card-body">
                  <h2>Ravindra Bharathi School - Madhapur</h2>
                  <div className="around-this-card-right">
                    <h4>2 mins</h4>
                    <p>(0.9 km)</p>
                  </div>
                </div>
              </div>
              <div className="around-this-card">
                <div className="around-this-card-heading">School</div>
                <div className="around-this-card-body">
                  <h2>Ravindra Bharathi School - Madhapur</h2>
                  <div className="around-this-card-right">
                    <h4>2 mins</h4>
                    <p>(0.9 km)</p>
                  </div>
                </div>
              </div>
              <div className="around-this-card">
                <div className="around-this-card-heading">School</div>
                <div className="around-this-card-body">
                  <h2>Ravindra Bharathi School - Madhapur</h2>
                  <div className="around-this-card-right">
                    <h4>2 mins</h4>
                    <p>(0.9 km)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            to="https://www.google.com/maps?q=$Ayyappa society, Sri Rama Colony, Madhapur, Hyderabad&t=k"
            target="_blank"
            className="link-100"
          >
            <h2 className="view-more-on-maps">View more on Maps</h2>
          </Link>
        </div>
        <div className="property-single-section">
          <h3 className="overview-title">Overview</h3>
          <hr className="horizontal-line" />
          <div className="overview-details-container">
            <div className="overview-item">
              <p className="overview-item-heading">Security</p>
              <p className="overview-item-body">₹ 50,000</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Brokerage</p>
              <p className="overview-item-body">₹ 12,500</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Built up area</p>
              <p className="overview-item-body">585 sq.ft</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Furnishing</p>
              <p className="overview-item-body">Fully Furnished</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Bathrooms</p>
              <p className="overview-item-body">1</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Balcony</p>
              <p className="overview-item-body">1</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Available from</p>
              <p className="overview-item-body">Available now</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Floor number</p>
              <p className="overview-item-body">2 of 6 floors</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Lease type</p>
              <p className="overview-item-body">Family / Bachelor</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Age of property</p>
              <p className="overview-item-body">3 years</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Parking</p>
              <p className="overview-item-body">1 Open Parking</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Main entrance facing</p>
              <p className="overview-item-body">North</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Gas Pipeline</p>
              <p className="overview-item-body">No</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Gate Community</p>
              <p className="overview-item-body">No</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Carpet area</p>
              <p className="overview-item-body">458 sq.ft</p>
            </div>
            <div className="overview-item">
              <p className="overview-item-heading">Price Negotiable</p>
              <p className="overview-item-body">No</p>
            </div>
            <p className="about-this-property">About this property</p>
            <p className="about-this-property-body">
              1bhk Fully furnished flat is available in ayyappa society madhapur
              Hyderabad it is available with lights fans cupboard geyser ac
              washing machine tv fridge sofa with lift and bike parking
            </p>
            <hr className="horizontal-line" />
            <button className="secondary-btn"> Share Property </button>
          </div>
        </div>
        <div className="property-single-section">
          <h3 className="furnishing-heading">Need Home Loan?</h3>
          <hr className="horizontal-line" />
          <div className="furnishing-icons-container emi">
            <div className="furnishing-icon-container">
              <p className="furnishing-heading"> 1.52 Lacs/Month</p>
              <p className="icon-name">Estimated EMI</p>
              {
                showEmi && <CheckEmi close={setShowEmi}/>
              }
            </div>
            <button className="secondary-btn" onClick={()=>setShowEmi(true)}>Check EMI</button>
          </div>
        </div>
        <div className="property-single-section">
          <h3 className="furnishing-heading">Furnishing & Amenities</h3>
          <hr className="horizontal-line" />
          <div className="furnishing-icons-container">
            <div className="furnishing-icon-container">
              <span className="material-symbols-outlined">kitchen</span>
              <p className="icon-name">Fridge</p>
            </div>
            <div className="furnishing-icon-container">
              <span className="material-symbols-outlined">
                climate_mini_split
              </span>
              <p className="icon-name">AC</p>
            </div>
            <div className="furnishing-icon-container">
              <span className="material-symbols-outlined">
                local_laundry_service
              </span>
              <p className="icon-name">Washing Machine</p>
            </div>
            <div className="furnishing-icon-container">
              <span className="material-symbols-outlined">elevator</span>
              <p className="icon-name">Lift</p>
            </div>
            <div className="furnishing-icon-container">
              <span className="material-symbols-outlined">local_parking</span>
              <p className="icon-name">Parking</p>
            </div>
          </div>
        </div>
        <div className="property-single-section">
          <h3 className="furnishing-heading">
            Tour this Property: Images & Videos
          </h3>
          <hr className="horizontal-line" />
          <div className="property-images-container">
            <img src={IMAGES.PROPERTY_IMAGE_1} className="Property Image" />
            <img src={IMAGES.PROPERTY_IMAGE_2} className="Property Image" />
            <img src={IMAGES.PROPERTY_IMAGE_3} className="Property Image" />
            <img src={IMAGES.PROPERTY_IMAGE_1} className="Property Image" />
            <img src={IMAGES.PROPERTY_IMAGE_2} className="Property Image" />
            <img src={IMAGES.PROPERTY_IMAGE_3} className="Property Image" />
          </div>
        </div>
        <div className="property-single-section">
          <h3 className="furnishing-heading">
            Explore Neighbourhood - Map View
          </h3>
          <hr className="horizontal-line" />
          <GoogleMap
            position={"Ayyappa society, Sri Rama Colony, Madhapur, Hyderabad"}
          />
        </div>
        <div className="property-single-section">
          <h3 className="furnishing-heading">Flats Near Madhapur</h3>
          <hr className="horizontal-line" />
          <div className="property-images-container">
            <SuggestionCard/>
            <SuggestionCard/>
            <SuggestionCard/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
