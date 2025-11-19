import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    service: [
      {
        type: mongoose.ObjectId,
        ref: "Service",
      },
    ],

    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },

    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Cancel"],
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
