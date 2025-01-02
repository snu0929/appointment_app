import React, { useState } from "react";
import "./UserForm.css";
export const UserForm = ({ setUserId }) => {
  const [name, setName] = useState("");
  const handleSubmit = () => {
    if (!name.trim()) {
      alert("please enter a name");
    }
    setUserId(name.trim());
  };
  return (
    <div className="userform-container">
      <h2 className="userform-title">Enter Your Name</h2>
      <input
        type="text"
        className="userform-input"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className={`userform-button ${!name.trim() ? "disabled" : ""}`}
        onClick={handleSubmit}
        disabled={!name.trim()}
      >
        Next
      </button>
    </div>
  );
};
