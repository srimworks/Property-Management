import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { IMAGES } from "../utils/images.js";
import { Link, Outlet } from "react-router-dom";
import "../styles/Dashboard.css";
import { signOut } from "../firebase/auth";

const ProfileDashboardNav = () => {
  const [hamburgerActive, setHambuger] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location=useLocation()
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if not logged in
      window.location.hash="login";
    }
  }, [location]);
  
  const [tab, setTab] = useState(0)

  const handleTab = (index) => {
    setTab(index);
    setHambuger(false);
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  const DashboardTabs = [
    {
      name: "My Activity",
      link: "/profile",
      Icon: IMAGES.CHEVRON_RIGHT,
    },
    {
      name: "My Properties",
      link: "/profile/properties",
      Icon: IMAGES.MY_TRANSACTION_ICON,
    },
    {
      name: "Edit Profile",
      link: "/profile/edit-profile",
      Icon: IMAGES.EDIT_ICON,
    },
  ];
  const  pathname=window.location.pathname

  // console.log(pathname)

  return (
    <div className="dashboard-overall">
      <div className="dashboard-left-container">
        <div className="left-top-container">
          <div className="profile-img-container">
            <img src={IMAGES.AVATAR_ICON} alt="profile-img" />
          </div>
          <div className="profile-details-container">
            <h2 className="profile-name">{user?.fullName || 'User'}</h2>
            <h2 className="profile-email">{user?.email || user?.mobile || 'No contact info'}</h2>
          </div>
          <img src={IMAGES.HAMBURGER_ICON} onClick={()=>setHambuger(true)} alt="Hamburger Icon " className="hamburger"/>
        </div>
        <div className={hamburgerActive?"left-bottom-container-active":"left-bottom-container"}>
          <ul>
            {DashboardTabs.map((item, index) => {
              return (
                <Link to={item.link} key={item.name} className="link-100" onClick={handleTab}>
                  <li className={pathname===item.link ? "li-active":"li"}>
                    {item.name} <img src={IMAGES.CHEVRON_RIGHT} />
                  </li>
                </Link>
              );
            })}
          </ul>
          <li className="logout-container" onClick={handleLogout}> <img src={IMAGES.LOGOUT_ICON} alt="Icon"/> Logout </li> 
        </div>
      </div>
      <div className="dashboard-right-container">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileDashboardNav;
