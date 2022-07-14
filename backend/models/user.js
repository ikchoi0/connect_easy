const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["admin", "client", "consultant"],
      default: "client",
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    options: {
      description: { type: String },
      price: { type: Number },
      rating: { type: Number },
      profilePicture: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: String },
      address: { type: String },
      phone: { type: String },
      website: { type: String },

      available: { type: Boolean },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
