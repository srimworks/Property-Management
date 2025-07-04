import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";
import AdminDashNavbar from "./AdminDashNavbar";
import { Outlet } from "react-router";

const AdminDashboard = () => {
  
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(()=>{
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize); 

    return () => window.removeEventListener("resize", handleResize);

  },[])
  if (!isDesktop) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "30vh",
          padding: "20px",
          fontSize: "1.2rem",
          fontFamily:"Poppins",
        }}
      >
        <p>This application is not available on mobile devices.</p>
        <p>Please open it on a desktop or larger screen.</p>
      </div>
    );
  }
  return (
    <div className="dashboard-container">
      <AdminDashNavbar />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
