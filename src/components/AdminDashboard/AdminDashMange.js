import React, { useState } from "react";
import "../../styles/AdminDashManage.css";
import ContactDetails from "../../reusable/ContactDetails.js";

const data = [
  {
    profile: "Alice",
    name: "Management Request",
    description:
      "Name: Mahal Teja Email: mahalteja@gmail.com Mobile: +91 78965...",
  },
  // Repeat the same object for demonstration
  {
    profile: "Alice",
    name: "Management Request",
    description:
      "Name: Mahal Teja Email: mahalteja@gmail.com Mobile: +91 78965...",
  },
  {
    profile: "Alice",
    name: "Management Request",
    description:
      "Name: Mahal Teja Email: mahalteja@gmail.com Mobile: +91 78965...",
  },
  {
    profile: "Alice",
    name: "Management Request",
    description:
      "Name: Mahal Teja Email: mahalteja@gmail.com Mobile: +91 78965...",
  },
  {
    profile: "Alice",
    name: "Management Request",
    description:
      "Name: Mahal Teja Email: mahalteja@gmail.com Mobile: +91 78965...",
  },
];

const AdminDashMange = () => {
  const [showContactDetails, setShowContactDetails] = useState(false);
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
            <tr key={idx} onClick={()=>setShowContactDetails(true)}>
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
              <td className="options-cell" >
                <span className="check-icon">👁</span>
                <button className="view-link">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showContactDetails && <ContactDetails close={setShowContactDetails} />}
    </div>
  );
};

export default AdminDashMange;
