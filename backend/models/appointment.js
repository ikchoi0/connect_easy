const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    consultant: { type: Schema.Types.ObjectId, ref: "User" },
    client: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: false, trim: true },
    description: { type: String, required: false, trim: true },

    date: { type: Date, required: true },
    appointmentBooked: { type: Boolean, default: false },
    appointmentStartTime: { type: Date, required: true },
    appointmentEndTime: { type: Date, required: true },
    appointmentCancellation_time: { type: Date },
    appointmentCancel: { type: Boolean, default: false },
    videoStartTime: { type: Date },
    videoEndTime: { type: Date },
    conversation: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
