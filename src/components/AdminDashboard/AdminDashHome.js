import React, { useEffect, useState } from "react";
import NotificationCard from "../../reusable/NotificationCard";
import { useNavigate } from "react-router";
import { getLeaseList, getManagementList, getRentList, getSellList } from "../../services/api";

const AdminDashHome = () => {
  const [propertyStats, setPropertyStats] = useState({
    rent: 0,
    sell: 0,
    lease: 0,
    management: 0,
  });
  const navigate = useNavigate();

  const TotalPropertiesList = [
    { id: "for-rent", name: "For Rent", value: propertyStats.rent },
    { id: "for-sell", name: "For Sell", value: propertyStats.sell },
    { id: "for-lease", name: "For Lease", value: propertyStats.lease },
    {
      id: "for-management",
      name: "For Management",
      value: propertyStats.management,
    },
  ];

 const getData = async () => {
  let rent = 0;
  let sell = 0;
  let lease = 0;
  let management = 0;

  const rentResult = await getRentList();
  if (rentResult.success) {
    rent = rentResult.count;
  }

  const sellResult = await getSellList();
  if (sellResult.success) {
    sell = sellResult.count;
  }

  const leaseResult = await getLeaseList();
  if (leaseResult.success) {
    lease = leaseResult.count;
  }

  const managementResult = await getManagementList();
  if (managementResult.success) {
    management = managementResult.count;
  }

  setPropertyStats({
    rent,
    sell,
    lease,
    management,
  });
};


  useEffect(() => {
    getData();
  }, []);

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
            <button
              className="view-button"
              onClick={() => navigate("/admin/dashboard/manage-requests")}
            >
              {" "}
              View →
            </button>
          </div>
          <div className="notifications">
            <NotificationCard title={"Management Request"} />
            <NotificationCard title={"Management Request"} />
          </div>
        </div>
        <div className="notification-container">
          <div className="notification-container-top">
            <p className="admin-flex-heading">Properties Pending Approval</p>
            <button
              className="view-button"
              onClick={() => navigate("/admin/dashboard/property-requests")}
            >
              {" "}
              View →
            </button>
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
