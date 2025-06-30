import React, { useRef, useState } from "react";
import "../../styles/EditProfile.css";
import { IMAGES } from "../../utils/images";

const EditProfile = () => {
  const [isDisabled,setIsDisabled]=useState(true)
  const {fullName,email,phoneNumber}=JSON.parse(localStorage.getItem("user"))
  const nameRef=useRef(null)
  const emailRef=useRef(null)

  const handleDisable=()=>{
    console.log("first")
    setIsDisabled(!isDisabled)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(nameRef.current.value,emailRef.current.value)

    handleDisable()
  }
  return (
    <div className="edit-profile-container">
      <div className="user-details">
        <div className="profile-img-container">
          <img src={IMAGES.AVATAR_ICON} alt="profile-img" />
        </div>
        <form className="input-fields-container-edit" onSubmit={handleSubmit}>
          <input ref={nameRef} defaultValue={fullName} disabled={isDisabled}/>
          <input ref={emailRef}defaultValue={email} disabled={isDisabled}/>
          {!isDisabled &&<button type="submit" className="primary-btn">Submit</button>}
        </form>
      </div>

      <button className="details-btn" onClick={handleDisable}>{isDisabled?"Edit Details":"Cancel"}</button>
      <div className="change-phonenumber">
        <h3>Change Phone Number</h3>
        <input placeholder="Phone" defaultValue={phoneNumber}/>
        <button className="secondary-btn">Send OTP</button>
      </div>
    </div>
  );
};

export default EditProfile;
