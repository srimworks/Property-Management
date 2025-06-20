import React, { useEffect, useState } from "react";
import NotificationCard from "../../reusable/NotificationCard";
import { useNavigate } from "react-router";

const TotalPropertiesList = [
  {
    id: "for-rent",
    name: "For Rent",
    value: "1560",
  },
  {
    id: "for-sell",
    name: "For Sell",
    value: "125",
  },
  {
    id: "for-lease",
    name: "For Lease",
    value: "65",
  },
  {
    id: "for-management",
    name: "For Management",
    value: "560",
  },
];

const AdminDashHome = () => {
  const navigate=useNavigate()


  return (
    <div className="outlet-admin">
      <div className="admin-flex-col-container">
        <h3 className="admin-flex-heading">Total Properties</h3>
        <div className="total-properties-cards">
          {TotalPropertiesList.map((item) => (
            <div className="property-info-card" key={item.id}>
              <p className="property-info-card-heading">{item.name}</p>
              <p className="property-info-card-body">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="notifications-container">
        <div className="notification-container">
          <div className="notification-container-top">
            <p className="admin-flex-heading">Management Requests</p>
            <button className="view-button" onClick={()=>navigate("/admin/dashboard/manage-requests")}> View →</button>
          </div>
          <div className="notifications">
            <NotificationCard title={"Management Request"}/>
            <NotificationCard title={"Management Request"}/>
          </div>
        </div>
        <div className="notification-container">
          <div className="notification-container-top">
            <p className="admin-flex-heading">Properties Pending Approval</p>
            <button className="view-button" onClick={()=>navigate("/admin/dashboard/property-requests")}> View →</button>
          </div>
          <div className="notifications">
            <NotificationCard title={"1 BHK For Rent"} />
            <NotificationCard title={"1 BHK For Rent"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashHome;
