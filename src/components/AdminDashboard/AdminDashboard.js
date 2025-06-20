import React, { useEffect, useState } from "react";
import "../../styles/AdminDashboard.css";
import AdminDashNavbar from "./AdminDashNavbar";
import { Outlet } from "react-router";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <AdminDashNavbar />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
