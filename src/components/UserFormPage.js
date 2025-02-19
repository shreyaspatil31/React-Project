import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/UserFormPage.css";

const UserFormPage = () => {
  // Initialize formData from localStorage or set default empty values
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("userFormData");
    return savedData ? JSON.parse(savedData) : {
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
    };
  });

  // State to track if form has unsaved changes
  const [isDirty, setIsDirty] = useState(false);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (isDirty) {
      localStorage.setItem("userFormData", JSON.stringify(formData));
    }
  }, [formData, isDirty]);

  // Warn user before leaving the page if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Handle input changes and mark form as dirty (unsaved changes)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique ID if not already present
    if (!formData.id) {
      const newFormData = { ...formData, id: uuidv4() };
      setFormData(newFormData);
      localStorage.setItem("userFormData", JSON.stringify(newFormData));
    } else {
      localStorage.setItem("userFormData", JSON.stringify(formData));
    }
    
    setIsDirty(false);
    alert(`User data saved successfully!`);
  };

  // Reset form fields to default values
  const handleReset = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setIsDirty(false);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>User Data Form</h2>

        {/* Show alert if form has unsaved changes */}
        {isDirty && <div className="unsaved-changes-alert">You have unsaved changes</div>}

        <form onSubmit={handleSubmit}>
          {/* Display User ID if present */}
          {formData.id && (
            <div className="form-group">
              <label>User ID</label>
              <input
                type="text"
                value={formData.id}
                disabled
                className="user-id"
              />
            </div>
          )}

          {/* Input field for Full Name */}
          <div className="form-group">
            <label>Full Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input field for Email Address */}
          <div className="form-group">
            <label>Email Address*</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Input field for Phone Number */}
          <div className="form-group">
            <label>Phone Number*</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Textarea field for Address */}
          <div className="form-group">
            <label>Address*</label>
            <textarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Form buttons: Save and Reset */}
          <div className="form-buttons">
            <button type="submit" className="submit-button">Save Data</button>
            <button type="button" onClick={handleReset} className="reset-button">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormPage;
