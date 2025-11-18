import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  service: {type:mongoose.Schema.Types.ObjectId, required:true, ref:''},
  user: {type:mongoose.Schema.Types.ObjectId, required:true},
  name: {type:String, required:true},
  phone: {type:String, required:true},
  price: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking