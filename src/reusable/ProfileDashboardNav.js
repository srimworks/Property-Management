import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router';
// import { Link } from 'react-router';
import { IMAGES } from "../utils/images.js";
import { Link, Outlet } from "react-router";
import "../styles/Dashboard.css";

const ProfileDashboardNav = () => {
  const[hamburgerActive,setHambuger]=useState(false)
  // const [authenticated,setAuthenticated]=useState(null);
  // // const navigate=useNavigate()
  // useEffect(()=>{
  //   const loggedInUser=sessionStorage.getItem("authenticated");
  //   if (loggedInUser){
  //     setAuthenticated(loggedInUser)
  //   }
  //   // if(!loggedInUser){
  //   //   navigate("/signin")
  //   // }
  // },[])
  const [tab,setTab]=useState(0)

  const handleTab=()=>{
    setTab(index)
    setHambuger(false)
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
            <h2 className="profile-name">Teja</h2>
            <h2 className="profile-email">mahalteja01@gmail.com</h2>
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
          <li className="logout-container"> <img src={IMAGES.LOGOUT_ICON} alt="Icon"/> Logout </li> 
        </div>
      </div>
      <div className="dashboard-right-container">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileDashboardNav;
