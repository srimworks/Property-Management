import React, { useState } from "react";
import { Link } from 'react-router'
import { IMAGES } from "../utils/images";
import "../styles/contact.css";
import { COUNTRY_DATA } from "../utils/countryCodes";

const ContactForm = () => {
  const [countryEmoji, setCountryEmoji] = useState("🇮🇳");
  const [countryCode, setcountryCode] = useState("+91");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile:"",
    location: "",
    Management: "",
    country:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };
  const handleCountry=(code,emoji)=>{
    setCountryEmoji(emoji);
    formData.country=code
    console.log(formData)

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      fullname: "",
      email: "",
      mobile: "",
      location: "",
      management: "",
      country:""
    });
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="contact-section">
      <div className="contact-left">
        <div className="get-in-touch">
          <h4 className="get-in-touch-heading">Get in Touch</h4>
          <h1 className="get-in-touch-title">Let’s chat. Reach out to us.</h1>
          <p className="get-in-touch-content">
            Have questions or feedback? We’re here to help. Send us a message,
            and we’ll respond within 24 Hours
          </p>
        </div>
        <hr className="line" />
        <div className="contact-input">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-grid">
              <input
                id="input"
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter Your Name *"
                onClick={stopPropagation}
                required
              />

              {/* <label id="input-label">Email *</label> */}
              <input
                id="input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email *"
                onClick={stopPropagation}
                required
              />

              {/* <label id="input-label">Mobile Number *</label> */}
              {/* <div > <span className="country-text">{countryEmoji}</span>{countryCode} <img src={IMAGES.CHEVRON_DOWN}/></div> */}
              <div className="phonenumber-field">
              <div className="country-container">
                <span className="country-text">{countryEmoji}</span>
                <select
                  className="country-dropdown"
                  name="country-selector"
                  onChange={(e)=>handleCountry(JSON.parse(e.target.value).code,JSON.parse(e.target.value).flag)}
                >
                  <option value="🇮🇳">{countryCode}</option>
                  {COUNTRY_DATA.map((item) => (
                    <option key={item.code} value={JSON.stringify({"flag":item.flag,"code":item.dial_code})}  >{item.dial_code}</option>
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
                onClick={stopPropagation}
                required
              />
              </div>

              {/* <label id="input-label">Course</label> */}
              <input
                id="input"
                type="text"
                name="location"
                value={formData.course}
                onChange={handleChange}
                placeholder="Location*"
                onClick={stopPropagation}
                required
              />

              {/* <label id="input-label">Message *</label> */}
              <input
                id="input"
                name="management"
                value={formData.message}
                onChange={handleChange}
                placeholder="Management Details*"
                onClick={stopPropagation}
                required
              ></input>

              <div className="check">
                <input
                  type="checkbox"
                  id="Accept_Privacy"
                  name="Privacy"
                  value="Checked"
                ></input>
                <p className="check-text">
                  I agree to our{" "}
                  <Link className="privacy"> privacy policy </Link>
                </p>
              </div>

              <button
                type="submit"
                onClick={(e) => e.stopPropagation()}
                className="request-submit-btn"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="contact-rigth">
        <div className="contact-rigth-image">
          <img src={IMAGES.CONTACT_MAIN} alt="img" />
        </div>
        <div className="contact-right-image-bottom">
          <div className="contact-mail-part">
            <img src={IMAGES.MAIL_ICON} alt="mail-icon" />
            <div className="contact-mail-overall">
              <h1 className="contact-mail-heading">Email</h1>
              <p className="contact-mail-content">info@property.com</p>
            </div>
          </div>
          <div className="contact-mail-part">
            <img src={IMAGES.CALL_ICON} alt="phone-icon" />
            <div className="contact-mail-overall">
              <h1 className="contact-mail-heading">Phone</h1>
              <p className="contact-mail-content">+91 (080) 6218-0277</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
