import React, { useState } from "react";
import { Slots } from "./Slots";
import "./Booking.css";

export const Booking = ({ userId }) => {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSlots = async (selectedDate) => {
    setLoading(true);
    setError("");
    const utcDate = new Date(selectedDate).toISOString().split("T")[0];
    try {
      const response = await fetch(
        `https://appointment-app-imai.onrender.com/api/slots?date=${utcDate}`
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.availableSlots);
        setSlots(data.availableSlots);
      } else {
        setError(data.error || "Failed to fetch slots");
      }
    } catch (error) {
      setError("failed to fetch slots");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (selectedDate) {
      fetchSlots(selectedDate);
    }
  };

  return (
    <div className="booking-container">
      <h2>
        Welcome,{" "}
        <span style={{ color: "royalblue", fontSize: "35px" }}>{userId}</span>
      </h2>
      <h3>Select a Date for Your Appointment</h3>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        min={new Date().toISOString().split("T")[0]}
        className="date-picker"
        max={
          new Date(
            new Date().setDate(new Date().getDate() + 5) // Default 5 days
          )
            .toISOString()
            .split("T")[0]
        }
      />
      {loading && <p className="loading">Loading slots....</p>}
      {error && (
        <p className="error" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {!loading && !error && date && (
        <Slots
          slots={slots}
          userId={userId}
          date={date}
          refreshSlots={() => fetchSlots(date)}
        />
      )}
    </div>
  );
};
