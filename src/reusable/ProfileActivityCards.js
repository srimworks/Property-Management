import { IMAGES } from "../utils/images";
import "../styles/ProfileActivityCard.css";

const ProfileActivityCards = () => {
  return (
    <div className="profile-activity-card">
      <div className="profile-activity-image">
        <img src={IMAGES.INTERIOR_IMAGE} alt="Image" />
      </div>
      <div className="profile-activity-content">
        <div className="profile-activity-top-content">
          <p>₹20,000</p>
          <p>1 BHK Independent Builder Floor</p>
          <div className="row-stack">
            <p>Fully Furnished</p> <hr /> <p>180 sq.ft</p>
          </div>
        </div>
        <div className="profile-activity-bottom">
          <div className="profile-activity-btm-left">
            <h3>HP</h3>
            <div className="profile-activity-btm-stack">
              <p className="stack-heading">Housing Partner</p>
              <p className="stack-btm">Rented</p>
            </div>
          </div>
          <div className="profile-activity-btm-right">
            <div className="profile-activity-btm-stack">
              <p className="stack-btm">Phone Number</p>
              <p className="stack-heading">7799480509</p>
            </div>
            <button className="secondary-btn">Share Feedback</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfileActivityCards;
