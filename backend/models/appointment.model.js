const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    date: { type: String, required: true },
    slot: { type: String, required: true },
    status: { type: String, default: "booked" }, // 'booked' or 'available'
  },
  { timestamps: true },
  { versionKey: false }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = {
  Appointment,
};
