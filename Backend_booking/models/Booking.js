import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
