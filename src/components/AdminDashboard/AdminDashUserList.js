import React, { useState } from "react";
import "../../styles/AdminUserList.css";

const initialUsers = [
  { name: "Alice", email: "alice@example.com", phone: "+91 98765 43210" },
  { name: "Bob", email: "bob@example.com", phone: "+91 87654 32109" },
];
const AdminDashUserList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editIndex, setEditIndex] = useState(null);

  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const openAddUserModal = () => {
    setForm({ name: "", email: "", phone: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditUserModal = (user, index) => {
    setForm(user);
    setEditIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const confirmDeleteUser = (index) => {
    setConfirmDeleteIndex(index);
  };

  const handleDeleteConfirmed = () => {
    const updated = [...users];
    updated.splice(confirmDeleteIndex, 1);
    setUsers(updated);
    setConfirmDeleteIndex(null);
  };

  const handleSave = () => {
    if (form.name && form.email && form.phone) {
      const updatedUsers = [...users];
      if (isEditing) {
        updatedUsers[editIndex] = form;
      } else {
        updatedUsers.push(form);
      }
      setUsers(updatedUsers);
      setShowModal(false);
      setForm({ name: "", email: "", phone: "" });
    }
  };
  return (
    <div className="outlet-admin">
      <h2 className="userlist-heading">Users List</h2>
      <button className="adduser-btn" onClick={openAddUserModal}>
        + Add User
      </button>

      <table className="userlist-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => openEditUserModal(user, idx)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => confirmDeleteUser(idx)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="userlist-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div className="userlist-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{isEditing ? "Edit User" : "Add New User"}</h3>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <button className="userlist-submit-btn" onClick={handleSave}>
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      )}

      
      {confirmDeleteIndex !== null && (
        <div
          className="userlist-modal-overlay"
          onClick={() => setConfirmDeleteIndex(null)}
        >
          <div className="userlist-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{users[confirmDeleteIndex].name}</strong>?
            </p>
            <div className="confirm-btns">
              <button
                className="cancel-btn"
                onClick={() => setConfirmDeleteIndex(null)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleDeleteConfirmed}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashUserList;
