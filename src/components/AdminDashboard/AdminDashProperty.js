import React, { useEffect, useRef, useState } from "react";
import SingleProductPage from "../SingleProductPage.js";
import "../../styles/AdminDashManage.css";
import {
  approveProperty,
  getPendingPropertiesList,
  rejectProperty,
} from "../../services/api.js";

const AdminDashProperty = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState([]);
  const [propertyId, setpropertyId] = useState(null);
  const comment = useRef();

  const getProperties = async () => {
    const result = await getPendingPropertiesList();
    if (result.success) {
      setData(result.properties);
    }
    console.log(result);
  };

  const handleAccept = async () => {
    const result = await approveProperty(propertyId);
    if (result) setShowDetails(false);
    else alert("Error Please Try Again");
  };

  const handleReject = async (e) => {
    e.preventDefault();
    console.log(propertyId,comment.current.value)
    const result = await rejectProperty(propertyId,comment.current.value);
    if (result) setShowDetails(false);
    else alert("Error Please Try Again");
  };

  useEffect(() => {
    getProperties();
  }, []);
  return (
    <div className="outlet-admin">
      <table className="property-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Title</th>
            <th>Description</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={idx}
              onClick={() => {
                setShowDetails(true);
                setpropertyId(item.id);
              }}
            >
              <td className="profile-cell">
                <img
                  src="https://i.pravatar.cc/30"
                  alt="avatar"
                  className="avatar"
                />
                <span>{item.ownerName}</span>
              </td>
              <td className="bold-text">{item.title}</td>
              <td>{item.description}</td>
              <td className="options-cell">
                <span className="check-icon">👁</span>
                <button className="view-link">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDetails && (
        <div className="single-productpagepopup">
          <span
            className="material-symbols-outlined arrow"
            onClick={() => setShowDetails(false)}
          >
            close
          </span>
          <SingleProductPage className="single-product-popup-inner" />

          <div className="pop-up-btns-container">
            <button onClick={handleAccept} className="primary-btn">
              Accept
            </button>
            <form onSubmit={handleReject} className="reject-form">
              <input
                ref={comment}
                placeholder="Enter Comment to Reject"
                required
              />
              <button className="primary-btn red">Reject</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashProperty;
