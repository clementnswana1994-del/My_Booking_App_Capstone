import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: [String],
    },
    serviceNumbers: {
    type: [
      {
       number: Number,
        unavailableDates: [Date],
      },
    ],
  },
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
