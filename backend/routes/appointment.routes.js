const express = require("express");

const { Appointment } = require("../models/appointment.model");

const router = express.Router();
require("dotenv").config();

const isDateWithinWindow = (selectedDate) => {
  const windowDays = parseInt(process.env.BOOKING_WINDOW_DAYS, 10) || 5;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(selectedDate);
  targetDate.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  // maxDate.setHours(0, 0, 0, 0);
  maxDate.setDate(today.getDate() + windowDays);
  return targetDate >= today && targetDate <= maxDate;
};

router.get("/slots", async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: "Date query parameter is required" });
  }
  if (!isDateWithinWindow(date)) {
    return res.status(400).json({
      error: `Date must be within ${
        process.env.BOOKING_WINDOW_DAYS || 5
      } days from today.`,
    });
  }

  try {
    const bookedSlots = await Appointment.find({ date }).select("slot -_id");
    const allSlots = [
      "09:00-09:30",
      "09:30-10:00",
      "10:00-10:30",
      "10:30-11:00",
      "11:00-11:30",
      "11:30-12:00",
      "12:00-12:30",
      "12:30-01:00",
      "01:00-01:30",
      "01:30-02:00",
      "02:00-02:30",
      "02:30-03:00",
      "03:00-03:30",
      "03:30-04:00",
      "04:00-04:30",
      "04:30-05:00",
    ];

    let availableSlots = allSlots.filter(
      (slot) => !bookedSlots.some((booked) => booked.slot === slot)
    );
    const today = new Date();
    if (date === today) {
      const currentTime = new Date(); // Get current time in UTC ISO format

      // Filter slots based on current time
      availableSlots = availableSlots.filter((slot) => {
        const [startHour, startMinute] = slot
          .split("-")[0]
          .split(":")
          .map(Number);
        const slotDate = new Date(); // Create a new Date object
        slotDate.setUTCHours(startHour, startMinute, 0, 0); // Set the slot time in UTC

        console.log(
          `Slot: ${slot}, Slot Date (UTC): ${slotDate}, Current Time (UTC): ${currentTime}`
        );

        return slotDate > currentTime; // Compare the UTC times
      });
    }

    console.log("All Slots:", allSlots);
    console.log("Booked Slots:", bookedSlots);
    console.log("Available Slots after filtering:", availableSlots);

    res.status(200).json({ date, availableSlots });
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "failed to fetch" });
  }
});

router.post("/bookSlot", async (req, res) => {
  const { userId, date, slot } = req.body;
  if (!userId || !date || !slot) {
    return res.status(404).json({ error: "userId,date and slot are required" });
  }

  try {
    const exisitingAppointment = await Appointment.findOne({ date, slot });

    if (exisitingAppointment) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const newAppointment = new Appointment({ userId, date, slot });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error(" Error booking appointment", error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

module.exports = {
  router,
};
