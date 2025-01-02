import React, { useEffect, useState } from "react";
import "./Slot.css";
export const Slots = ({ slots, userId, date, refreshSlots }) => {
  const [bookingStatus, setBookingStatus] = useState("");
  const [futureSlots, setFutureSlots] = useState([]);

  const handleSlotBooking = async (slot) => {
    setBookingStatus("booking..");
    try {
      const response = await fetch(`http://localhost:4500/api/bookSlot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, date, slot }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);

        setBookingStatus("Slot booked successfully");
        refreshSlots();
      } else {
        setBookingStatus(data.message || "Failed to book slot");
      }
    } catch (error) {
      setBookingStatus("error while booking");
    } finally {
      setTimeout(() => setBookingStatus(""), 3000);
    }
  };
  const isSlotAvailable = (slot) => {
    const currentTime = new Date();
    const [start, end] = slot.split("-");
    const [startHour, startMinute] = start.split(":").map(Number);
    const slotDate = new Date(date);
    slotDate.setHours(startHour, startMinute, 0, 0);

    return slotDate > currentTime;
  };

  if (!slots.length) {
    return <p className="no-slots">No Slots available for the selected Date</p>;
  }
  return (
    <div>
      <h3>Available Slots</h3>
      <div className="slots-grid">
        {slots.map((item, index) => {
          const isAvailable = isSlotAvailable(item);
          return (
            <button
              style={{
                padding: "10px",
                backgroundColor: isAvailable ? "#4CAF50" : "#ccc", // Green for available slots, gray for passed slots
                cursor: isAvailable ? "pointer" : "not-allowed", // Show pointer for available slots, not allowed for passed
              }}
              key={index}
              className="slot-button"
              onClick={() => isAvailable && handleSlotBooking(item)} // Prevent booking for passed slots
              disabled={!isAvailable} // Disable button if slot time has passed
            >
              {item}
            </button>
          );
        })}
      </div>
      {bookingStatus && <p className="booking-status">{bookingStatus}</p>}
    </div>
  );
};
