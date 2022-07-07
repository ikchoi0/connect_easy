const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    consultant: { type: Schema.Types.ObjectId, ref: 'User' },
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true, trim: true },

    appointmentBooked: { type: Boolean, default: false },
    appointmentStartTime: { type: Timestamp, required: true },
    appointmentEndTime: { type: Timestamp, required: true },
    appointmentCancellation_time: { type: Timestamp },
    appointmentCancel: { type: Boolean, default: false },

    videoStartTime: { type: Timestamp },
    videoEndTime: { type: Timestamp },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
