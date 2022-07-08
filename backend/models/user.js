const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'client', 'consultant'],
      default: 'client',
    },
    options: {
      description: { type: String },
      price: { type: Number },
      rating: { type: Number },
      profilePicture: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
      address: { type: String },
      phone: { type: String },
      website: { type: String },

      available: { type: Boolean },
      schedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
