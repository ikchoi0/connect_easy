const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true },
    roles: {
      type: String,
      enum: ['admin', 'client', 'consultant'],
      default: 'client',
    },
    options: {
      description: { type: String },
      price: { type: Number },
      rating: { type: Number },
      image: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      address: { type: String },
      phone: { type: String },
      website: { type: String },
      country: { type: String },

      available: { type: Boolean },
      schedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
