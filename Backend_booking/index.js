import express from 'express';
import cors from 'cors';
// import mongoose from 'mongoose';
// import User from '../routes/UserRoutes.js';
// import Booking from '../routes/BookingRoutes.js';
// import Service from '../routes/ServiceRoutes.js';

import cookieParser from 'cookie-parser';

import 'dotenv/config'

import connectDB from './db.js';


const app = express()

const port = process.env.PORT || 8080

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// setup routes
//app.use("/api/Service", ServiceRoutes);
//app.use("/api/Booking", BookingRoutes);
//app.use("/api/Users", UserRoutes);


app.get('/', (req, res) => {
    res.json('Hello World! (from server)')
});



app.listen(port, () => {
    console.log('Listening on port: ' + port)
    connectDB()
})
