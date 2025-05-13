import React, { useState } from "react";
import { IMAGES } from "../../utils/images";
import { COUNTRY_DATA } from "../../utils/countryCodes";
import { Link } from "react-router";
import "../../styles/Signin.css";

const Number = ({ setFlowValue, formData, setFormData }) => {
  const [countryEmoji, setCountryEmoji] = useState("🇮🇳");
  const [countryCode, setcountryCode] = useState("+91");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const handleCountry = (code, emoji) => {
    setCountryEmoji(emoji);
    formData.country = code;
    setcountryCode(code);
    console.log(formData);
  };

  const handelSubmit = () => {
    console.log(formData.mobile.length + formData.country.length);
    if (formData.mobile.length + formData.country.length === 13) {
      setFlowValue((prev) => ++prev);
    } else {
      alert("Enter 10 Digit Mobile Number");
    }
  };

  //OnSubmit
  //API Call
  return (
    <div className="form-grid">
      <div className="phonenumber-field">
        <div className="country-container">
          <span className="country-text">{countryEmoji}</span>
          <select
            className="country-dropdown"
            name="country-selector"
            onChange={(e) =>
              handleCountry(
                JSON.parse(e.target.value).code,
                JSON.parse(e.target.value).flag
              )
            }
          >
            <option value="🇮🇳">{countryCode}</option>
            {COUNTRY_DATA.map((item) => (
              <option
                key={item.code}
                value={JSON.stringify({
                  flag: item.flag,
                  code: item.dial_code,
                })}
              >
                {item.dial_code}
              </option>
            ))}
          </select>
        </div>
        <input
          id="input-phone"
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter Your mobile number *"
          required
          maxLength={13 - formData.country.length}
        />
      </div>

      <p>We’ll send OTP for verification</p>
      <button type="submit" onClick={handelSubmit} className="primary-btn-100">
        Continue
      </button>
    </div>
  );
};

const OTP = ({ formData, setFlowValue }) => {
  const handleEdit = () => {
    setFlowValue(0);
  };
  return (
    <div className="form-grid">
      <div className="phone-number-edit">
        <input value={formData.mobile} disabled />
        <img src={IMAGES.EDIT_ICON} alt="Edit Icon" onClick={handleEdit} />
      </div>
      <h2 className="enter-otp">Enter OTP Here</h2>
      <input
        id="input-otp"
        type="text"
        name="otp"
        placeholder=""
        required
        maxLength="6"
      />
      <p className="resend-otp">Resend OTP</p>
      <button
        type="submit"
        className="primary-btn-100"
        onClick={() => setFlowValue((prev) => ++prev)}
      >
        Continue
      </button>
    </div>
  );
};

const Details = ({ setFormData ,setShowLogin}) => {
  const handleChange = (e) => {
    const [name, value] = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="details-container">
      <input
        type="text"
        name="name"
        onChange={handleChange}
        className="details-input"
        placeholder="Enter Name"
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        className="details-input"
        placeholder="Enter Email"
      />
      <button
        type="submit"
        className="primary-btn-100"
        onClick={() => setShowLogin(false)}
      >
        Submit
      </button>
    </div>
  );
};

const LoginPage = ({setShowLogin}) => {
  const [flowValue, setFlowValue] = useState(0);
  const Flow = [
    { name: "Number", component: Number },
    { name: "OTP", component: OTP },
    { name: "Details", component: Details },
  ];
  const ActiveTab = Flow[flowValue].component;

  const [formData, setFormData] = useState({ mobile: "", country: "+91" });
  console.log(formData);

  return (
    <div className="signin-container">
      <div className="signin-left-container">
        <img src={IMAGES.LOGIN_MAIN_FRAME} alt="logo-main-img" />
        <h1>Login / Sign up</h1>
        <p>
          <img src={IMAGES.CHECK_RIGHT_ICON} />
          Verified Listings Only
        </p>
        <p>
          <img src={IMAGES.CHECK_RIGHT_ICON} />
          Instant Property Matches
        </p>
        <p>
          <img src={IMAGES.CHECK_RIGHT_ICON} />
          Seamless Buying & Renting
        </p>
      </div>

      <div className="signin-right-container">
        
        <form className="form">
          <div className="close-icon-container"><img src={IMAGES.CLOSE_ICON} onClick={()=>setShowLogin(false)} alt="Close Icon"/></div>
          
          <h1>Enter phone to continue</h1>
          <ActiveTab
            setFlowValue={setFlowValue}
            formData={formData}
            setFormData={setFormData}
            setShowLogin={setShowLogin}
          />
        </form>

        <p>By continuing, you agree to our Terms & Conditions</p>
      </div>
    </div>
  );
};

export default LoginPage;
