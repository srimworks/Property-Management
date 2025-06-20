import React, { useState } from "react";
import SingleProductPage from "../SingleProductPage.js";
import "../../styles/AdminDashManage.css";

const data = [
  {
    profile: "Alice",
    name: "1 BHK For Rent",
    description:
      "Name: Mahal Teja Email: mahalteja@gmail.com Mobile: +91 78965...",
  },
  // Repeat the same object for demonstration
  {
    profile: "Alice",
    name: "1 BHK For Rent",
    description:
      "Name: Mahal Teja Email: mahalteja@gmail.com Mobile: +91 78965...",
  },
  {
    profile: "Alice",
    name: "1 BHK For Rent",
    description:
      "Name: Mahal Teja Email: mahalteja@gmail.com Mobile: +91 78965...",
  },
  {
    profile: "Alice",
    name: "1 BHK For Rent",
    description:
      "Name: Mahal Teja Email: mahalteja@gmail.com Mobile: +91 78965...",
  },
  {
    profile: "Alice",
    name: "1 BHK For Rent",
    description:
      "Name: Mahal Teja Email: mahalteja@gmail.com Mobile: +91 78965...",
  },
];
const AdminDashProperty = () => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="outlet-admin">
      <table className="property-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Description</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} onClick={() => setShowDetails(true)}>
              <td className="profile-cell">
                <img
                  src="https://i.pravatar.cc/30"
                  alt="avatar"
                  className="avatar"
                />
                <span>{item.profile}</span>
              </td>
              <td className="bold-text">{item.name}</td>
              <td>{item.description}</td>
              <td className="options-cell">
                <span className="check-icon">👁</span>
                <button className="view-link">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      { showDetails &&
        <div className="single-productpagepopup">
          <span  className="material-symbols-outlined arrow" onClick={()=>setShowDetails(false)}>
            close
          </span>
          <SingleProductPage className="single-product-popup-inner" />

          <div className="pop-up-btns-container">
            <button onClick={()=>setShowDetails(false)} className="primary-btn">Accept</button>
            <button onClick={()=>setShowDetails(false)} className="primary-btn red">Reject</button>
          </div>
        </div>
      }
    </div>
  );
};

export default AdminDashProperty;
