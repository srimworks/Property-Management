import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { DASHBOARD_TABS } from "../../utils/constant";
import "../../styles/AdminDashNavbar.css";
import { IMAGES } from "../../utils/images";

const AdminDashNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="nav-logo">
          <h1 className="logo-text-admin">RealEstatePro</h1>
          <div className="account-name-container">
            <span className="profile-icon">MA</span>
            <p>Mahal</p>
          </div>
        </div>
        <div className="sidebar-items-container">
          {DASHBOARD_TABS.map((item, index) => (
            <div
              className={`sidebar-item ${
                location.pathname.includes(item.link) ? "active" : ""
              }`}
              key={item.id}
              onClick={() => navigate(item.link)}
            >
              <img src={item.Icon} className="sidebar-icon" />
              <p className="sidebar-text">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="logout-container" onClick={()=>navigate("/")}>
        <img src={IMAGES.LOGOUT_ICON} alt="Icon" /> Logout
      </div>
    </div>
  );
};

export default AdminDashNavbar;
