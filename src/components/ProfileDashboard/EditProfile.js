import React from "react";
import "../../styles/EditProfile.css";
import { IMAGES } from "../../utils/images";

const EditProfile = () => {
  return (
    <div className="edit-profile-container">
      <div className="user-details">
        <div className="profile-img-container">
          <img src={IMAGES.AVATAR_ICON} alt="profile-img" />
        </div>
        <div className="input-fields-container">
          <input value="Mahal" disabled/>
          <input value="mahaltejapilla08@gmail.com" disabled/>
        </div>
      </div>

      <button className="details-btn">Edit Details</button>
      <div className="change-phonenumber">
        <h3>Change Phone Number</h3>
        <input placeholder="Phone"/>
        <button className="secondary-btn">Send OTP</button>
      </div>
    </div>
  );
};

export default EditProfile;
