import { useState } from "react";
import "../styles/PropertyManagement.css";

const PropertyManagement = ({setPopUp}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleInterested = () => {
    if(localStorage.getItem("user")){console.log("User interested in property management");
    setSubmitted(true);
    setTimeout(() => setPopUp(false), 2000);}
    else{
        window.location.hash="login"
    }
  };

  const handleClose = () => {
    setPopUp(false);
  };

  return (
    <div className="propertymanagement-popoup">
      <div className="pm-popup-container">
        <button
          onClick={handleClose}
          className="pm-popup-close-btn"
          aria-label="Close popup"
        >
          &times;
        </button>

        {!submitted ? (
          <>
            <div className="pm-popup-header">
              <h3 className="pm-popup-title">
                Simplify Property Management with Us!
              </h3>
              <p className="pm-popup-text">
                Tired of handling tenant issues, rent collection, and
                maintenance alone? Let us take the stress off your shoulders!
              </p>
            </div>

            <div className="pm-benefits-list">
              <div className="pm-benefit-item">
                <div className="pm-checkmark">✓</div>
                <p className="pm-benefit-text">Hassle-free rent collection</p>
              </div>
              <div className="pm-benefit-item">
                <div className="pm-checkmark">✓</div>
                <p className="pm-benefit-text">
                  Tenant screening & legal agreements
                </p>
              </div>
              <div className="pm-benefit-item">
                <div className="pm-checkmark">✓</div>
                <p className="pm-benefit-text">
                  Maintenance & repair coordination
                </p>
              </div>
              <div className="pm-benefit-item">
                <div className="pm-checkmark">✓</div>
                <p className="pm-benefit-text">Dedicated property manager</p>
              </div>
            </div>

            <div className="pm-button-group">
              <button onClick={handleInterested} className="primary-btn-100">
                Interested
              </button>
              <button onClick={handleClose} className="secondary-btn _100">
                Maybe Later
              </button>
            </div>
          </>
        ) : (
          <div className="pm-success-container">
            <div className="pm-success-icon">
              <svg
                className="pm-success-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="pm-success-title">Thank you!</h3>
            <p className="pm-success-text">
              We'll contact you shortly with more details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyManagement;
