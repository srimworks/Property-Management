import React, { useState } from "react";
import { IMAGES } from "../utils/images";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { FOOTER_LIST } from "../utils/constant";

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      email: "",
    });
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="footer">
      <div className="footer-top-container">
        <div className="footer-top-heading-container">
          {FOOTER_LIST.map((item, index) => (
            <h3
              className={
                activeIndex === index
                  ? "footer-top-heading-active"
                  : "footer-top-heading"
              }
              key={index}
              onClick={() => setActiveIndex(index)}
            >
              {item.name}
            </h3>
          ))}
        </div>

        <div className="footer-top-body-container">
          {FOOTER_LIST[activeIndex].propertyList.map((item, index) => (
            <p className="footer-top-body" key={index}>
              {item}
            </p>
          ))}
        </div>
      </div>
      <hr className="sperator"/>
      <div className="footer-bottom-container">
        <div className="logo-social-media">
          <div className="logo-container">
            <img src={IMAGES.MAIN_LOGO} alt="main-logo" />
            <h1 className="logo-container-text">RealEstatePro</h1>
          </div>
          <div className="social-media-icons">
            <img src={IMAGES.FACEBOOK_ICON} />
            <img src={IMAGES.INSTAGRAM_ICON} />
            <img src={IMAGES.TWITTER_ICON} />
          </div>
        </div>

        <div className="column">
          <h1 className="links-heading">Properties</h1>
          <ul className="links">
            <Link to="/" className="link">
              <li className="links-body">Real Estate</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Rentals</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">PGs</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Commercial</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Luxury</li>
            </Link>
          </ul>
        </div>

        <div className="column">
          <h1 className="links-heading">Company</h1>
          <ul className="links">
            <Link to="/" className="link">
              <li className="links-body">Contact Us</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Careers</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Press</li>
            </Link>
            <Link to="/" className="link">
              <li className="links-body">Blog</li>
            </Link>
          </ul>
        </div>

        <div className="news-letter-container">
          <h1 className="newsletter-heading">Newsletter</h1>
          <p className="newsletter-text">
            Subscribe for the latest property updates
          </p>
          <form onSubmit={handleSubmit} className="news-letterform">
            <input
              // id="input"
              className="newsletter-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              onClick={stopPropagation}
              required
            />
            <button className="subscribe-btn">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
